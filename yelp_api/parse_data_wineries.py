import yelp_api_wineries

api_call_wineries = yelp_api_wineries.main()
all_wineries = api_call_wineries[0].get("businesses")

my_wineries_dictionary = {}

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

    my_wineries_dictionary[name] = {
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

print my_wineries_dictionary 

