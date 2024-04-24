import uuid
from datetime import datetime, timedelta
from typing import Any

from pydantic import UUID4

from backend.auth.config import auth_config
from backend.auth.exceptions import InvalidCredentials
from backend.auth.schemas import AuthUser
from backend.auth.security import check_password, hash_password
from backend.models import AuthUser, RefreshToken
from backend.utils.alphanumeric import generate_random_alphanum
from backend.utils.database_operations import RefreshToken


async def create_user(user: AuthUser) -> dict[str, Any] | None:
    insert_query = (
        insert(auth_user)
        .values(
            {
                "email": user.email,
                "password": hash_password(user.password),
                "created_at": datetime.utcnow(),
            }
        )
        .returning(auth_user)
    )

    return await fetch_one(insert_query)


async def get_user_by_id(user_id: int) -> dict[str, Any] | None:
    select_query = select(auth_user).where(auth_user.c.id == user_id)

    return await fetch_one(select_query)


async def get_user_by_email(email: str) -> dict[str, Any] | None:
    select_query = select(auth_user).where(auth_user.c.email == email)

    return await fetch_one(select_query)


async def create_refresh_token(
    *, user_id: int, refresh_token: str | None = None
) -> str:
    if not refresh_token:
        refresh_token = generate_random_alphanum(64)

    insert_query = RefreshToken.insert().values(
        uuid=uuid.uuid4(),
        refresh_token=refresh_token,
        expires_at=datetime.utcnow() + timedelta(seconds=auth_config.REFRESH_TOKEN_EXP),
        user_id=user_id,
    )
    await execute(insert_query)

    return RefreshToken


async def get_refresh_token(refresh_token: str) -> dict[str, Any] | None:
    select_query = RefreshToken.select().where(
        RefreshToken.c.refresh_token == refresh_token
    )

    return await fetch_one(select_query)


async def expire_refresh_token(refresh_token_uuid: UUID4) -> None:
    update_query = (
        RefreshToken.update()
        .values(expires_at=datetime.utcnow() - timedelta(days=1))
        .where(RefreshToken.c.uuid == refresh_token_uuid)
    )

    await execute(update_query)


async def authenticate_user(auth_data: AuthUser) -> dict[str, Any]:
    user = await get_user_by_email(auth_data.email)
    if not user:
        raise InvalidCredentials()

    if not check_password(auth_data.password, user["password"]):
        raise InvalidCredentials()

    return user
