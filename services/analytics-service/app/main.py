from fastapi import FastAPI
from app.routes import analytics_routes

app = FastAPI(title="Analytics Service")

# Include analytics endpoints
app.include_router(analytics_routes.router, prefix="/analytics", tags=["Analytics"])

@app.get("/health")
def health():
    return {"status": "Analytics Service is running"}
