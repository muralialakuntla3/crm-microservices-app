from pydantic import BaseModel
from datetime import datetime

class AnalyticsRecordBase(BaseModel):
    metric: str
    value: float

class AnalyticsRecordCreate(AnalyticsRecordBase):
    pass

class AnalyticsRecordResponse(AnalyticsRecordBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
