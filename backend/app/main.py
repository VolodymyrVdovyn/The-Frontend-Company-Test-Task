import json

import redis
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

KEY = "the-frontend-company-data"
redis_client = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)
# redis_client = redis.Redis(host="redis-server", port=6379, db=0, decode_responses=True)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


def init_redis_db():
    data = [{"id": "todo", "cards": []}, {"id": "doing", "cards": []}, {"id": "done", "cards": []}]
    redis_client.set(KEY, json.dumps(data))
    return {"key": KEY, "value": data}


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
