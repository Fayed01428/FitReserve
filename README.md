# FitReserve

FitReserve is a full-stack gym class booking system created for the SER 330 Software Quality Assurance final project. The system uses exactly two personas: Member and Staff.

Members can view available gym classes, reserve a class spot, and view their reservations. Staff can create classes and cancel classes. The project focuses on software quality assurance concepts such as user stories, acceptance criteria, role-based access rules, test planning, Jest testing, and SonarCloud static analysis.

## GitHub Repository

https://github.com/Fayed01428/FitReserve

## Tech Stack

- Frontend: React
- Backend: Node.js with Express
- HTTP Client: Axios
- Testing: Jest and Supertest
- Static Analysis: SonarCloud
- Data Storage: In-memory JavaScript arrays

## Project Structure

```text
FitReserve/
├── Backend/
│   ├── data/
│   │   └── store.js
│   ├── routes/
│   │   ├── classes.js
│   │   └── reservations.js
│   ├── utils/
│   │   └── validation.js
│   ├── app.test.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   └── App.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
