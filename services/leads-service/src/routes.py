from fastapi import APIRouter, Depends, HTTPException, status
from .schemas import LeadCreate, LeadRead, LeadUpdate, OpportunityCreate, OpportunityRead
from .crud import create_lead, list_leads, get_lead, update_lead, delete_lead, create_opportunity, list_opportunities
from .db import get_session
from .auth import get_current_user
from sqlmodel.ext.asyncio.session import AsyncSession


router = APIRouter()


@router.post('/', response_model=LeadRead, status_code=status.HTTP_201_CREATED)
async def create(payload: LeadCreate, user=Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    lead = await create_lead(session, payload, owner_id=user['id'])
    return lead


@router.get('/', response_model=list[LeadRead])
async def list_all(limit: int = 50, offset: int = 0, session: AsyncSession = Depends(get_session)):
    return await list_leads(session, limit, offset)


@router.get('/{lead_id}', response_model=LeadRead)
async def get_one(lead_id: int, session: AsyncSession = Depends(get_session)):
    lead = await get_lead(session, lead_id)
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Lead not found')
    return lead


@router.patch('/{lead_id}', response_model=LeadRead)
async def patch(lead_id: int, payload: LeadUpdate, user=Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    lead = await get_lead(session, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail='Lead not found')
    # only owner or admin can update
    if lead.owner_id and lead.owner_id != user['id'] and user['role'] != 'admin':
        raise HTTPException(status_code=403, detail='Forbidden')
    lead = await update_lead(session, lead, payload)
    return lead


@router.delete('/{lead_id}', status_code=status.HTTP_200_OK)
async def remove(lead_id: int, user=Depends(get_current_user), session: AsyncSession = Depends(get_session)):
    lead = await get_lead(session, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail='Lead not found')
    # only admin can delete
    if user.get('role') != 'admin':
        raise HTTPException(status_code=403, detail='Forbidden')
    await delete_lead(session, lead)
    return {'deleted': True}


# Opportunities
@router.post('/{lead_id}/opportunities', response_model=OpportunityRead, status_code=status.HTTP_201_CREATED)
async def create_opp(lead_id: int, payload: OpportunityCreate, user=Depends(get_current_user), session: AsyncSession = Depends(get_session)):
# ensure lead exists
    lead = await get_lead(session, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail='Lead not found')
    payload.lead_id = lead_id
    opp = await create_opportunity(session, payload)
    return opp

@router.get('/{lead_id}/opportunities', response_model=list[OpportunityRead])
async def list_opps(lead_id: int, session: AsyncSession = Depends(get_session)):
    return await list_opportunities(session, lead_id)