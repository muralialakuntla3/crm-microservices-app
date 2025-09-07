# Project Structure
crm-microservices-app/
│
├── frontend/                     # React.js frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/             # API calls to backend
│   │   ├── hooks/
│   │   ├── context/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js (or CRA config)
│
├── services/
│   ├── user-service/             # Service 1: Node.js + MongoDB
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── middlewares/
│   │   │   ├── utils/
│   │   │   └── server.js
│   │   ├── .env
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   ├── leads-service/            # Service 2: Python (FastAPI) + PostgreSQL
│   │   ├── app/
│   │   │   ├── api/
│   │   │   ├── models/
│   │   │   ├── schemas/
│   │   │   ├── services/
│   │   │   └── main.py
│   │   ├── .env
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   ├── course-service/           # Service 3: Java (Spring Boot) + MySQL
│   │   ├── src/main/java/com/crm/course/
│   │   │   ├── controller/
│   │   │   ├── model/
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   │   └── CourseApplication.java
│   │   ├── src/main/resources/
│   │   │   └── application.properties
│   │   ├── pom.xml
│   │   └── Dockerfile
│   │
│   ├── analytics-service/        # Service 4: Python + PostgreSQL
│   │   ├── app/
│   │   │   ├── api/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── main.py
│   │   ├── .env
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   └── ai-agent-service/         # Future AI Agent
│       ├── app/
│       └── Dockerfile
│
├── api-gateway/                  # Reverse proxy or Kong config
│   └── kong.yml (or nginx.conf)
│
├── infra/
│   ├── k8s-manifests/            # Kubernetes YAMLs
│   ├── terraform/                # Cloud infra setup
│   └── ansible/                  # Config mgmt
│
├── monitoring/                   # Prometheus & Grafana
│
├── docker-compose.yml            # Local dev orchestration
└── README.md

## Services
- Run Everything
```
docker-compose up --build
```
### Then access via API Gateway:

- Users → http://localhost:8080/users/...
- Leads → http://localhost:8080/leads/...
- Courses → http://localhost:8080/courses/...
- Analytics → http://localhost:8080/analytics/...

## User Service (Node.js + MongoDB)


### Endpoints
- `GET /health`
- `POST /api/v1/auth/register` { name, email, password, role? }
- `POST /api/v1/auth/login` { email, password }
- `GET /api/v1/auth/me` (Bearer token)
- `GET /api/v1/users` (admin)
- `GET /api/v1/users/:id` (admin)
- `PATCH /api/v1/users/:id` (admin)
- `DELETE /api/v1/users/:id` (admin)


### Local Dev
```bash
cp .env.example .env
npm install
npm run dev
```


### Docker (service-only)
```bash
docker build -t crm-user-service:local .
docker run -p 3000:3000 --env-file .env --name user-svc --network host crm-user-service:local
```


### Example Requests
```bash
# Register admin
curl -s -X POST http://localhost:3000/api/v1/auth/register \
-H 'Content-Type: application/json' \
-d '{"name":"Admin","email":"admin@crm.test","password":"secret123","role":"admin"}' | jq


# Login
TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/login \
-H 'Content-Type: application/json' \
-d '{"email":"admin@crm.test","password":"secret123"}' | jq -r '.data.token')


# Me
curl -s http://localhost:3000/api/v1/auth/me -H "Authorization: Bearer $TOKEN" | jq


# List users (admin)
curl -s http://localhost:3000/api/v1/users -H "Authorization: Bearer $TOKEN" | jq
```


## Leads Service (FastAPI + PostgreSQL)
### Endpoints
- `GET /health`
- `POST /api/v1/leads/` (create lead) — requires Bearer token
- `GET /api/v1/leads/` (list leads)
- `GET /api/v1/leads/{lead_id}`
- `PATCH /api/v1/leads/{lead_id}` — owner or admin
- `DELETE /api/v1/leads/{lead_id}` — admin only
- `POST /api/v1/leads/{lead_id}/opportunities` (create opportunity)
- `GET /api/v1/leads/{lead_id}/opportunities`

### Notes
- Auth expects JWT with `sub` (user id) and `role` claims. These are produced by the user-service.
- For production, use proper secret management and consider verifying token signature via JWKs if user-service moves to Keycloak/OIDC.


### Migrations
We included `alembic` in requirements for DB migrations; you can initialize alembic under `services/leads-service/migrations` if desired.


## Course Service (Spring Boot + MySQL)


### Overview
Provides CRUD for Courses. Uses MySQL database `crm_courses` and accepts JWT tokens issued by user-service. The JWT secret must match `jwt.secret` in `application.properties` or environment override.


### Build
```bash
cd services/course-service
mvn -q clean package -DskipTests
```

### Endpoints
- `GET /health` (inherited from app) - simple health endpoint
- `GET /api/v1/courses/public` - list public courses (no auth)
- `GET /api/v1/courses` - list courses (auth)
- `GET /api/v1/courses/{id}` - get course
- `POST /api/v1/courses` - create (instructor or admin)
- `PATCH /api/v1/courses/{id}` - update (owner or admin)
- `DELETE /api/v1/courses/{id}` - delete (admin)


### Notes
- Security is implemented with a simple JWT filter that reads `jwt.secret`. For production, rotate secrets and prefer RS256 with JWKS.
- Instructor and ownership referencing uses `instructorId` string which should be the `sub` claim from user-service token.

## Analytics Service (FastAPI + PostgreSQL)

This service provides analytics for the CRM microservices application.

### Features
- Store metrics (trainer performance, learner performance, enrollments)
- Retrieve aggregated stats
- JWT authentication ready for integration with User Service

### Endpoints
- `GET /health` → Health check
- `POST /analytics/` → Add analytics record
- `GET /analytics/stats` → Get all analytics records

### Setup
1. Copy `.env.example` to `.env` and update values
2. Run DB migrations:
   ```bash
   python -m app.database
### run locally
```
uvicorn app.main:app --reload --port 8000
```

### docker run
```
docker build -t analytics-service .
docker run --env-file .env -p 8000:8000 analytics-service
```