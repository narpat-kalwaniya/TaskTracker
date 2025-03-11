import logging
import sys
from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import Optional
from utility.db_connection import get_db
from apps.services.user_service import (
    add_user_service,
    get_user_list_service,
    update_user_role_service,
    user_delist_service,
)

sys.path.append("..")
logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/add_user/")
async def create_user(request: Request, db: Session = Depends(get_db)):
    input_payload = await request.json()
    try:
        if not input_payload.get("user_email") or not input_payload.get("user_name"):
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "User Email & User Name is Required"},
            )

        if "role" in input_payload:
            role = input_payload["role"]
        else:
            role = "Read Only"

        add_user_response = await add_user_service(
            db,
            input_payload["user_email"],
            input_payload["user_name"],
            role,
        )
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )
    return {
        "status": 200,
        "data": add_user_response,
    }


@router.get("/get_user_list/")
async def get_user_list(
    user_email: Optional[str] = None, db: Session = Depends(get_db)
):
    try:
        user_list_response = await get_user_list_service(db, user_email)
        return {
            "status": 200,
            "message": "All the Available Project List",
            "data": user_list_response,
        }
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )


@router.put("/update_user_role/{user_email}")
async def update_user_role(request: Request, user_email, db: Session = Depends(get_db)):
    try:
        input_payload = await request.json()
        if "role" not in input_payload:
            role = None
        else:
            role = input_payload["role"]
        user_response = await update_user_role_service(db, user_email, role)
        return {
            "status": 200,
            "message": "User Role Updated Succesfully",
            "data": user_response,
        }
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )


@router.delete("/delete_user/{user_email}")
async def delete_user_role(request: Request, user_email, db: Session = Depends(get_db)):
    try:
        user_response = await user_delist_service(db, user_email)
        return {
            "status": 200,
            "message": "User Removed Succesfully",
            "data": user_response,
        }
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )
