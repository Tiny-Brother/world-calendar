import os
from loguru import logger

import app.utils.database_operations as db_ops
from app.utils.log import setup_logging

from fastapi import FastAPI, HTTPException, Request
from fastapi.exception_handlers import (
    http_exception_handler,
    request_validation_exception_handler,
)
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from starlette import status
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.responses import RedirectResponse

# from starlette_exporter import PrometheusMiddleware, handle_metrics
# from starlette_exporter.optional_metrics import response_body_size, request_body_size


setup_logging(json=True)
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
# api.add_middleware(
#     PrometheusMiddleware,
#     app_name="world_calendar_api",
#     prefix="world_calendar_api",
#     group_paths=True,
#     buckets=[0.1, 0.25, 0.5, 0.75, 1.0],
#     skip_paths=[
#         "/metrics",
#         "/favicon.ico",
#         "/_/health",
#         "/docs",
#         "/openapi.json",
#         "/",
#     ],
#     optional_metrics=[response_body_size, request_body_size],
# )


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


###
# API routes
###
# api.add_route("/metrics", handle_metrics)


@app.get(
    "/", response_class=RedirectResponse, status_code=status.HTTP_307_TEMPORARY_REDIRECT
)
def home():
    return "/openapi.json"
