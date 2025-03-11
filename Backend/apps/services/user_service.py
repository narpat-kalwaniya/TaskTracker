from apps.models.models import User
import logging
import sys

sys.path.append("..")
logger = logging.getLogger(__name__)


async def add_user_service(
    db,
    user_email,
    user_name,
    role,
):
    try:
        user_exist = db.query(User).filter(User.user_email == user_email).all()
        if user_exist:
            data = {"message": "User already Exists"}
            return data

        user_info = User(
            user_email=user_email,
            user_name=user_name,
            role=role,
        )

        db.add(user_info)
        db.commit()
        db.refresh(user_info)
        db.close()

        result = {
            "task_id": user_info.user_email,
            "message": "User Onboarded successfully",
        }
    except Exception as e:
        logger.exception(e)
    return result


async def get_user_list_service(db, email):
    try:
        logger.info("get_user_list_service is started")
        query = db.query(User)
        if email:
            user_list = query.filter(User.user_email == email).all()
            if not user_list:
                return {"app_access": False, "data": "User is not in the List"}
            else:
                return {"app_access": True, "data": user_list}
        else:
            user_list = query.all()

        result = {"data": user_list}
        logger.info("get_user_list_service is ended")
        return result
    except Exception as e:
        logger.exception(e)


async def update_user_role_service(db, user_email, role=None):
    try:
        logger.info("update_user_role_service is started")
        query = db.query(User)
        user_info = query.filter(User.user_email == user_email).first()

        if not user_info:
            db.close()
            return {"message": "User Not Found"}

        if role:
            user_info.role = role

        db.commit()
        db.refresh(user_info)

        logger.info("update_user_role_service is ended")
        return user_info
    except Exception as e:
        logger.exception(e)


async def user_delist_service(db, user_email):
    try:
        logger.info("user_delist_service is started")
        query = db.query(User)
        user_info = query.filter(User.user_email == user_email).first()

        if not user_info:
            db.close()
            return {"message": "User Not Found"}

        db.delete(user_info)
        db.commit()
        db.close()

        data = {"message": "User Removed Successfully"}

        logger.info("user_delist_service is ended")
        return data
    except Exception as e:
        logger.exception(e)
