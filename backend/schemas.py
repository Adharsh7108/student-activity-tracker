from pydantic import BaseModel, Field, field_validator, EmailStr
from datetime import datetime
from typing import Optional
import re

class ActivityCreate(BaseModel):
    name: str = Field(..., min_length=1)
    activity: str = Field(..., min_length=1)
    hours: int = Field(..., ge=0)

    @field_validator("name", "activity")
    @classmethod
    def validate_standard_text(cls, value: str) -> str:
        if not re.match(r"^[a-zA-Z0-9 \.,\-]+$", value):
            raise ValueError("Field contains restricted special characters")
        return value.strip()


class ActivityResponse(BaseModel):
    id: int
    name: str
    activity: str
    hours: int
    owner_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    username: str = Field(..., min_length=3)
    email: EmailStr
    password: str = Field(..., min_length=6)

    @field_validator("username")
    @classmethod
    def validate_username(cls, value: str) -> str:
        if not re.match(r"^[a-zA-Z0-9_]+$", value):
            raise ValueError("Username must contain only standard letters, numbers, or underscores")
        return value


class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str