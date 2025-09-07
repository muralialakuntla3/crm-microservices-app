from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime


class LeadCreate(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    source: Optional[str] = 'website'


class LeadUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    phone: Optional[str]
    source: Optional[str]
    status: Optional[str]


class LeadRead(BaseModel):
    id: int
    name: str
    email: Optional[EmailStr]
    phone: Optional[str]
    source: Optional[str]
    status: Optional[str]
    owner_id: Optional[str]
    created_at: datetime
    updated_at: datetime


class OpportunityCreate(BaseModel):
    lead_id: int
    title: str
    value: Optional[float] = 0.0


class OpportunityRead(BaseModel):
    id: int
    lead_id: int
    title: str
    value: float
    stage: Optional[str]
    assigned_to: Optional[str]
    created_at: datetime