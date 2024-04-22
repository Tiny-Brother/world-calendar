from mongoengine import (
    StringField,
    DateTimeField,
    ListField,
    Document,
    URLField,
    EmbeddedDocument,
    GenericEmbeddedDocumentField,
)


class Address(EmbeddedDocument):
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
