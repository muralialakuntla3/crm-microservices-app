from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "Analytics Service is running"

def test_create_record():
    payload = {"metric": "trainer_performance", "value": 95.5}
    response = client.post("/analytics/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["metric"] == "trainer_performance"
    assert data["value"] == 95.5
