import re
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import validates
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)

    @validates("username")
    def validate_username(self, key, username):
        if not username:
            raise ValueError("Username cannot be empty")
        username_str = str(username).strip()
        if not re.match(r"^[a-zA-Z0-9_]+$", username_str):
            raise ValueError("Username must contain only standard alphanumeric characters or underscores")
        return username_str

    @validates("email")
    def validate_email(self, key, email):
        if not email:
            raise ValueError("Email cannot be empty")
        email_str = str(email).strip().lower()
        email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        if not re.match(email_regex, email_str):
            raise ValueError("Invalid email format")
        return email_str


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    activity = Column(String, nullable=False)
    hours = Column(Integer, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    @validates("name", "activity")
    def validate_standard_text(self, key, text_value):
        if not text_value or not text_value.strip():
            raise ValueError(f"{key.capitalize()} field cannot be empty")
        if not re.match(r"^[a-zA-Z0-9 \.,\-]+$", str(text_value)):
            raise ValueError(f"{key.capitalize()} contains restricted special characters")
        return text_value.strip()

    @validates("hours")
    def validate_hours(self, key, hours_value):
        if hours_value is not None and hours_value < 0:
            raise ValueError("Hours cannot be negative")
        return hours_value