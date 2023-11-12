import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import KEY, init_redis_db, redis_client

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/get_data")
def get_data():
    value: str = redis_client.get(KEY)
    if value is None:
        return init_redis_db()
    return {"key": KEY, "value": json.loads(value)}


@app.post("/set_data")
def set_data(body: list[dict]):
    redis_client.set(KEY, json.dumps(body))
    return {"message": "Data added successfully"}
