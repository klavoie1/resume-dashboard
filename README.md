# Job Application Dashboard

A full‑stack web application to track your job applications, monitor progress, and visualize your success rate.

## Overview
This project provides a simple dashboard where you can:
- Add and manage job applications
- Track statuses (e.g., Applied, Interviewing, Offer, Rejected)
- See quick summary cards (totals, accepted, pending, success rate)
- Visualize trends over time (room for charts)

The backend is built with Spring Boot (Java) and the frontend is an Angular application located under `src/UI`.

## Tech Stack
- Backend: Spring Boot (Java, Maven)
- Database: MySQL
- Frontend: Angular, [ngx-charts](https://github.com/swimlane/ngx-charts/tree/master)
- Styling: CSS, Bootstrap (icons via Font Awesome)
- Design: Figma

## Project Structure
- `src/main/java/com/resume/dashboard/` — Spring Boot application sources
  - `DashboardApplication.java` — main entry point
- `src/UI/` — Angular frontend
  - `angular.json` — Angular workspace config
  - `src/app/features/dashboard/` — dashboard feature (HTML/CSS/TS)

## Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+ and npm 9+ (or the latest LTS)
- Angular CLI (recommended): `npm install -g @angular/cli`

## Quick Start
Run backend and frontend in parallel during development.

### 1) Backend (Spring Boot)
From the project root:

```bash
# start the Spring Boot app on http://localhost:8080
./mvnw spring-boot:run
# or, if using Windows
mvnw.cmd spring-boot:run
```

The application class is at:
```
src/main/java/com/resume/dashboard/DashboardApplication.java
```

### 2) Frontend (Angular)
From the Angular project directory:

```bash
cd src/UI
npm install
# start the dev server on http://localhost:4200
npm start
# or
ng serve
```

By default, Angular runs on port 4200 and Spring Boot on port 8080. Configure CORS or API base URLs as needed for integration.

## Environment Configuration
- API base URL can be set in Angular environments (e.g., `src/UI/src/environments/`). If not yet present, you can add standard Angular environment files and point to `http://localhost:8080` for local dev.
- Spring Boot application properties (e.g., port, datasource) can be set in `src/main/resources/application.properties` (create if needed).

## Build
- Backend JAR:
```bash
./mvnw clean package
```
- Frontend production build:
```bash
cd src/UI
npm run build
# build artifacts will be in src/UI/dist/
```

## Scripts
Common commands:
- Backend: `./mvnw spring-boot:run`
- Frontend: `npm start` or `ng serve` (inside `src/UI`)
- Frontend build: `npm run build` (inside `src/UI`)

## Features Roadmap
- [x] Persist applications (REST endpoints, database integration)
- [ ] Create, update, delete applications from UI ***(WIP)***
- [ ] Filter and search
- [ ] Charts for timeline and outcomes
- [ ] Import/export (CSV)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create a feature branch
3. Commit changes with clear messages
4. Open a PR

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
