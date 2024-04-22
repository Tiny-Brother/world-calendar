ARG PYTHON_VERSION=3.12
ARG TAG=slim-bookworm

FROM python:${PYTHON_VERSION}-${TAG} as builder

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache \
    POETRY_VERSION=1.8.2

RUN pip install "poetry==$POETRY_VERSION"
    
WORKDIR /app

COPY pyproject.toml poetry.lock /app/
RUN poetry install --no-root && rm -rf $POETRY_CACHE_DIR

FROM python:${PYTHON_VERSION}-${TAG} as app

ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH"

COPY --from=builder ${VIRTUAL_ENV} ${VIRTUAL_ENV}
COPY app ./app/app

WORKDIR /app

# Django service
CMD ["uvicorn", "app.api:app", "--host", "0.0.0.0", "--port", "8000", "--no-use-colors", "--no-access-log", "--log-level", "debug"]