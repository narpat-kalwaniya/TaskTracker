from apps.models.models import Task
from fastapi import status
from fastapi.responses import JSONResponse
import datetime
import logging
import sys

sys.path.append("..")
logger = logging.getLogger(__name__)


async def task_create_service(
    db,
    task_title,
    task_description,
    project_id,
    due_date,
    task_owner_email,
    task_owner,
    assignee_email,
):
    try:
        db_task = Task(
            task_title=task_title,
            task_description=task_description,
            project_id=project_id,
            assignee_email=assignee_email,
            due_date=due_date,
            status="New",
            task_owner=task_owner,
            task_owner_email=task_owner_email,
            created_at=datetime.datetime.now(),
        )

        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        db.close()

        result = {
            "task_id": db_task.task_id,
        }
    except Exception as e:
        logger.exception(e)
    return result


async def get_task_list_service(db, project_id):
    try:
        logger.info("get_task_list_service is started")
        query = db.query(Task)

        if project_id:
            logger.info("filtering the task based on project_id")
            task_list = query.filter(Task.project_id == project_id).all()

        result = {"task_data": task_list, "project_id": project_id}
        logger.info("get_task_list_service is ended")
        return result
    except Exception as e:
        logger.exception(e)


async def update_task_service(db, input_payload, task_id):
    try:
        logger.info("update_task_service is started")
        query = db.query(Task)
        task_info = query.filter(Task.task_id == task_id).first()

        if not task_id:
            db.close()
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"message": "Task Not Found"},
            )

        if "task_title" in input_payload:
            task_info.task_title = input_payload["task_title"]
        if "task_description" in input_payload:
            task_info.task_description = input_payload["task_description"]
        if "assignee_email" in input_payload:
            task_info.assignee_email = input_payload["assignee_email"]
        if "status" in input_payload:
            task_info.status = input_payload["status"]
        if "due_date" in input_payload:
            task_info.due_date = input_payload["due_date"]

        db.commit()
        db.refresh(task_info)

        logger.info("update_task_service is ended")
        return task_info
    except Exception as e:
        logger.exception(e)


async def task_delist_service(db, task_id):
    try:
        logger.info("user_delist_service is started")
        query = db.query(Task)
        task_info = query.filter(Task.task_id == task_id).first()

        if not task_info:
            db.close()
            return {"message": "Task Not Found"}

        db.delete(task_info)
        db.commit()
        db.close()

        data = {"message": "Task Removed Successfully"}

        logger.info("user_delist_service is ended")
        return data
    except Exception as e:
        logger.exception(e)
