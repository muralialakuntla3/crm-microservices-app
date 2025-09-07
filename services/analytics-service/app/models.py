from sqlalchemy import Column, Integer, String, DateTime, Float
from app.database import Base
from datetime import datetime

class AnalyticsRecord(Base):
    __tablename__ = "analytics_records"

    id = Column(Integer, primary_key=True, index=True)
    metric = Column(String, index=True)   # e.g. "trainer_performance"
    value = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
