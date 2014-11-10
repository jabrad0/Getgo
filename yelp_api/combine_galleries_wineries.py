import yelp_api_galleries
import yelp_api_wineries
#Entire data set as python list from API call ---> 20 businesses at a time
#My api_call only has multiple dictionaries in a list,

api_call_galleries = yelp_api_galleries.main()
api_call_wineries = yelp_api_wineries.main()

all_wineries = api_call_wineries[0].get("businesses")

my_business_dictionary = {}
#Made serval api calls and appended list with results of each, thus
# api_call_galleries is a list of dictionaries which I need to itterate over
# to combine into 1 dictionary
for i in range(6):
    all_business = api_call_galleries[i].get("businesses")
    #print type(all_business) ---> all_business = <type "list">
#Itterate over api_calls and create dictionary {business name : [attributes]}
#business = a dictionary of one businesse's attributes

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
        if (business.get("location").get("coordinate")) == None:
            continue
        else:
            latitude = (business.get("location").get("coordinate").get("latitude"))
            longitude = (business.get("location").get("coordinate").get("longitude"))
        categories = business.get("categories")

        my_business_dictionary[name] = {
        "address" : address,
        "city": city,
        "state": state,
        "zip_code": zip_code,
        "neighborhoods": neighborhoods,
        "cross_streets": cross_streets,
        "phone": phone,
        "url": url,
        "latitude": latitude,
        "longitude": longitude,
        "categories": categories 
        }

for winery in all_wineries:
    name = winery.get("name")
    address = winery.get("location").get("address")
    city = winery.get("location").get("city")
    state = winery.get("location").get("state_code")
    zip_code = winery.get("location").get("postal_code")
    neighborhoods = winery.get("location").get("neighborhoods")
    cross_streets = winery.get("location").get("cross_streets")
    phone = winery.get("display_phone")
    url = winery.get("url")
    latitude = winery.get("location").get("coordinate").get("latitude")
    longitude = winery.get("location").get("coordinate").get("longitude")
    categories = winery.get("categories")

    my_business_dictionary[name] = {
    "address" : address,
    "city": city,
    "state": state,
    "zip_code": zip_code,
    "neighborhoods": neighborhoods,
    "cross_streets": cross_streets,
    "phone": phone,
    "url": url,
    "latitude": latitude,
    "longitude": longitude,
    "categories": categories 
    }

print len(my_business_dictionary) 
#print my_business_dictionary.keys() 
print my_business_dictionary     


""" 
NOTES:
keys with in each business dictionary 
[u'is_claimed', u'distance', u'mobile_url', u'rating_img_url', u'review_count', u'name', u'rating', u'url', u'categories', u'is_closed', u'phone', u'snippet_text', u'image_url', u'location', u'display_phone', u'rating_img_url_large', u'id', u'snippet_image_url', u'rating_img_url_small'] """
#business = data_list[0].get("businesses")[0].get("location")
#name_business = data_list[0].get("businesses")[0].get("name")

"""location dictionary 
{u'cross_streets': u'Jefferson St & Clay St', u'city': u'Oakland', u'display_address': [u'560 2nd St', u'Jack London Square', u'Oakland, CA 94607'], u'geo_accuracy': 9.5, u'neighborhoods': [u'Jack London Square'], u'postal_code': u'94607', u'country_code': u'US', u'address': [u'560 2nd St'], u'coordinate': {u'latitude': 37.7971005, u'longitude': -122.278887}, u'state_code': u'CA'}

latitude = data_list[0].get("businesses")[0].get("location").get("coordinate").get("latitude")
"""