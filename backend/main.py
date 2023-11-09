from fastapi import FastAPI

app = FastAPI()


data = {
    "todo": {
        "id": "todo",
        "list": ["item 1", "item 2", "item 3"],
    },
    "doing": {
        "id": "doing",
        "list": [],
    },
    "done": {
        "id": "done",
        "list": [],
    },
}


@app.get("/api")
async def root():
    return {"message": data}
