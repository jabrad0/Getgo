from flask import Flask, render_template, request
import os
import pdb 
import pprint
import json
import combine_galleries_wineries as yelp
import parse_oakland_public_art as public_art


app = Flask (__name__)

@app.route('/', methods=["GET"])
def home_page():
    address = request.args.get("address")
    print "THIS IS THE ADDRESS: ", address
    return render_template("index.html", address=address)

@app.route('/get_nearby_businesses', methods=["GET"])
def get_nearby_points():
    latitude = float(request.args.get("lat"))
    longitude = float(request.args.get("lng"))

    yelp_call_results = yelp.yelp_api_calls(latitude, longitude)
    yelp_call_results_json = json.dumps(yelp_call_results)
    return yelp_call_results_json

@app.route('/get_public_art', methods=["GET"])
def get_public_art():
    return public_art.public_art_data() 

if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 5000))
    DEBUG = "NO_DEBUG" not in os.environ
    app.run(debug=DEBUG, port=PORT, host="0.0.0.0")
