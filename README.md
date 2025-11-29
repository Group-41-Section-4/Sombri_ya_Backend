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

2.  **Database Setup:**

    The application uses TypeORM with **automatic schema synchronization**. Database tables are automatically created and updated from your entities - no manual migrations needed!

    Just start the application and the database schema will be automatically synced.

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

### Quick Reference Table

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get API welcome message |
| **Users** | | |
| POST | `/users` | Create a new user |
| GET | `/users/:id` | Get a user by ID |
| PUT | `/users/:id` | Update a user by ID |
| **Stations** | | |
| POST | `/stations` | Create a new station |
| GET | `/stations` | Find nearby stations |
| GET | `/stations/:id/umbrellas` | Get umbrellas at a station |
| **Rentals** | | |
| POST | `/rentals/start` | Start a new rental |
| POST | `/rentals/end` | End a rental |
| GET | `/rentals` | Get rentals with filters |
| GET | `/rentals/:id` | Get a specific rental |
| **Feature Log** | | |
| POST | `/feature-log` | Log a feature usage or bug |
| **Analytics** | | |
| GET | `/analytics/availability` | Get umbrella availability at a station |
| GET | `/analytics/bookings/frequency` | Get booking frequency by time period |
| GET | `/analytics/heatmap/users` | Get user activity heatmap |
| GET | `/analytics/heatmap/stations` | Get station usage heatmap |
| GET | `/analytics/features/top` | Get top used features |
| GET | `/analytics/features/nfc-vs-qr` | Compare NFC vs QR code usage |
| GET | `/analytics/biometric-usage` | Get biometric usage statistics |
| GET | `/analytics/rain-probability` | Get rain probability for location |

### Endpoints Overview

#### Root Endpoint

##### GET /
Get API welcome message.

```bash
curl 'http://localhost:3000/'
```

---

### Users Endpoints

#### POST /users
Create a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "biometric_enabled": true
}
```

**Example:**
```bash
curl --location --request POST 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "biometric_enabled": true
}'
```

#### GET /users/:id
Get a user by ID.

**Example:**
```bash
curl 'http://localhost:3000/users/<user-uuid>'
```

#### PUT /users/:id
Update a user by ID.

**Request Body (all fields optional):**
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "biometric_enabled": false
}
```

**Example:**
```bash
curl --location --request PUT 'http://localhost:3000/users/<user-uuid>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}'
```

---

### Stations Endpoints

#### POST /stations
Create a new station.

**Request Body:**
```json
{
  "place_name": "Central Park Station",
  "description": "Near the main entrance",
  "latitude": 40.416775,
  "longitude": -3.703790
}
```

**Example:**
```bash
curl --location --request POST 'http://localhost:3000/stations' \
--header 'Content-Type: application/json' \
--data-raw '{
  "place_name": "Central Park Station",
  "description": "Near the main entrance",
  "latitude": 40.416775,
  "longitude": -3.703790
}'
```

#### GET /stations
Find nearby stations.

**Query Parameters:**
- `lat` (required): Latitude of the search location
- `lon` (required): Longitude of the search location
- `radius_m` (optional): Search radius in meters (default: 2000)
- `page` (optional): Page number for pagination

**Example:**
```bash
curl 'http://localhost:3000/stations?lat=40.416775&lon=-3.703790&radius_m=2000&page=1'
```

#### GET /stations/:id/umbrellas
Get all umbrellas at a specific station.

**Example:**
```bash
curl 'http://localhost:3000/stations/<station-uuid>/umbrellas'
```

---

### Rentals Endpoints

#### POST /rentals/start
Start a new rental.

**Request Body:**
```json
{
  "user_id": "<user-uuid>",
  "umbrella_id": "<umbrella-uuid>",
  "station_start_id": "<station-uuid>",
  "payment_method_id": "<payment-method-uuid>",
  "start_gps": {
    "lat": 40.416775,
    "lon": -3.703790
  },
  "auth_type": "nfc"
}
```

**Auth Types:** `nfc`, `qr`, `biometric`

**Example (NFC):**
```bash
curl --location --request POST 'http://localhost:3000/rentals/start' \
--header 'Content-Type: application/json' \
--data-raw '{
  "user_id": "<user-uuid>",
  "umbrella_id": "<umbrella-uuid>",
  "station_start_id": "<station-uuid>",
  "start_gps": {
    "lat": 40.416775,
    "lon": -3.703790
  },
  "auth_type": "nfc"
}'
```

**Example (QR Code):**
```bash
curl --location --request POST 'http://localhost:3000/rentals/start' \
--header 'Content-Type: application/json' \
--data-raw '{
  "user_id": "<user-uuid>",
  "umbrella_id": "<umbrella-uuid>",
  "station_start_id": "<station-uuid>",
  "start_gps": {
    "lat": 40.416775,
    "lon": -3.703790
  },
  "auth_type": "qr"
}'
```

**Example (Biometric):**
```bash
curl --location --request POST 'http://localhost:3000/rentals/start' \
--header 'Content-Type: application/json' \
--data-raw '{
  "user_id": "<user-uuid>",
  "umbrella_id": "<umbrella-uuid>",
  "station_start_id": "<station-uuid>",
  "payment_method_id": "<payment-method-uuid>",
  "start_gps": {
    "lat": 40.416775,
    "lon": -3.703790
  },
  "auth_type": "biometric"
}'
```

#### POST /rentals/end
End a rental.

**Request Body:**
```json
{
  "rental_id": "<rental-uuid>",
  "station_end_id": "<station-uuid>",
  "end_gps": {
    "lat": 40.420000,
    "lon": -3.710000
  }
}
```

**Example:**
```bash
curl --location --request POST 'http://localhost:3000/rentals/end' \
--header 'Content-Type: application/json' \
--data-raw '{
  "rental_id": "<rental-uuid>",
  "station_end_id": "<station-uuid>",
  "end_gps": {
    "lat": 40.420000,
    "lon": -3.710000
  }
}'
```

#### GET /rentals
Get rentals with optional filters.

**Query Parameters:**
- `user_id` (optional): Filter by user ID
- `status` (optional): Filter by rental status (`active`, `completed`, `cancelled`)

**Examples:**
```bash
# Get all rentals for a user
curl 'http://localhost:3000/rentals?user_id=<user-uuid>'

# Get active rentals for a user
curl 'http://localhost:3000/rentals?user_id=<user-uuid>&status=active'

# Get completed rentals for a user
curl 'http://localhost:3000/rentals?user_id=<user-uuid>&status=completed'
```

#### GET /rentals/:id
Get a specific rental by ID.

**Example:**
```bash
curl 'http://localhost:3000/rentals/<rental-uuid>'
```

---

### Feature Log Endpoints

#### POST /feature-log
Log a feature usage or bug event.

**Request Body:**
```json
{
  "user_id": "<user-uuid>",
  "name": "nfc_tap_attempt",
  "is_bug": false,
  "details": {
    "success": true,
    "duration_ms": 120
  }
}
```

**Examples:**

**Log successful NFC tap:**
```bash
curl --location --request POST 'http://localhost:3000/feature-log' \
--header 'Content-Type: application/json' \
--data-raw '{
  "user_id": "<user-uuid>",
  "name": "nfc_tap_attempt",
  "details": {
    "success": true,
    "duration_ms": 120
  }
}'
```

**Log failed NFC tap:**
```bash
curl --location --request POST 'http://localhost:3000/feature-log' \
--header 'Content-Type: application/json' \
--data-raw '{
  "user_id": "<user-uuid>",
  "name": "nfc_tap_attempt",
  "details": {
    "success": false,
    "reason": "card_not_recognized"
  }
}'
```

**Log a bug:**
```bash
curl --location --request POST 'http://localhost:3000/feature-log' \
--header 'Content-Type: application/json' \
--data-raw '{
  "user_id": "<user-uuid>",
  "name": "app_crash",
  "is_bug": true,
  "details": {
    "screen": "rental_screen",
    "error_message": "Null pointer exception"
  }
}'
```

---

### Analytics Endpoints

#### GET /analytics/availability
Get umbrella availability at a station.

**Query Parameters:**
- `station_id` (required): Station UUID

**Example:**
```bash
curl 'http://localhost:3000/analytics/availability?station_id=<station-uuid>'
```

#### GET /analytics/bookings/frequency
Get booking frequency grouped by time period.

**Query Parameters:**
- `start_date` (required): Start date in ISO format (YYYY-MM-DD)
- `end_date` (required): End date in ISO format (YYYY-MM-DD)
- `group_by` (required): Grouping period (`day`, `week`, or `month`)

**Examples:**
```bash
# Daily bookings
curl 'http://localhost:3000/analytics/bookings/frequency?start_date=2025-01-01&end_date=2025-01-31&group_by=day'

# Weekly bookings
curl 'http://localhost:3000/analytics/bookings/frequency?start_date=2025-01-01&end_date=2025-12-31&group_by=week'

# Monthly bookings
curl 'http://localhost:3000/analytics/bookings/frequency?start_date=2025-01-01&end_date=2025-12-31&group_by=month'
```

#### GET /analytics/heatmap/users
Get user activity heatmap.

**Query Parameters:**
- `start_date` (required): Start date in ISO format (YYYY-MM-DD)
- `end_date` (required): End date in ISO format (YYYY-MM-DD)

**Example:**
```bash
curl 'http://localhost:3000/analytics/heatmap/users?start_date=2025-01-01&end_date=2025-12-31'
```

#### GET /analytics/heatmap/stations
Get station usage heatmap.

**Query Parameters:**
- `start_date` (required): Start date in ISO format (YYYY-MM-DD)
- `end_date` (required): End date in ISO format (YYYY-MM-DD)

**Example:**
```bash
curl 'http://localhost:3000/analytics/heatmap/stations?start_date=2025-01-01&end_date=2025-12-31'
```

#### GET /analytics/features/top
Get top used features.

**Query Parameters:**
- `start_date` (required): Start date in ISO format (YYYY-MM-DD)
- `end_date` (required): End date in ISO format (YYYY-MM-DD)
- `limit` (optional): Number of top features to return (default: 5)

**Examples:**
```bash
# Get top 3 features
curl 'http://localhost:3000/analytics/features/top?start_date=2025-01-01&end_date=2025-12-31&limit=3'

# Get top 10 features
curl 'http://localhost:3000/analytics/features/top?start_date=2025-01-01&end_date=2025-12-31&limit=10'
```

#### GET /analytics/features/nfc-vs-qr
Get comparison of NFC vs QR code usage.

**Query Parameters:**
- `start_date` (required): Start date in ISO format (YYYY-MM-DD)
- `end_date` (required): End date in ISO format (YYYY-MM-DD)

**Example:**
```bash
curl 'http://localhost:3000/analytics/features/nfc-vs-qr?start_date=2025-01-01&end_date=2025-12-31'
```

#### GET /analytics/biometric-usage
Get biometric authentication usage statistics.

**Example:**
```bash
curl 'http://localhost:3000/analytics/biometric-usage'
```

#### GET /analytics/rain-probability
Get rain probability for a location.

**Query Parameters:**
- `lat` (required): Latitude
- `lon` (required): Longitude

**Example:**
```bash
curl 'http://localhost:3000/analytics/rain-probability?lat=40.416775&lon=-3.703790'
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