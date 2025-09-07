from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import dotenv
from .db import init_db
from .routes import router as leads_router


dotenv.load_dotenv()


app = FastAPI(title='leads-service', version='1.0')


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
    )


@app.on_event('startup')
async def on_startup():
    await init_db()


app.get('/health')(lambda: {'status': 'ok', 'service': 'leads-service'})
app.include_router(leads_router, prefix='/api/v1/leads', tags=['leads'])