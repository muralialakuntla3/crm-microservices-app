from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas
from app.services import analytics_service

router = APIRouter()

@router.post("/", response_model=schemas.AnalyticsRecordResponse)
def create_record(record: schemas.AnalyticsRecordCreate, db: Session = Depends(get_db)):
    return analytics_service.create_record(db, record)

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    return analytics_service.get_summary(db)
