from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import datetime


class Lead(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: Optional[str]
    phone: Optional[str]
    source: Optional[str] = 'website'
    status: Optional[str] = 'new' # new, contacted, qualified, lost, converted
    owner_id: Optional[str] = None # reference to user-service user id
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Opportunity(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    lead_id: int
    title: str
    value: Optional[float] = 0.0
    stage: Optional[str] = 'prospect'
    assigned_to: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)