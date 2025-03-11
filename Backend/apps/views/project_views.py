import logging
import sys
from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from utility.db_connection import get_db
from typing import Optional
from apps.services.project_service import (
    project_create_service,
    get_project_list_service,
    get_project_data,
    project_delist_service,
)

sys.path.append("..")
logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/create_project/")
async def create_project(request: Request, db: Session = Depends(get_db)):
    input_payload = await request.json()
    try:
        if not input_payload.get("project_title") or not input_payload.get(
            "creator_email"
        ):
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Project name and owner email are required"},
            )

        project_data_response = await project_create_service(
            db,
            input_payload["project_title"],
            input_payload["project_description"],
            input_payload["project_end_date"],
            input_payload["creator_email"],
            input_payload["creator_username"],
        )
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )
    return {
        "status": 200,
        "message": "Project Created Successfully",
        "data": project_data_response,
    }


@router.get("/get_projects/")
async def get_tables(
    creator_email: Optional[str] = None, db: Session = Depends(get_db)
):
    try:
        project_list_response = await get_project_list_service(db, creator_email)
        return {
            "status": 200,
            "message": "All the Available Project List",
            "data": project_list_response,
        }
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )


@router.get("/project_data/{project_id}/")
async def project_data(project_id, db: Session = Depends(get_db)):
    try:
        if not project_id:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Project ID is required to get the info"},
            )

        project_data = await get_project_data(db, project_id)
        return {
            "status": 200,
            "message": "Project Data for the given project ID",
            "data": project_data,
        }
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )


@router.delete("/delete_project/{project_id}")
async def delete_project(request: Request, project_id, db: Session = Depends(get_db)):
    try:
        project_response = await project_delist_service(db, project_id)
        return {
            "status": 200,
            "message": "Project Removed Succesfully",
            "data": project_response,
        }
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )
