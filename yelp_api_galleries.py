import rauth
import pprint
import json
import yelp_api_key as keys;

#See the official Yelp API for more details: http://www.yelp.com/developers/documentation

NUM_REQUESTS = 10
#CENTER_OF_OAKLAND = (37.80, -122.27)

# This pprint part is from https://docs.python.org/2/library/pprint.html
# While in interactive python mode python -i yelp_api.py 
# typed in:
# import pprint
# pp = pprint.PrettyPrinter(indent=2)



#This is from http://letstalkdata.com/2014/02/how-to-use-the-yelp-api-in-python/
# I added offset as function parameter so I can iterate offset to get more than 20 businesses

def get_search_parameters(latitude, longitude, offset):
    params = {}
    params["term"] = "art galleries"
    params["ll"] = "{},{}".format(str(latitude),str(longitude)) # or---> params["location"] = "Oakland"
    params["radius_filter"] = "1300"  # search radius in meters
    params["limit"] = str(NUM_REQUESTS)
    params["offset"] = offset
    #print offset
    return params


def get_results(params):
    consumer_key = keys.consumer_key
    consumer_secret = keys.consumer_secret
    token = keys.token
    token_secret = keys.token_secret

    session = rauth.OAuth1Session(
        consumer_key = consumer_key,
        consumer_secret = consumer_secret,
        access_token = token,
        access_token_secret = token_secret,
    )
     
    request = session.get("http://api.yelp.com/v2/search", params=params)

    #Transforms the JSON API response into a Python dictionary
    data = request.json()
    session.close()
    return data

def main(latitude, longitude):
    locations = [(latitude, longitude),]
    api_calls_galleries = []
    offset = 0
    for offset in range(0, 60, NUM_REQUESTS):    #for i in range(6):
        for latitude,longitude in locations:
            params = get_search_parameters(latitude, longitude, offset)
            offset += NUM_REQUESTS
            #print type(get_results(params))
            api_calls_galleries.append(get_results(params))
            #print api_calls_galleries[-1]['businesses']#[1]['name']
           
    #print api_calls_galleries#[1]['businesses'][0]['name']
    return api_calls_galleries
    

#main(37.8, -122.3)

#import pprint
#pp = pprint.PrettyPrinter(indent=2)
#pp.pprint(x[0]) --> if use must set main() = x


