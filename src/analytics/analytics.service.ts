import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Rental } from '../database/entities/rental.entity';
import { Station } from '../database/entities/station.entity';
import { User } from '../database/entities/user.entity';
import { FeatureLog } from '../database/entities/feature-log.entity';
import { AppOpenLog } from '../database/entities/app-open-log.entity';
import { WeatherService } from '../weather/weather.service';
import { Subscription } from '../database/entities/subscription.entity';
import { TimeBucketsDto } from './dto/query-analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Rental) private readonly rentalRepo: Repository<Rental>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(FeatureLog)
    private readonly featureLogRepo: Repository<FeatureLog>,
    @InjectRepository(AppOpenLog)
    private readonly appOpenLogRepo: Repository<AppOpenLog>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
    private readonly weatherService: WeatherService,
    private readonly dataSource: DataSource,
  ) {}

  async getAvailability(station_id: string) {
    const query = `
      SELECT
        s.id AS station_id,
        COUNT(CASE WHEN u.state = 'available' THEN 1 END) AS available_umbrellas,
        COUNT(u.id) AS total_umbrellas,
        NOW() as timestamp
      FROM stations s
      LEFT JOIN umbrellas u ON s.id = u.station_id
      WHERE s.id = $1
      GROUP BY s.id;
    `;
    const result = await this.dataSource.query(query, [station_id]);
    return result[0];
  }

  async getBookingsFrequency(
    start_date: string,
    end_date: string,
    group_by: string,
  ) {
    const query = `
      SELECT
        date_trunc($3, r.start_time) AS period,
        r.station_start_id,
        COUNT(r.id) AS bookings_count
      FROM rentals r
      WHERE r.start_time BETWEEN $1 AND $2
      GROUP BY period, r.station_start_id
      ORDER BY period;
    `;
    return this.dataSource.query(query, [start_date, end_date, group_by]);
  }

  async getUserHeatmap(start_date: string, end_date: string) {
    // This uses the app_open_logs table
    const query = `
      SELECT
        ROUND(ST_X(location::geometry)::numeric, 4) as lon,
        ROUND(ST_Y(location::geometry)::numeric, 4) as lat,
        COUNT(id) as count
      FROM app_open_logs
      WHERE created_at BETWEEN $1 AND $2
      GROUP BY lon, lat;
    `;
    return this.dataSource.query(query, [start_date, end_date]);
  }

  async getStationHeatmap(start_date: string, end_date: string) {
    const query = `
      SELECT
        s.id as station_id,
        s.latitude as lat,
        s.longitude as lon,
        COUNT(r.id) as bookings_count
      FROM rentals r
      JOIN stations s ON r.station_start_id = s.id
      WHERE r.start_time BETWEEN $1 AND $2
      GROUP BY s.id, s.latitude, s.longitude;
    `;
    return this.dataSource.query(query, [start_date, end_date]);
  }

  async getTopFeatures(start_date: string, end_date: string, limit: number) {
    const query = `
      WITH total_logs AS (
        SELECT COUNT(*) as total FROM feature_logs WHERE created_at BETWEEN $1 AND $2
      )
      SELECT 
        name as feature_name,
        COUNT(id) as uses,
        (COUNT(id)::float / (SELECT total FROM total_logs)) * 100 as percent_of_total
      FROM feature_logs
      WHERE created_at BETWEEN $1 AND $2
      GROUP BY name
      ORDER BY uses DESC
      LIMIT $3;
    `;
    return this.dataSource.query(query, [start_date, end_date, limit]);
  }

  async getNfcVsQr(start_date: string, end_date: string) {
    // This assumes a FeatureLog entry with name 'nfc_tap_attempt' and details: { success: boolean }
    const query = `
      SELECT
        COUNT(CASE WHEN auth_type = 'nfc' THEN 1 END) AS nfc_uses,
        COUNT(CASE WHEN auth_type = 'qr' THEN 1 END) AS qr_uses,
        (SELECT COUNT(*) FROM feature_logs WHERE name = 'nfc_tap_attempt' AND (details->>'success')::boolean = false AND created_at BETWEEN $1 AND $2) as nfc_fails,
        (SELECT COUNT(*) FROM feature_logs WHERE name = 'qr_scan_attempt' AND (details->>'success')::boolean = false AND created_at BETWEEN $1 AND $2) as qr_fails
      FROM rentals
      WHERE start_time BETWEEN $1 AND $2;
    `;
    const result = await this.dataSource.query(query, [start_date, end_date]);
    const stats = result[0] || {};
    const nfc_uses = parseInt(stats.nfc_uses) || 0;
    const nfc_fails = parseInt(stats.nfc_fails) || 0;
    const qr_uses = parseInt(stats.qr_uses) || 0;
    const qr_fails = parseInt(stats.qr_fails) || 0;

    return {
      nfc: { uses: nfc_uses, fails: nfc_fails },
      qr: { uses: qr_uses, fails: qr_fails },
      nfc_failure_rate:
        nfc_uses + nfc_fails > 0 ? nfc_fails / (nfc_uses + nfc_fails) : 0,
      qr_failure_rate:
        qr_uses + qr_fails > 0 ? qr_fails / (qr_uses + qr_fails) : 0,
    };
  }

  async getBiometricUsage() {
    const total_users = await this.userRepo.count();
    const biometric_enabled_count = await this.userRepo.count({
      where: { biometric_enabled: true },
    });
    return {
      total_users,
      biometric_enabled_count,
      percent:
        total_users > 0 ? (biometric_enabled_count / total_users) * 100 : 0,
    };
  }

  async getRainProbability(lat: number, lon: number) {
    return this.weatherService.getRainProbability(lat, lon);
  }

  private bq6Filters(q: { station_id?: string; auth_type?: 'nfc' | 'qr' }) {
    const where: string[] = ["r.status <> 'cancelled'"]; 
    const params: Record<string, any> = {};
    if (q.station_id) {
      where.push('r.station_start_id = :station_id');
      params.station_id = q.station_id;
    }
    if (q.auth_type) {
      where.push('r.auth_type = :auth_type');
      params.auth_type = q.auth_type;
    }
    return {
      whereSql: where.length ? ' AND ' + where.join(' AND ') : '',
      params,
    };
  }

  async getRentalsTimeSeries(q: {
    start_date: string;
    end_date: string;
    bucket_minutes?: string;
    tz?: string;
    station_id?: string;
    auth_type?: 'nfc' | 'qr';
  }): Promise<{ bucket_start: string; rentals: number }[]> {
    const tz = q.tz ?? 'America/Bogota';
    const bucket = Number(q.bucket_minutes ?? 15);
    const { whereSql, params } = this.bq6Filters(q);

    const sql = `
      WITH rentals AS (
        SELECT (r.start_time AT TIME ZONE :tz) AS local_ts
        FROM rentals r
        WHERE r.start_time >= :from::timestamptz
          AND r.start_time <  :to::timestamptz
          ${whereSql}
      )
      SELECT
        to_timestamp(floor(extract(epoch FROM local_ts)/(:bucket*60))*(:bucket*60)) AT TIME ZONE :tz AS bucket_start,
        count(*)::int AS rentals
      FROM rentals
      GROUP BY 1
      ORDER BY 1;
    `;

    const rows = await this.dataSource.query(sql, {
      ...params,
      tz,
      from: q.start_date,
      to: q.end_date,
      bucket,
    });

    return (rows as any[]).map((r) => ({
      bucket_start: String(r.bucket_start),
      rentals: Number(r.rentals),
    }));
  }

  async getRentalsPeaks(q: {
    start_date: string;
    end_date: string;
    bucket_minutes?: string;
    tz?: string;
    station_id?: string;
    auth_type?: 'nfc' | 'qr';
    top?: string;
  }): Promise<{ bucket_start: string; rentals: number }[]> {
    const top = Number(q.top ?? 10);
    const rows = await this.getRentalsTimeSeries(q);
    return [...rows].sort((a, b) => b.rentals - a.rentals).slice(0, top);
  }

  async getRentalsByTimeOfDay(q: {
    start_date: string;
    end_date: string;
    tz?: string;
    split_by_weekday?: '1' | '0';
    station_id?: string;
    auth_type?: 'nfc' | 'qr';
  }): Promise<
    { hour_of_day: number; weekday: number | null; rentals: number }[]
  > {
    const tz = q.tz ?? 'America/Bogota';
    const split = q.split_by_weekday === '1';
    const { whereSql, params } = this.bq6Filters(q);

    const sql = `
      SELECT
        (EXTRACT(HOUR FROM r.start_time AT TIME ZONE :tz))::int AS hour_of_day,
        ${split ? '((EXTRACT(DOW FROM r.start_time AT TIME ZONE :tz)::int + 6) % 7) AS weekday,' : 'NULL::int AS weekday,'}
        count(*)::int AS rentals
      FROM rentals r
      WHERE r.start_time >= :from::timestamptz
        AND r.start_time <  :to::timestamptz
        ${whereSql}
      GROUP BY 1, 2
      ORDER BY 2 NULLS FIRST, 1;
    `;

    const rows = await this.dataSource.query(sql, {
      ...params,
      tz,
      from: q.start_date,
      to: q.end_date,
    });

    return (rows as any[]).map((r) => ({
      hour_of_day: Number(r.hour_of_day),
      weekday:
        r.weekday === null || r.weekday === undefined
          ? null
          : Number(r.weekday),
      rentals: Number(r.rentals),
    }));
  }
}
