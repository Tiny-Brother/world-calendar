from typing import Any

from pydantic import model_validator
from pydantic_settings import BaseSettings

from backend.constants import Environment


class Config(BaseSettings):
    DATABASE_URL: str

    SITE_DOMAIN: str = "myapp.com"

    CORS_ORIGINS: list[str]
    CORS_ORIGINS_REGEX: str | None = None
    CORS_HEADERS: list[str]

    APP_VERSION: str = "1"

    ENVIRONMENT: Environment = Environment.PRODUCTION


settings = Config(
    DATABASE_URL="db_uri",
    CORS_ORIGINS=["*"],  # to be changed
    CORS_HEADERS=["*"],  # to be changed
)

app_configs: dict[str, Any] = {"title": "App API"}
if settings.ENVIRONMENT.is_deployed:
    app_configs["root_path"] = f"/v{settings.APP_VERSION}"

if not settings.ENVIRONMENT.is_debug:
    app_configs["openapi_url"] = None  # hide docs
