from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

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
