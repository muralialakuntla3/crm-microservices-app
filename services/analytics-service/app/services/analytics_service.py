from sqlalchemy.orm import Session
from app import models, schemas

def create_record(db: Session, record: schemas.AnalyticsRecordCreate):
    db_record = models.AnalyticsRecord(metric=record.metric, value=record.value)
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def get_summary(db: Session):
    records = db.query(models.AnalyticsRecord).all()
    return [{"metric": r.metric, "value": r.value, "created_at": r.created_at} for r in records]
