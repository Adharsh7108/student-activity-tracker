from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

import models
import schemas
import crud
import auth
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Activity Tracker API")

# Updated CORS Middleware to include both 5173 and 5174 ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    username = auth.decode_token(token)
    if not username:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    user = crud.get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/")
def root():
    return {"message": "Student Activity Tracker API Running"}

@app.post("/auth/register", response_model=schemas.UserResponse, status_code=201)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already taken")
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email address already registered")
    try:
        return crud.create_user(db, user)
    except ValueError as val_err:
        raise HTTPException(status_code=400, detail=str(val_err))

@app.post("/auth/login", response_model=schemas.TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, form_data.username)
    if not user or not crud.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/auth/me", response_model=schemas.UserResponse)
def me(current_user=Depends(get_current_user)):
    return current_user

@app.get("/activities", response_model=list[schemas.ActivityResponse])
def fetch_activities(search: str = "", db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return crud.get_activities(db, current_user.id, search)

@app.post("/activities", response_model=schemas.ActivityResponse, status_code=201)
def add_activity(activity: schemas.ActivityCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return crud.create_activity(db, activity, current_user.id)

@app.put("/activities/{activity_id}", response_model=schemas.ActivityResponse)
def edit_activity(activity_id: int, activity: schemas.ActivityCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    updated = crud.update_activity(db, activity_id, activity, current_user.id)
    if not updated:
        raise HTTPException(status_code=404, detail="Activity not found")
    return updated

@app.delete("/activities/{activity_id}")
def remove_activity(activity_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    activity = crud.delete_activity(db, activity_id, current_user.id)
    if not activity:
        raise HTTPException(status_code=404, detail="Activity not found")
    return {"message": "Activity deleted successfully"}

@app.get("/summary")
def summary(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return crud.get_summary(db, current_user.id)