import rauth
import pprint
import json
import yelp_api_key as keys

# This pprint part is from https://docs.python.org/2/library/pprint.html
# While in interactive python mode python -i yelp_api.py 
# typed in:
#>>> import pprint
#>>> pp = pprint.PrettyPrinter(indent=2)
#>>> pp.pprint(x[0]) 

pp = pprint.PrettyPrinter(indent=2)

#This is from http://letstalkdata.com/2014/02/how-to-use-the-yelp-api-in-python/

def get_search_parameters(lat,long):
    #See the Yelp API for more details
    params = {}
    params["term"] = "art galleries"
    params["ll"] = "{},{}".format(str(lat),str(long))
    params["radius_filter"] = "2000"
    params["limit"] = "20"
    #params["rating"] = "5.0"
    return params


def get_results(params):
    consumer_key = keys.consumer_key
    consumer_secret = keys.consumer_secret
    token = keys.token
    token_secret = keys.token_secret


    session = rauth.OAuth1Session(
    consumer_key = consumer_key
    ,consumer_secret = consumer_secret
    ,access_token = token
    ,access_token_secret = token_secret)
     
    request = session.get("http://api.yelp.com/v2/search",params=params)

    #Transforms the JSON API response into a Python dictionary
    data = request.json()
    session.close()

    return data

def main():
    locations = [(37.80,-122.27),]
    api_calls = []
    for lat,long in locations:
        params = get_search_parameters(lat,long)
        api_calls.append(get_results(params))
        #Be a good internet citizen and rate-limit yourself
    return api_calls
    #print api_calls
    #time.sleep(1.0)


main()


