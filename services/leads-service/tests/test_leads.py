# tests/test_leads.py
import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

@pytest.fixture(scope="module")
def auth_header():
    """Simulate JWT token (in real setup get it from user-service)"""
    return {"Authorization": "Bearer faketoken123"}

def test_healthcheck():
    response = client.get("/api/v1/leads/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_create_lead(auth_header):
    lead_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "status": "new"
    }
    response = client.post("/api/v1/leads/", json=lead_data, headers=auth_header)
    assert response.status_code in (200, 201)
    data = response.json()
    assert "id" in data
    assert data["name"] == "John Doe"

def test_list_leads(auth_header):
    response = client.get("/api/v1/leads/", headers=auth_header)
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_lead(auth_header):
    # Create first
    response = client.post("/api/v1/leads/", json={"name": "Temp", "email": "t@t.com"}, headers=auth_header)
    lead_id = response.json()["id"]

    # Update
    response = client.put(f"/api/v1/leads/{lead_id}", json={"status": "contacted"}, headers=auth_header)
    assert response.status_code == 200
    assert response.json()["status"] == "contacted"

def test_delete_lead(auth_header):
    # Create first
    response = client.post("/api/v1/leads/", json={"name": "Delete Me", "email": "d@d.com"}, headers=auth_header)
    lead_id = response.json()["id"]

    # Delete
    response = client.delete(f"/api/v1/leads/{lead_id}", headers=auth_header)
    assert response.status_code == 200
    assert response.json()["deleted"] is True
