# main.py
from fastapi import FastAPI
import redis

app = FastAPI()

# redis_client = redis.Redis(host="localhost", port=6379, db=0)
redis_client = redis.Redis(host="redis-server", port=6379, db=0)

# FastAPI endpoint to store data in Redis
@app.post("/add_data/{key}/{value}")
def add_data(key: str, value: str):
    redis_client.set(key, value)
    return {"message": "Data added successfully"}


# FastAPI endpoint to retrieve data from Redis
@app.get("/get_data/{key}")
def get_data(key: str):
    value = redis_client.get(key)
    if value is None:
        return {"message": "Key not found"}
    return {"key": key, "value": value.decode("utf-8")}
