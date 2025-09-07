from sqlmodel import select
from .models import Lead, Opportunity
from .schemas import LeadCreate, LeadUpdate, OpportunityCreate
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List, Optional
from datetime import datetime


async def create_lead(session: AsyncSession, payload: LeadCreate, owner_id: Optional[str] = None) -> Lead:
    lead = Lead.from_orm(payload) # SQLModel BaseModel conversion
    lead.owner_id = owner_id
    session.add(lead)
    await session.commit()
    await session.refresh(lead)
    return lead


async def list_leads(session: AsyncSession, limit: int = 50, offset: int = 0) -> List[Lead]:
    q = select(Lead).limit(limit).offset(offset)
    res = await session.exec(q)
    return res.all()


async def get_lead(session: AsyncSession, lead_id: int) -> Optional[Lead]:
    return await session.get(Lead, lead_id)


async def update_lead(session: AsyncSession, lead: Lead, payload: LeadUpdate) -> Lead:
    for k, v in payload.dict(exclude_unset=True).items():
        setattr(lead, k, v)
    lead.updated_at = datetime.utcnow()
    session.add(lead)
    await session.commit()
    await session.refresh(lead)
    return lead


async def delete_lead(session: AsyncSession, lead: Lead) -> None:
    await session.delete(lead)
    await session.commit()


# Opportunity CRUD
async def create_opportunity(session: AsyncSession, payload: OpportunityCreate) -> Opportunity:
    opp = Opportunity.from_orm(payload)
    session.add(opp)
    await session.commit()
    await session.refresh(opp)
    return opp


async def list_opportunities(session: AsyncSession, lead_id: int = None):
    q = select(Opportunity)
    if lead_id:
        q = q.where(Opportunity.lead_id == lead_id)
    res = await session.exec(q)
    return res.all()