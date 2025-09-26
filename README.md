# Sombrí-Ya Backend API

This repository contains the backend API for the Sombrí-Ya umbrella rental mobile application. It is built with NestJS, TypeORM, and PostgreSQL.

## Features

- User, Station, Umbrella, and Rental management.
- Subscription and Payment Method handling.
- Geospatial queries for finding nearby stations.
- Advanced analytics endpoints for heatmaps, feature usage, and user savings.
- Functional feature logging (excluding UI events).
- External weather API integration for rain probability.

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js and npm (for local development and migration generation)

### 1. Environment Setup

1.  Clone the repository.
2.  Create a `.env` file in the root of the project by copying the example file:

    ```bash
    cp .env.example .env
    ```

3.  Open the `.env` file and replace `your_weather_api_key_here` with a real API key from a weather provider like OpenWeatherMap.

### 2. Running the Application with Docker

The recommended way to run the application is using Docker Compose.

1.  **Build and start the services:**

    ```bash
    docker-compose up --build
    ```

    This command will build the NestJS application image and start both the `backend` and `postgres` containers.

2.  **Running Migrations:**

    Once the containers are running, open a new terminal and execute the following command to run the database migrations. This will create all the necessary tables.

    ```bash
    docker-compose exec backend npm run migration:run
    ```

3.  **Seeding the Database:**

    After the migrations have been applied, you can seed the database with initial sample data.

    ```bash
    docker-compose exec backend npm run seed
    ```

The API should now be running and accessible at `http://localhost:3000`.

### 3. Generating New Migrations

If you change any of the TypeORM entities, you will need to generate a new migration file.

1.  Make sure the application is **not** running in Docker (`docker-compose down`).
2.  Run the application locally: `npm install && npm run start:dev`.
3.  In a new terminal, run the migration generation command:

    ```bash
    npm run migration:generate -- src/database/migrations/your-migration-name
    ```

4.  This will create a new migration file in `src/database/migrations`. You can then stop the local server and run the application with Docker again, applying the new migration as described above.

## API Reference

The API includes Swagger documentation. Once the application is running, you can access it at `http://localhost:3000/api`.

### Example cURL Requests

#### Get Stations Near Location

```bash
cURL 'http://localhost:3000/stations?lat=40.416775&lon=-3.703790&radius_m=2000'
```

#### Start a Rental (NFC)

```bash
cURL --location --request POST 'http://localhost:3000/rentals/start' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_id": "<a-valid-user-uuid>",
    "umbrella_id": "<a-valid-umbrella-uuid>",
    "station_start_id": "<a-valid-station-uuid>",
    "start_gps": {
        "lat": 40.416775,
        "lon": -3.703790
    },
    "auth_type": "nfc"
}'
```

#### End a Rental

```bash
cURL --location --request POST 'http://localhost:3000/rentals/end' \
--header 'Content-Type: application/json' \
--data-raw '{
    "rental_id": "<a-valid-rental-uuid>",
    "station_end_id": "<a-different-station-uuid>"
}'
```

#### Log a Feature Usage

```bash
cURL --location --request POST 'http://localhost:3000/feature-log' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_id": "<a-valid-user-uuid>",
    "name": "nfc_tap_attempt",
    "details": {
        "success": false,
        "reason": "card_not_recognized"
    }
}'
```

#### Get Top 3 Features

```bash
cURL 'http://localhost:3000/analytics/features/top?start_date=2025-01-01&end_date=2025-12-31&limit=3'
```

## Analytics & Performance

### SQL Queries

The analytics endpoints are powered by optimized SQL aggregation queries. You can find the raw queries within the `AnalyticsService` (`src/analytics/analytics.service.ts`).

### Materialized Views

For very large datasets, some analytics queries can become slow. For example, the `getBookingsFrequency` or `getUserHeatmap` endpoints could benefit from pre-computation.

PostgreSQL's **Materialized Views** are an excellent solution for this. You can create a materialized view that stores the result of a query and refresh it periodically.

**Example: Materialized View for Daily Bookings**

```sql
-- Create the Materialized View
CREATE MATERIALIZED VIEW daily_bookings_by_station AS
SELECT
    date_trunc('day', r.start_time) AS period,
    r.station_start_id,
    COUNT(r.id) AS bookings_count
FROM rentals r
GROUP BY period, r.station_start_id;

-- Create an index for faster queries
CREATE INDEX idx_daily_bookings_period ON daily_bookings_by_station(period);
```

Your API can then query this view, which will be much faster than computing the aggregation on the fly.

**Refreshing the View**

You need to refresh the view to keep it up-to-date. This can be done on a schedule (e.g., every night).

```sql
REFRESH MATERIALIZED VIEW daily_bookings_by_station;
```

You can automate this using a background job runner like [BullMQ](https://bullmq.io/) or a simple NestJS [Schedule Task](https://docs.nestjs.com/techniques/task-scheduling).

### Geospatial Indexing

To ensure fast queries for nearby stations, a spatial index is created on the `location` column of the `stations` table using PostGIS.

```typescript
// From src/database/entities/station.entity.ts
@Index({ spatial: true })
@Column({
  type: 'geography',
  spatialFeatureType: 'Point',
  srid: 4326, // WGS 84
})
location: Point;
```

## Security Notes

-   **No Authentication**: This implementation explicitly omits authentication and authorization. In a production environment, all endpoints should be protected. You can use strategies like JWT or OAuth2.
-   **Rate Limiting**: To prevent abuse, especially on analytics endpoints, implement rate limiting. The `nestjs/throttler` package is a good option.
-   **API Keys**: The external weather API key is stored in an environment variable. Ensure this is kept secret in production environments.