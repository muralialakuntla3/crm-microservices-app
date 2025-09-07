import os
from dotenv import load_dotenv

load_dotenv()

POSTGRES_USER = os.getenv("POSTGRES_USER", "analytics_user")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "analytics_pass")
POSTGRES_DB = os.getenv("POSTGRES_DB", "analytics_db")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "analytics-db")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")

DATABASE_URL = (
    f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
)

JWT_SECRET = os.getenv("JWT_SECRET", "supersecretkey")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
