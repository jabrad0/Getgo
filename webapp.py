from flask import Flask, render_template, request, jsonify #session, 
import pdb #python debugger
#pdb.set_trace()  #python debugger - pauses at this line.  type lat and it will show you, continue leave pause
import pprint
import json
import combine_galleries_wineries as yelp
import Parse_Oakland_Public_Art_json as public_art


app = Flask (__name__)
#app.secret_key = 'test'
#pdb.set_trace
@app.route('/', methods=["GET"])
def home_page():
    #session["key"] = "value"
    #print session.get("key")
    address = request.args.get("address")
    # if not address:   
    #     address = "1807 Telegraph Avenue"
        #pdb.set_trace()
    print "THIS IS THE ADDRESS: ", address
    #pdb.set_trace()
    return render_template("index.html", address=address)

@app.route('/get_nearby_businesses', methods=["GET"])
def get_nearby_points():
    #pdb.set_trace()
    latitude = float(request.args.get("lat"))
    longitude = float(request.args.get("lng"))
    
    yelp_call_results = yelp.yelp_api_calls(latitude, longitude)
    yelp_call_results_json = json.dumps(yelp_call_results)
    #print type(yelp_call_results_json) #--> string 
    return yelp_call_results_json
    #return render_template("test.html", lat = latitude, lng = longitude) #orange = html

@app.route('/get_public_art', methods=["GET"])
def get_public_art():
    return public_art.public_art_data() #this is json file

@app.route('/js/mapping.js')
def mapping_js():
    return app.send_static_file('js/mapping.js')
    #send_static_file is flask function used internally to send static file from static folder to browser


if __name__ == "__main__":
    app.run(debug=True)
