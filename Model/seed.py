import model
import csv
import datetime 
u_data = open('/home/user/src/ratings/seed_data/u.data', 'r')
u_movie = open('/home/user/src/ratings/seed_data/u.item', 'r')
u_user = open('/home/user/src/ratings/seed_data/u.user', 'r')


def load_users(session):
    u_user_reader = csv.reader(u_user, delimiter = '|')
    for line in u_user_reader:
        # without the delimiter specified above, this would also work to split the line:
            #sl = line[0].split() 
        new_user = model.User()
        new_user.user_id = int(line[0])
        new_user.age = int(line[1])
        new_user.gender = str(line[2])
        new_user.occupation = str(line[3])
        new_user.zip_code = str(line[4])
        session.add(new_user)
    
    session.commit()


def removing_year_from_movie_titles(old_line):
    movie_name_no_date = old_line[:-7]
    return movie_name_no_date


def load_movies(session):
    u_movie_reader = csv.reader(u_movie, delimiter = '|')
    for line in u_movie_reader: 
        new_movie = model.Movie()
        new_movie.movie_id = int(line[0])
        
        old_line = str(line[1])
        new_movie.name = removing_year_from_movie_titles(old_line).decode("latin-1")

        if len(line[2]) == 11:
            date = datetime.datetime.strptime(line[2], '%d-%b-%Y')
            date = date.date()
            new_movie.released_at = date
            new_movie.imdb_url = str(line[4])        
            session.add(new_movie)
        else:
            continue

    session.commit()

    
def to_datetime_from_ratings_timestamp(timestamp):
    date_string = (datetime.datetime.fromtimestamp(int(timestamp))).strftime('%d-%b-%Y') # this line used to be: '%Y-%m-%d %H:%M:%S' if we wanted to include time info, we could re-include this info. 
    return datetime.datetime.strptime(date_string, '%d-%b-%Y')


def load_ratings(session):
    u_data_reader = csv.reader(u_data, delimiter = '\t')
    for line in u_data_reader:
        # without the delimiter specified above, this would also work to split the line:
            #sl = line[0].split() 
        timestamp = int(line[3])
        datetime = to_datetime_from_ratings_timestamp(timestamp)

        new_rating = model.Rating()
        new_rating.user_id = int(line[0])
        new_rating.movie_id = int(line[1])
        new_rating.rating = int(line[2])
        new_rating.timestamp = datetime
        session.add(new_rating)
    
    session.commit()


def main(session):
    load_users(session)
    #load_movies(session)
    load_ratings(session)
    

if __name__ == "__main__":
    s= model.connect()
    main(s)
