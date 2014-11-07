class Collection(Base):
    __tablename__ = "collections"

    id = Column(Integer, primary_key = True)
    project = Column(String, nullable=True)
    artist_name = Column(String, nullable=True)
    artist_location = Column(String(15), nullable=True)
    year_install
    permanent
    exterior
    media_type
    media_detail
    neighborhoods
    address
    latitude
    longitude
    
   
class Gallery(Base):
    __tablename__ = "galleries"

    id = Column(Integer, primary_key = True)
    # we don't need the line below! in this table, there will only be one movie--remake db???
    name = Column(String (64), nullable=True)
    address
    city
    state
    zip_code
    neighborhoods
    cross_streeets
    phone
    url
    latitude
    longitude
    categories = Column(DateTime, nullable=True)
    