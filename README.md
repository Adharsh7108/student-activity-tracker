# Student Activity Tracker (GoTeacher)

A full-stack tracking and dashboard application built for instructors to log student hours, monitor classroom tasks, and visualize performance trends over time.

## Key Capabilities

* Live Filtering: Instant, debounced data searching that maintains input field cursor focus.
* Visual Analytics: Interactive Recharts timelines (Area Chart for trend tracking and Bar Chart for assignment hours breakdown).
* Mobile Optimization: Responsive tables that seamlessly stack into self-contained profile cards when opened on a smartphone.
* Secure Sessions: Encrypted user workflows using JWT tokens and hashed passwords.
* Robust Table Controls: Clean data tables complete with safe dynamic inline loading, custom empty states, and row pagination controls.

---

## Technology Setup

### Frontend
* Core Engine: React.js (Vite Bundle)
* Styling Layout: Tailwind CSS v4 and React Icons
* Data Fetching: Axios and TanStack React Query (Automatic caching and sync)
* Visuals: Recharts

### Backend
* Core Server: FastAPI (Python 3)
* Database Logic: SQLAlchemy ORM with SQLite database mapping (activities.db)
* Security Protocols: Passlib (bcrypt) and Python-Jose (JWT management)

---

## How to Run the Project

### frontend
npm install,
npm run dev

### 1. Run the Backend API
Navigate to your backend directory, install the required packages, and launch your live reload server:

```bash
pip install fastapi uvicorn sqlalchemy passlib[bcrypt] python-jose[cryptography] pydantic[email]
uvicorn main:app --reload

