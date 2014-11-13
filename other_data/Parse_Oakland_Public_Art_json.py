#My Script except where noted#
import json
from pprint import pprint
#################################
#found this via google to help covert unicode string dict to a python dict
import ast
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

json_data=open('Oakland_Public_Art_raw.json')
data_python = json.load(json_data)
data =  data_python.get("data")

#i = 0
#for art in data:
#    print i
 #   print data[i][8]
  #  i += 1
#data = a list

city_art_dictionary = {}

for item in data:
    project_title = xstr(item[8])
    #below: the download file had 'NoneType' so did this to convert it to typ(int)
    year_install = int(0 if item[11] is None else item[11])
    permanent = xstr(item[12])
    exterior = xstr(item[13])
    media_type = xstr(item[14])
    media_detail = xstr(item[15])
    address_uni = item[16][0]
    address = ast.literal_eval(address_uni).get("address")
    city = ast.literal_eval(address_uni).get("city")
    state_code = ast.literal_eval(address_uni).get("state")
    zip_code = ast.literal_eval(address_uni).get("zip")
    latitude = float(item[16][1])
    longitude = float(item[16][2])
    #print project_title

    city_art_dictionary[project_title] = {
        "year_install" : year_install,
        "permanent" : permanent,
        "exterior" : exterior,
        "media_type" : media_type,
        "media_detail" : media_detail,
        "address" : address,
        "city" : city,
        "state_code" : state_code,
        "zip_code" : zip_code,
        "latitude" : latitude,
        "longitude" : longitude,
    } 
    
print city_art_dictionary.get("Spring of Wisdom").get("media_type")#.get("Words by Road").get("address")
json_data.close()
