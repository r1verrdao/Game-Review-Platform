from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId
from datetime import datetime, timezone

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, handler=None):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")

class ReviewModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: str
    game_id: str
    rating: int = Field(ge=1, le=5)
    content: str = Field(..., min_length=1)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class ReviewCreate(BaseModel):
    game_id: str
    rating: int = Field(ge=1, le=5)
    content: str = Field(..., min_length=1)

class ReviewResponse(BaseModel):
    id: str
    user_id: str
    game_id: str
    rating: int
    content: str
    created_at: datetime
