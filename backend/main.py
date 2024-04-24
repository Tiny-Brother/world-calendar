import os
import uvicorn

from fastapi import FastAPI, Request
from fastapi.exception_handlers import (
    http_exception_handler,
    request_validation_exception_handler,
)
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
from loguru import logger
from starlette import status
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.responses import RedirectResponse

is_development = os.getenv("ENV") == "development"

logger.info("Starting API")

# DB env vars
database = "eventcalendar"
host = os.getenv("MONGODB_HOST", "")
port = os.getenv("MONGODB_PORT", "27107")
user = os.getenv("MONGODB_USER", "poopies")
password = os.getenv("MONGODB_PASSWORD", "")

# db_conn = db_ops.db_connect(host, database, user, password, port)


app = FastAPI(
    title="World Calendar API",
    description="",
    docs_url="/docs",
    redoc_url="/redoc",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TBD: Update this to the actual domain
    allow_credentials=True,
    allow_methods=("GET", "POST"),
    allow_headers=["*"],
)


@app.middleware("http")
async def log_request(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    return response


@app.exception_handler(StarletteHTTPException)
async def custom_http_exception_handler(request, exc):
    logger.error(
        "[Starlette] An HTTP error!",
        fields={"exception": repr(exc)},
        tags=["walert"],
    )
    return await http_exception_handler(request, exc)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    logger.error(
        "[Starlette] The client sent invalid data!",
        fields={"exception": repr(exc)},
        tags=["walert"],
    )
    return await request_validation_exception_handler(request, exc)


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.mongodb_client = AsyncIOMotorClient("mongodb://localhost:27017")
    app.mongodb = app.mongodb_client.mydatabase
    yield
    app.mongodb_client.close()


# app.include_router(todo_router, tags=["tasks"], prefix="/task")


###
# API routes
###
@app.get(
    "/", response_class=RedirectResponse, status_code=status.HTTP_307_TEMPORARY_REDIRECT
)
def home():
    return "/openapi.json"


@app.get("/healthcheck", include_in_schema=False)
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


# app.include_router(auth_router, prefix="/auth", tags=["Auth"])
# app.include_router(
#     external_service_router, prefix="/external-service", tags=["External Service Calls"]
# )


def main(port: int = 80):
    uvicorn.run(
        "apps.api.api:api",
        factory=False,
        host="0.0.0.0",
        port=port,
        log_level="debug" if is_development else "trace",
        reload=True if is_development else False,
        timeout_keep_alive=300000,
        access_log=False,
        use_colors=False,
        # ssl_keyfile="path/to/sslkeyfile",
        # ssl_certfile="path/to/sslcertfile",
        # ssl_version=ssl.PROTOCOL_TLSv1_2,
        # ssl_ciphers="ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384",
    )


if __name__ == "__main__":
    main()
