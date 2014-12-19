import os
import rauth
import pprint
import json
#import yelp_api_key as keys

#See the official Yelp API for more details: 
#http://www.yelp.com/developers/documentation

def get_search_parameters(latitude, longitude):
    params = {}
    params["term"] = "wineries"
    params["ll"] = "{},{}".format(str(latitude),str(longitude))
    params["radius_filter"] = "1500"
    params["limit"] = "20"
    return params

def get_results(params):
    # consumer_key = keys.consumer_key
    # consumer_secret = keys.consumer_secret
    # token = keys.token
    # token_secret = keys.token_secret

    session = rauth.OAuth1Session(
        consumer_key = os.environ.get('HK_CONSUMER_KEY'),
        consumer_secret = os.environ.get('HK_CONSUMER_SECRET'),
        access_token = os.environ.get('HK_TOKEN'),
        access_token_secret = os.environ.get('HK_TOKEN_SECRET'),
        # consumer_key = consumer_key, 
        # consumer_secret = consumer_secret,
        # access_token = token,
        # access_token_secret = token_secret,
    )
    request = session.get("http://api.yelp.com/v2/search", params=params)
    data = request.json()
    session.close()
    return data

def main(latitude, longitude):
    locations = [(latitude, longitude),]
    api_calls_wineries = []
    for latitude, longitude in locations:
        params = get_search_parameters(latitude, longitude)
        api_calls_wineries.append(get_results(params))
    return api_calls_wineries



