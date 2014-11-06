#import io
#import json

import yelp_api
#Entire data set as python list from API call ---> 20 businesses at a time
#My api_call only has one item [0], representing one lat,long location = Oakland

api_call = yelp_api.main()
#business = a dictionary of one businesse's attributes
all_business = api_call[0].get("businesses")

#Itterate over api_call and create dictionary {business name : [attributes]}

my_business_dictionary = {}

for business in all_business:
    name = business.get("name")
    address = business.get("location").get("address")
    city = business.get("location").get("city")
    state = business.get("location").get("state_code")
    zip_code = business.get("location").get("postal_code")
    neighborhoods = business.get("location").get("neighborhoods")
    cross_streets = business.get("location").get("cross_streets")
    phone = business.get("display_phone")
    url = business.get("url")
    latitude = business.get("location").get("coordinate").get("latitude")
    longitude = business.get("location").get("coordinate").get("longitude")
    categories = business.get("categories")

    my_business_dictionary[name] = [address, city, state, zip_code, neighborhoods, cross_streets, phone, url, latitude, longitude, categories]

print my_business_dictionary 
    
""" 
keys with in each business dictionary 
[u'is_claimed', u'distance', u'mobile_url', u'rating_img_url', u'review_count', u'name', u'rating', u'url', u'categories', u'is_closed', u'phone', u'snippet_text', u'image_url', u'location', u'display_phone', u'rating_img_url_large', u'id', u'snippet_image_url', u'rating_img_url_small'] """

#business = data_list[0].get("businesses")[0].get("location")
#name_business = data_list[0].get("businesses")[0].get("name")

"""location dictionary 
{u'cross_streets': u'Jefferson St & Clay St', u'city': u'Oakland', u'display_address': [u'560 2nd St', u'Jack London Square', u'Oakland, CA 94607'], u'geo_accuracy': 9.5, u'neighborhoods': [u'Jack London Square'], u'postal_code': u'94607', u'country_code': u'US', u'address': [u'560 2nd St'], u'coordinate': {u'latitude': 37.7971005, u'longitude': -122.278887}, u'state_code': u'CA'}


latitude = data_list[0].get("businesses")[0].get("location").get("coordinate").get("latitude")
"""