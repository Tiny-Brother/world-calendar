import datetime

from mongoengine import (
    DateTimeField,
    Document,
    EmbeddedDocument,
    GenericEmbeddedDocumentField,
    ListField,
    StringField,
    IntField,
    DateTimeField,
    BooleanField,
    BinaryField,
    ReferenceField,
    URLField,
    CASCADE,
)

from datetime import datetime
from typing import Any
from zoneinfo import ZoneInfo

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, ConfigDict, model_validator
from datetime import datetime


def convert_datetime_to_gmt(dt: datetime) -> str:
    if not dt.tzinfo:
        dt = dt.replace(tzinfo=ZoneInfo("UTC"))

    return dt.strftime("%Y-%m-%dT%H:%M:%S%z")


class CustomModel(BaseModel):
    model_config = ConfigDict(
        json_encoders={datetime: convert_datetime_to_gmt},
        populate_by_name=True,
    )

    @model_validator(mode="before")
    @classmethod
    def set_null_microseconds(cls, data: dict[str, Any]) -> dict[str, Any]:
        datetime_fields = {
            k: v.replace(microsecond=0)
            for k, v in data.items()
            if isinstance(v, datetime)
        }

        return {**data, **datetime_fields}

    def serializable_dict(self, **kwargs):
        """Return a dict which contains only serializable fields."""
        default_dict = self.model_dump()

        return jsonable_encoder(default_dict)


class AuthUser(Document):
    email = StringField(required=True)
    password = BinaryField(required=True)
    is_admin = BooleanField(default=False)
    created_at = DateTimeField(default=datetime.now().timestamp())
    updated_at = DateTimeField()


class RefreshToken(Document):
    user_id = ReferenceField("AuthUser", reverse_delete_rule=CASCADE, required=True)
    refresh_token = StringField(required=True)
    expires_at = DateTimeField(required=True)
    created_at = DateTimeField(default=datetime.now().timestamp())
    updated_at = DateTimeField()


class Address(EmbeddedDocument):
    id = IntField()
    street = StringField(required=True)
    city = StringField(required=True)
    state = StringField(required=True)
    zip_code = StringField(required=True)


class GeoLocation(EmbeddedDocument):
    latitude = StringField(required=True)
    longitude = StringField(required=True)


EVENT_TYPES = (
    "Local Power",
    "Government",
    "Election",
    "Non Governmental Event",
)


class Event(Document):
    name = StringField(required=True, max_length=264)
    start_date = DateTimeField(required=True)
    end_date = DateTimeField(required=True)
    location = GenericEmbeddedDocumentField(choices=[Address, GeoLocation, URLField])
    description = StringField(max_length=400)
    participants = ListField(StringField())
    link = URLField()
    type = StringField(required=True, choices=EVENT_TYPES)
