# main.py
import logging
from fastapi import FastAPI
from utility.db_connection import Base, engine
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from apps.views import project_views, task_views, user_views

app = FastAPI()

logger = logging.getLogger(__name__)

# Initialize Database
Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow only specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = False


@app.post("/items/")
def create_item(item: Item):
    return {"message": "Item created", "item": item}


# Include Routers
app.include_router(project_views.router, prefix="/api", tags=["Projects"])
app.include_router(task_views.router, prefix="/api", tags=["Tasks"])
app.include_router(user_views.router, prefix="/api", tags=["Users"])
