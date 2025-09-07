import os
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine


DATABASE_URL = os.getenv('DATABASE_URL')
engine: AsyncEngine = None


async def init_db():
    global engine
    if engine is None:
        if not DATABASE_URL:
            raise RuntimeError('DATABASE_URL not set')
        engine = create_async_engine(DATABASE_URL, echo=True, future=True)
        async with engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)


async def get_session() -> AsyncSession:
    async with AsyncSession(engine) as session:
        yield session