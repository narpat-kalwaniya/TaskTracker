from sqlalchemy import Column, String, Integer, Date, Text, DateTime
from utility.db_connection import Base


# User Model
class User(Base):
    __tablename__ = "users"

    user_email = Column(String, primary_key=True, unique=True, index=True)
    user_name = Column(String, nullable=False)
    role = Column(String, nullable=False, default="Read Only")


# Project Model
class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    project_name = Column(String, nullable=False)
    description = Column(Text)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    project_owner_email = Column(String, nullable=False)
    project_owner = Column(String, nullable=False)


# Task Model
class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    task_title = Column(String, nullable=False)
    task_description = Column(Text, nullable=True)
    project_id = Column(Integer, nullable=False)
    assignee_email = Column(String, nullable=True)
    due_date = Column(Date, nullable=True)
    status = Column(String, nullable=False)
    task_owner = Column(String, nullable=False)
    task_owner_email = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
