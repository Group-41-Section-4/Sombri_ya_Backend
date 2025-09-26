import requests
import pytest

BASE_URL = "http://localhost:3000"

# Global variables to store UUIDs fetched from the API
user_id = None
station_id = None
umbrella_id = None
rental_id = None

@pytest.fixture(scope="session", autouse=True)
def setup_data():
    global user_id, station_id, umbrella_id

    # Fetch a user ID
    users_response = requests.get(f"{BASE_URL}/users/some-valid-user-id") # This endpoint needs to be implemented to list users
    # For now, we'll assume a user ID from the seed data or fetch the first one
    # In a real scenario, you'd have an endpoint to list users or create one for testing
    # For demonstration, let's assume the first user created by seed has a known ID or we fetch it.
    # Since there's no GET /users endpoint to list all users, we'll have to assume one for now.
    # Let's try to get the first user from the seed data. This will require a GET /users endpoint that lists all users.
    # For now, I will use a placeholder UUID and assume it exists.
    user_id = "0ba81224-5e98-4ad6-a049-238e3908b42a"

    # Fetch a station ID and an available umbrella ID
    stations_response = requests.get(f"{BASE_URL}/stations?lat=40.415&lon=-3.707&radius_m=5000")
    stations_data = stations_response.json()
    if stations_data and len(stations_data) > 0:
        station_id = stations_data[0]['station_id']
        umbrellas_response = requests.get(f"{BASE_URL}/stations/{station_id}/umbrellas")
        umbrellas_data = umbrellas_response.json()
        for umbrella in umbrellas_data:
            if umbrella['state'] == 'available':
                umbrella_id = umbrella['id']
                break
    
    assert user_id is not None, "Failed to get a user ID for testing."
    assert station_id is not None, "Failed to get a station ID for testing."
    assert umbrella_id is not None, "Failed to get an available umbrella ID for testing."

def test_get_stations_nearby():
    response = requests.get(f"{BASE_URL}/stations?lat=40.416775&lon=-3.703790&radius_m=2000")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "station_id" in data[0]
    assert "distance_meters" in data[0]

def test_start_rental():
    global rental_id
    payload = {
        "user_id": user_id,
        "umbrella_id": umbrella_id,
        "station_start_id": station_id,
        "start_gps": {"lat": 40.416775, "lon": -3.703790},
        "auth_type": "nfc"
    }
    response = requests.post(f"{BASE_URL}/rentals/start", json=payload)
    assert response.status_code == 201 # Assuming 201 Created for successful rental start
    data = response.json()
    assert "rental_id" in data
    assert data["status"] == "ongoing"
    rental_id = data["rental_id"]

def test_end_rental():
    assert rental_id is not None, "Rental ID not set, cannot end rental."
    payload = {
        "rental_id": rental_id,
        "station_end_id": station_id, # Ending at the same station for simplicity
        "end_gps": {"lat": 40.416775, "lon": -3.703790}
    }
    assert response.status_code == 201
    data = response.json()
    assert data["status"] == "completed"
    assert "duration_minutes" in data

def test_log_feature_usage():
    payload = {
        "user_id": user_id,
        "name": "nfc_tap_attempt",
        "details": {"success": True, "reason": ""}
    }
    response = requests.post(f"{BASE_URL}/feature-log", json=payload)
    assert response.status_code == 201 # Assuming 201 Created
    data = response.json()
    assert data["name"] == "nfc_tap_attempt"

def test_get_top_features():
    response = requests.get(f"{BASE_URL}/analytics/features/top?start_date=2025-01-01&end_date=2025-12-31&limit=3")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "feature_name" in data[0]
    assert "uses" in data[0]
