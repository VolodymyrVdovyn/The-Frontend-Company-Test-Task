import json

import redis

KEY = "the-frontend-company-data"
INIT_VALUE = [{"id": "todo", "cards": []}, {"id": "doing", "cards": []}, {"id": "done", "cards": []}]

redis_client = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)
# redis_client = redis.Redis(host="redis-server", port=6379, db=0, decode_responses=True)


def init_redis_db():
    redis_client.set(KEY, json.dumps(INIT_VALUE))
    return {"key": KEY, "value": INIT_VALUE}
