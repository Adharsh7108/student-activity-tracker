from sqlalchemy.orm import Session
from sqlalchemy import func
import models
import schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email.lower()).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed = pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username, 
        email=user.email.lower(), 
        hashed_password=hashed
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_activity(db: Session, activity: schemas.ActivityCreate, owner_id: int):
    db_activity = models.Activity(**activity.model_dump(), owner_id=owner_id)
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

def get_activities(db: Session, owner_id: int, search: str = ""):
    query = db.query(models.Activity).filter(models.Activity.owner_id == owner_id)
    if search:
        query = query.filter(
            models.Activity.name.ilike(f"%{search}%")
            | models.Activity.activity.ilike(f"%{search}%")
        )
    return query.order_by(models.Activity.id.desc()).all()

def get_activity(db: Session, activity_id: int, owner_id: int):
    return db.query(models.Activity).filter(models.Activity.id == activity_id, models.Activity.owner_id == owner_id).first()

def update_activity(db: Session, activity_id: int, activity: schemas.ActivityCreate, owner_id: int):
    db_activity = get_activity(db, activity_id, owner_id)
    if not db_activity:
        return None
    db_activity.name = activity.name
    db_activity.activity = activity.activity
    db_activity.hours = activity.hours
    db.commit()
    db.refresh(db_activity)
    return db_activity

def delete_activity(db: Session, activity_id: int, owner_id: int):
    db_activity = get_activity(db, activity_id, owner_id)
    if not db_activity:
        return None
    db.delete(db_activity)
    db.commit()
    return db_activity

def get_summary(db: Session, owner_id: int):
    activities = db.query(models.Activity).filter(models.Activity.owner_id == owner_id).all()
    total_entries = len(activities)
    total_hours = sum(item.hours for item in activities)
    most_active = (
        db.query(models.Activity.name, func.sum(models.Activity.hours).label("total"))
        .filter(models.Activity.owner_id == owner_id)
        .group_by(models.Activity.name)
        .order_by(func.sum(models.Activity.hours).desc())
        .first()
    )
    return {
        "total_entries": total_entries,
        "total_hours": total_hours,
        "most_active_user": most_active[0] if most_active else "N/A",
    }