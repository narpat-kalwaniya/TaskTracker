from apps.models.models import Project
import datetime
import logging
import sys

sys.path.append("..")
logger = logging.getLogger(__name__)


async def project_create_service(
    db,
    project_name,
    project_description,
    project_end_date,
    creator_email,
    creator_username,
):
    try:
        db_project = Project(
            project_name=project_name,
            description=project_description,
            start_date=datetime.datetime.now(),
            end_date=project_end_date,
            project_owner_email=creator_email,
            project_owner=creator_username,
        )

        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        db.close()

        result = {
            "project_id": db_project.project_id,
        }
    except Exception as e:
        logger.exception(e)
    return result


async def get_project_list_service(db, creator_email=None):
    try:
        logger.info("get_project_list_service is started")
        query = db.query(Project)

        if creator_email:
            logger.info("filtering the project based on user email")
            project_list = query.filter(
                Project.project_owner_email == creator_email
            ).all()
        else:
            logger.info("fetching all the projects")
            project_list = query.all()

        result = {"project_data": project_list}
        logger.info("get_project_list_service is ended")
        return result
    except Exception as e:
        logger.exception(e)


async def get_project_data(db, project_id):
    try:
        logger.info("get_project_data is started")
        query = db.query(Project)

        if project_id:
            logger.info("filtering the project based on user email")
            project_list = query.filter(Project.project_id == project_id).all()

        result = {"project_data": project_list}
        logger.info("get_project_data is ended")
        return result
    except Exception as e:
        logger.exception(e)


async def project_delist_service(db, project_id):
    try:
        logger.info("project_delist_service is started")
        query = db.query(Project)
        project_info = query.filter(Project.project_id == project_id).first()

        if not project_info:
            db.close()
            return {"message": "Project Not Found"}

        db.delete(project_info)
        db.commit()
        db.close()

        data = {"message": "Project Removed Successfully"}

        logger.info("project_delist_service is ended")
        return data
    except Exception as e:
        logger.exception(e)
