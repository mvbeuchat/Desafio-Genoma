from sqlalchemy import Column, Integer, String, Boolean
from database import Base


class Places(Base):
    __tablename__ = "places"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    address = Column(String)
    foodType = Column(String)
    rating = Column(Integer)
    visited = Column(Boolean)