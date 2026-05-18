<!-- # GoTeacher

GoTeacher is a simple web app for teachers to track what their students are working on. You log a student's name, what they did, and how many hours they spent — that's it.

It comes with a clean dashboard, a student directory, some charts, and everything is locked behind a login so each teacher only sees their own data.

---

## What it does

- Teachers can register and log in with their own account
- Add, edit, and delete student activity entries
- Search through logs by student name or activity
- View a student directory with engagement stats
- See charts of activity trends over time
- Dashboard shows total hours, total entries, and top student at a glance

---

## Built with

- **Backend:** FastAPI + SQLite
- **Frontend:** React + Vite + Tailwind CSS
- **Charts:** Recharts
- **Auth:** JWT tokens with bcrypt password hashing

---

## Running it locally

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy passlib[bcrypt] python-jose[cryptography] pydantic[email]
uvicorn main:app --reload
```

API runs at `http://127.0.0.1:8000` — visit `/docs` for the interactive API explorer.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## Before going to production

Change the secret key in `auth.py` — the default one is not safe:

```python
SECRET_KEY = "your-secret-key-change-in-production"
```

Generate a real one with:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

---

## License

MIT -->

SAT/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── auth.py
│   ├── database.py
│   └── activities.db          # auto-generated on first run
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── ActivityForm.jsx
    │   │   ├── ActivityList.jsx
    │   │   ├── DeleteModal.jsx
    │   │   ├── Pagination.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── StudentProfileModal.jsx
    │   │   ├── SummaryCard.jsx
    │   │   └── UserProfileModal.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   └── useActivities.js
    │   ├── pages/
    │   │   ├── Activities.jsx
    │   │   ├── Analytics.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Students.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js