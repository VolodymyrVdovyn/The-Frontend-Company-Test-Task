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


data = [
    {
        "id": "todo",
        "cards": [
            {"id": "item 1", "date": "2023-07-31T21:00:00.000Z"},
            {"id": "back 222", "date": "2023-08-15T21:00:00.000Z"},
        ],
    },
    {
        "id": "doing",
        "cards": [],
    },
    {
        "id": "done",
        "cards": [],
    },
]


@app.get("/columns")
async def root():
    return {"data": data}
