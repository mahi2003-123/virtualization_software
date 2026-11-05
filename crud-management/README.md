# Enterprise CRUD Management Software with Docker & Nginx

A production-grade, containerized full-stack workforce and employee CRUD management application engineered with **React 19**, **Spring Boot 3 (Java 21)**, **PostgreSQL 16**, and an **Nginx Reverse Proxy Gateway**.

---

## 1. Project Overview & Architecture

This application demonstrates how a modern multi-tier enterprise architecture is containerized into standalone, modular Docker images, linked over an isolated internal virtual network, and unified behind a single high-performance Nginx reverse proxy gateway.

### High-Level Architecture Diagram

```
                             [ User Browser / Desktop Shortcut ]
                                             │
                                     (HTTP Port 80)
                                             │
                                             ▼
                                  ┌────────────────────┐
                                  │     crud-nginx     │ (Reverse Proxy Gateway)
                                  │   (Nginx Alpine)   │
                                  └─────────┬──────────┘
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     │                                             │
      Path: "/" (SPA Client)                        Path: "/api/*" (REST APIs)
                     │                                             │
                     ▼                                             ▼
         ┌───────────────────────┐                     ┌───────────────────────┐
         │     crud-frontend     │                     │     crud-backend      │
         │  (React 19 + Vite)    │                     │  (Spring Boot 3 /     │
         │  (Port 80 Internal)   │                     │   Java 21 Runtime)    │
         └───────────────────────┘                     │ (Port 8080 Internal)  │
                                                       └───────────┬───────────┘
                                                                   │
                                                            (JDBC Port 5432)
                                                                   │
                                                                   ▼
                                                       ┌───────────────────────┐
                                                       │     crud-postgres     │
                                                       │ (PostgreSQL 16 Alpine)│
                                                       │   [Named Volume]      │
                                                       └───────────────────────┘
```

### Key Architectural Strengths

- **Single Entry Point (`http://localhost`)**: Only port 80 of the Nginx container is exposed to the host machine. Database (5432) and backend (8080) ports remain safely guarded within the internal Docker bridge network (`crud-network`).
- **No CORS Issues in Production**: Since Nginx serves the frontend at `/` and proxies REST endpoints at `/api/`, the browser perceives all calls as originating from the same domain and port (`http://localhost`).
- **Data Persistence**: A dedicated Docker volume (`postgres_data`) preserves employee records across container recreation, builds, or restarts.
- **Enterprise Health Checks**: All containers feature active health monitoring with dependent boot sequencing (`service_healthy`).

---

## 2. Technology Stack

| Tier | Technologies | Role / Capabilities |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Material UI (MUI), Axios, React Router | Modern responsive admin dashboard, landing page, interactive CRUD tables, search, filters, modals, form validation, and toast notifications. |
| **Backend** | Java 21, Spring Boot 3.3, Spring Data JPA, Hibernate, Actuator | REST API controllers, service layer, repository query specifications, DTO mappings, global exception handling, and auto-seeded sample workforce dataset. |
| **Database** | PostgreSQL 16 Alpine | Relational enterprise database with ACID compliance and automatic schema creation via Hibernate DDL. |
| **DevOps** | Docker, Docker Compose, Nginx 1.27 Alpine | Multi-stage image builds, bridge networking, volume persistence, reverse proxy routing, and health probes. |

---

## 3. Directory Structure

```
crud-management/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/crud/management/
│   │   │   │   ├── config/             # CORS & sample DataInitializer
│   │   │   │   ├── controller/         # REST endpoints (/api/employees)
│   │   │   │   ├── dto/                # Request, Response, Pagination, Stats DTOs
│   │   │   │   ├── entity/             # JPA Employee Entity
│   │   │   │   ├── exception/          # Global Exception Handler & Custom Exceptions
│   │   │   │   ├── repository/         # Spring Data JPA Repository with custom queries
│   │   │   │   ├── service/            # Business logic and interfaces
│   │   │   │   └── CrudManagementApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties # Spring configuration with env variables
│   │   ├── pom.xml                     # Maven build descriptor
│   │   ├── Dockerfile                  # Multi-stage Maven -> Java 21 JRE Alpine
│   │   └── .dockerignore
├── frontend/
│   ├── src/
│   │   ├── components/                 # Navbar, Sidebar, Table, Modals, StatCards
│   │   ├── pages/                      # LandingPage & DashboardPage
│   │   ├── services/                   # Axios API client
│   │   ├── theme/                      # Custom Material UI theme
│   │   ├── types/                      # TypeScript definitions
│   │   ├── App.tsx                     # React Router configurations
│   │   └── main.tsx
│   ├── nginx.conf                      # Internal SPA routing (try_files)
│   ├── Dockerfile                      # Multi-stage Node 22 build -> Nginx Alpine
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .dockerignore
├── nginx/
│   ├── nginx.conf                      # Gateway Reverse Proxy configuration
│   └── Dockerfile                      # Gateway Dockerfile
├── docker-compose.yml                  # Full stack multi-container orchestration
├── .env.example                        # Example environment variables
├── .env                                # Active environment configuration
├── create-desktop-shortcut.ps1         # Windows one-click Desktop shortcut creator
└── README.md
```

---

## 4. Prerequisites

Before running the application, make sure you have:

- **Docker Desktop** installed and running on your system (Docker Engine 20.10+ / Compose v2+).
- **Web Browser** (Chrome, Edge, Firefox, Brave, Safari).
- *(Optional for local manual compilation)*: Java 21 JDK, Maven 3.9+, Node.js 20+.

---

## 5. Quick Start with Docker Compose

### Step 1: Navigate to the Project Root

```powershell
cd crud-management
```

### Step 2: Configure Environment Variables

The project comes with a `.env` file pre-configured for standard local execution. To customize passwords or database names, inspect `.env`:

```env
POSTGRES_DB=crud_db
POSTGRES_USER=crud_user
POSTGRES_PASSWORD=crud_secure_pass_2026
DB_URL=jdbc:postgresql://postgres:5432/crud_db
DB_USERNAME=crud_user
DB_PASSWORD=crud_secure_pass_2026
NGINX_PORT=80
```

### Step 3: Build & Start All Containers

Run the single standard Docker Compose command:

```powershell
docker compose up -d --build
```

Docker will:
1. Pull PostgreSQL 16 Alpine and initialize the database.
2. Build the multi-stage **crud-backend** image (compiling Java 21 code with Maven).
3. Build the multi-stage **crud-frontend** image (building the React 19 SPA with Vite).
4. Build the **crud-nginx** reverse proxy gateway.
5. Create the internal network `crud-network` and persistent volume `postgres_data`.
6. Start containers in the correct sequence based on health checks.

---

## 6. Accessing the Application

Once the containers are up:

| Destination | URL | Description |
| :--- | :--- | :--- |
| **Landing Page** | [http://localhost](http://localhost) | Presentation hero page with interactive preview banner and launch button. |
| **CRUD Dashboard** | [http://localhost/dashboard](http://localhost/dashboard) | Full workforce administration dashboard with live CRUD operations. |
| **REST API (Employees)** | [http://localhost/api/employees](http://localhost/api/employees) | Spring Boot REST API returning paginated JSON employee records. |
| **Dashboard Stats API** | [http://localhost/api/employees/stats](http://localhost/api/employees/stats) | Workforce statistics and departmental breakdown. |
| **Spring Actuator Health** | [http://localhost/actuator/health](http://localhost/actuator/health) | Backend health monitoring endpoint. |

### Application Launch Experience

- **Clickable Application Hero Image**: Clicking the application preview banner or the brand logo on the landing page immediately opens the CRUD dashboard (`/dashboard`).
- **Launch Application Button**: The prominent "Launch Application" button opens the dashboard directly without opening any local Node development server.

### Creating a Desktop Shortcut (Windows)

To launch the containerized application straight from your Windows desktop:

1. Right-click on your Windows Desktop -> **New** -> **Shortcut**.
2. Enter the destination URL: `http://localhost`
3. Click **Next**, name the shortcut `WorkforcePro CRUD`, and click **Finish**.
4. *(Optional)* Right-click the newly created shortcut -> **Properties** -> **Change Icon** to customize its appearance.

Alternatively, execute the included PowerShell script:
```powershell
powershell -ExecutionPolicy Bypass -File .\create-desktop-shortcut.ps1
```

---

## 7. CRUD Application Operations

The application comes pre-seeded with 12 enterprise employee profiles across Engineering, Product, HR, Finance, and Sales.

### Supported Operations:
1. **Create Employee**: Click **"Add Employee"** to open the modal. Complete the fields with instant client and server-side validation.
2. **View All Employees**: Interactive table with sorting, department badges, and formatted compensation.
3. **View Individual Employee**: Click the eye icon next to any employee to view their complete profile card.
4. **Update Employee**: Click the pencil icon to modify contact details, department, title, or salary.
5. **Delete Employee**: Click the trash icon to trigger the delete confirmation modal.
6. **Search**: Type in the search box to find employees across name, email, designation, or employee code.
7. **Filter**: Select a department from the dropdown to narrow records.
8. **Pagination**: Switch between 5, 10, 25, or 50 records per page.

---

## 8. Managing Containers

### Check Running Containers & Status

```powershell
docker compose ps
```

### View Live Container Logs

```powershell
# View logs from all services:
docker compose logs -f

# View backend logs only:
docker compose logs -f backend

# View Nginx gateway logs:
docker compose logs -f nginx
```

### Stop Containers

```powershell
# Stop without removing data:
docker compose stop

# Stop and remove containers and networks (data is preserved in postgres_data volume):
docker compose down
```

### Restart Containers

```powershell
docker compose restart
```

### Reset Database Volume (Fresh Start)

```powershell
docker compose down -v
docker compose up -d --build
```

---

## 9. Inspecting Docker Images & Networks

To inspect the production images created:

```powershell
docker images | Select-String "crud-"
```

Expected images:
- `crud-frontend`
- `crud-backend`
- `crud-nginx`

To inspect the internal Docker bridge network:

```powershell
docker network inspect crud-management_crud-network
```

---

## 10. Troubleshooting

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| **Port 80 already in use** | IIS, Skype, or another local web server is bound to port 80. | Change `NGINX_PORT=8080` in `.env` and run `docker compose up -d`. Then access `http://localhost:8080`. |
| **Backend reports database connection refused** | Backend started before PostgreSQL initialized. | The `docker-compose.yml` uses `condition: service_healthy` on postgres. Run `docker compose restart backend`. |
| **Page reload gives 404** | SPA routes not redirected to `index.html`. | Both frontend and gateway Nginx configs include `try_files $uri $uri/ /index.html;`. |
| **Changes to code not showing** | Running cached Docker layers. | Rebuild images using `docker compose up -d --build --force-recreate`. |
