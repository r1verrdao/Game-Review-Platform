from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

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

class GameModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str
    genre: str
    difficulty: str
    hardware_notes: Optional[str] = None
    description: Optional[str] = None
    developer: Optional[str] = None
    release_date: Optional[str] = None
    cover_asset: Optional[str] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class GameCreate(BaseModel):
    title: str
    genre: str
    difficulty: str
    hardware_notes: Optional[str] = None
    description: Optional[str] = None
    developer: Optional[str] = None
    release_date: Optional[str] = None
    cover_asset: Optional[str] = None

class GameResponse(BaseModel):
    id: str
    title: str
    genre: str
    difficulty: str
    hardware_notes: Optional[str] = None
    description: Optional[str] = None
    developer: Optional[str] = None
    release_date: Optional[str] = None
    cover_asset: Optional[str] = None
