from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from uuid import UUID
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session


app = FastAPI()

models.Base.metadata.create_all(bind=engine)

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class Place(BaseModel):
    name: str = Field(min_length = 1)
    address: str = Field(min_length = 1)
    foodType: str = Field(min_length = 1)
    rating: int = Field(gt=-1, lt=6)
    visited: bool

@app.get("/", tags=["root"])
async def read_api(db: Session = Depends(get_db)):
    # return "hola"
    return db.query(models.Places).all()


@app.post("/newPlace")
def newPlace(place: Place, db: Session = Depends(get_db)):
    place_model = models.Places()
    place_model.name = place.name
    place_model.address = place.address
    place_model.foodType = place.foodType
    place_model.rating = int(place.rating)
    place_model.visited = place.visited
    db.add(place_model)
    db.commit()
    return place

@app.put("/updatePlace/{placeID}")
def updatePlace(placeID: int, newPlaceData: Place, db: Session = Depends(get_db)):
    place_model = db.query(models.Places).filter(models.Places.id == placeID).first()
    if place_model is None:
        raise HTTPException(
            status_code=404,
            detail = "Place does not exist"
        )
    place_model.name = newPlaceData.name
    place_model.address = newPlaceData.address
    place_model.foodType = newPlaceData.foodType
    place_model.rating = int(newPlaceData.rating)
    place_model.visited = newPlaceData.visited
    db.add(place_model)
    db.commit()
    return newPlaceData


@app.delete("/deletePlace/{placeID}")
def deletePlace(placeID: int, db: Session = Depends(get_db)):
    place_model = db.query(models.Places).filter(models.Places.id == placeID).first()
    if place_model is None:
        raise HTTPException(
            status_code=404,
            detail = "Place does not exist"
        )
    db.query(models.Places).filter(models.Places.id == placeID).delete()
    db.commit()

    return "Succesfully deleted"

@app.get("/5StarPlaces")
async def read_api(db: Session = Depends(get_db)):
    return db.query(models.Places).filter(models.Places.rating == 5).all()