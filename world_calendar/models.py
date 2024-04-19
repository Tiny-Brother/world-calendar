from mongoengine import (
    StringField,
    DateTimeField,
    ListField,
    EmbeddedDocument,
)

EVENT_TYPES = (
    "Local Power",
    "Government",
    "Election",
    "Non Governmental Event",
)


# Create your models here.
class Event(EmbeddedDocument):
    name = StringField(required=True)
    start_date = DateTimeField(required=True)
    end_date = DateTimeField(required=True)
    location = StringField(required=True)
    description = StringField(required=False)
    participants = ListField(StringField(), required=False)
    link = StringField(required=False)
    type = StringField(required=True, choices=EVENT_TYPES)
