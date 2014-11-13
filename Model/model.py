from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String

Base = declarative_base() #Base class is defined

'''this is a fairly non-standard use of python class attributes. It's allowed by the language definition, but ultimately, these lines we just added are SQLAlchemy specific and only make sense in that context. It's good to remember them, but it's equally good to remember how to look them up.'''

class Artpiece(Base):
    __tablename__ = "artpieces" #Simply informs SQLAlchemy that instances of this class will be stored in a table named "collections".

    id = Column(Integer, primary_key = True) #'String' is not a built-in python class (that one is 'str'),  These are the SQLAlchemy-managed versions of the same datatypes
    art_name = Column(String(100), nullable=True) # nullable true = optional
    artist_name = Column(String(100), nullable=True)
    artist_location = Column(String(64), nullable=True)
    year_install = Column(DateTime, nullable=True)
    permanent = Column(Boolean, nullable=True)
    exterior = Column(Boolean, nullable=True)
    media_type = Column(String(100), nullable=True)
    media_detail = Column(String(100), nullable=True)
    address = Column(String(100), nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    
class Media_Type(Base):
    __tablename__ = "media_types" 

    id = Column(Integer, primary_key = True) 
    media_type = Column(String(100), nullable=True)


class Business(Base):
    __tablename__ = "bussinesses"

    id = Column(Integer, primary_key = True)
    # we don't need the line below! in this table, there will only be one movie--remake db???
    business_name = Column(String (64), nullable=True)
    address = Column
    city = Column
    state = Column
    zip_code = Column
    neighborhoods = Column
    cross_streeets = Column
    phone = Column
    url = Column
    latitude = Column
    longitude = Column
    categories = Column(String(100), nullable=True)

class Mediatype(Base):
    __tablename__ = "mediatypes" 

    id = Column(Integer, primary_key = True) 
    categories = Column(String(100), nullable=True)


class Bikeparking_Location(Base):
    __tablename__ = "bikeparking_locations"




    def main():
        pass

    if __name__ == "__main__":
        main()
    