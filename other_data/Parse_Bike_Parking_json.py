#My Script except where noted#
import json
#################################
#found these lines and function via google to help covert unicode to string, also had "NoneType"
import sys
reload(sys)
sys.setdefaultencoding("utf-8")

#see comment above
def xstr(s):
    if s is None:
        return ''
    return str(s)
########################

json_data=open('Bike_Parking_raw.json')
data_python = json.load(json_data)
data =  data_python.get("features")  #---> data = a list
#print type(data)

#longitude = data_python.get("features")[0].get('geometry').get('coordinates')[0]
#latitude = data_python.get("features")[0].get('geometry').get('coordinates')[1]
#location_name = data_python.get('features')[0].get('properties').get('Name')

bike_parking_dictionary = {}

for item in data:
    location_name = xstr(item.get('properties').get('Name'))
    latitude = item.get('geometry').get('coordinates')[1]
    longitude = item.get('geometry').get('coordinates')[0]
    address = " "

    #print type(location_name)
    #print type(latitude)
    #print type(longitude)

    bike_parking_dictionary[location_name] = {
        "latitude" : latitude,
        "longitude" : longitude,
    } 

print bike_parking_dictionary#.get("").get("")
json_data.close()