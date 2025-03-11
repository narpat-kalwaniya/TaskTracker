import logging
import sys
from fastapi import APIRouter, Depends, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from utility.db_connection import get_db
from apps.services.task_service import (
    task_create_service,
    get_task_list_service,
    update_task_service,
    task_delist_service,
)

sys.path.append("..")
logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/create_tasks/")
async def create_project(request: Request, db: Session = Depends(get_db)):

    try:
        input_payload = await request.json()
        if (
            not input_payload.get("task_title")
            or not input_payload.get("project_id")
            or not input_payload.get("task_owner_email")
        ):
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "message": "Task name and Task Owner email and Project ID are required"
                },
            )

        if "assignee_email" not in input_payload:
            assignee_email = ""
        else:
            assignee_email = input_payload["assignee_email"]

        task_data_response = await task_create_service(
            db,
            input_payload["task_title"],
            input_payload["task_description"],
            input_payload["project_id"],
            input_payload["due_date"],
            input_payload["task_owner_email"],
            input_payload["task_owner"],
            assignee_email,
        )
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )
    return {
        "status": 200,
        "message": "Task Created Successfully",
        "data": task_data_response,
    }


@router.get("/get_task/")
async def get_tables(project_id, db: Session = Depends(get_db)):
    try:
        if not project_id:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": "Project ID is required"},
            )

        task_list_response = await get_task_list_service(db, project_id)
        return {
            "status": 200,
            "message": "All the Available Project List",
            "data": task_list_response,
        }
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )


@router.put("/update_task/{task_id}/")
async def update_task(request: Request, task_id, db: Session = Depends(get_db)):
    try:
        input_payload = await request.json()
        updated_task = await update_task_service(db, input_payload, task_id)
        return {
            "status": 200,
            "message": "Task Updated Succesfully",
            "data": updated_task,
        }
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )


@router.delete("/delete_task/{task_id}")
async def delete_task(request: Request, task_id, db: Session = Depends(get_db)):
    try:
        user_response = await task_delete_service(db, task_id)
        return {
            "status": 200,
            "message": "Task Deleted Succesfully",
            "data": user_response,
        }
    except Exception as e:
        logger.exception(e)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error While Fetching the Data"},
        )
