import yelp_api_galleries
import yelp_api_wineries

def yelp_api_calls(latitude, longitude):

    api_call_galleries = yelp_api_galleries.main(latitude, longitude)
    api_call_wineries = yelp_api_wineries.main(latitude, longitude)

    all_wineries = api_call_wineries[0].get("businesses")

    my_business_dictionary = {}

    for gallery in api_call_galleries:
        all_business = gallery.get("businesses")

        for business in all_business:
            name = business.get("name")
            _loc = business.get("location")
            address = _loc.get("address")
            city = _loc.get("city")
            state = _loc.get("state_code")
            zip_code = _loc.get("postal_code")
            neighborhoods = _loc.get("neighborhoods")
            cross_streets = _loc.get("cross_streets")
            phone = business.get("display_phone")
            url = business.get("url")
            if (_loc.get("coordinate")) == None:
                continue
            else:
                latitude =  (_loc.get("coordinate").get("latitude"))
                longitude = (_loc.get("coordinate").get("longitude"))
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
                "categories": categories,
            }

    for winery in all_wineries:
        name = winery.get("name")
        _loc = winery.get("location")
        address = _loc.get("address")
        city = _loc.get("city")
        state = _loc.get("state_code")
        zip_code = _loc.get("postal_code")
        neighborhoods = _loc.get("neighborhoods")
        cross_streets = _loc.get("cross_streets")
        phone = winery.get("display_phone")
        url = winery.get("url")
        latitude = _loc.get("coordinate").get("latitude")
        longitude = _loc.get("coordinate").get("longitude")
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

    return my_business_dictionary
    
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