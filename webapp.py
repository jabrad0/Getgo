from flask import Flask, render_template, request 
import pdb #python debugger

app = Flask (__name__)

def helper_function():
    pass

@app.route('/', methods=["GET"])
def home_page():
    address = request.args.get("address")
    if not address:   
        address = "1807 Telegraph Avenue"
        #pdb.set_trace()
    print "THIS IS THE ADDRESS! WOOHOO!", address
    return render_template("index.html", address=address)

@app.route('/get_nearby_businesses', methods=["GET", "POST"])
def get_nearby_points():
    
    lat = request.args.get("lat")
    lng = request.args.get("lng")
    # pdb.set_trace()
    #pdb.set_trace()  #python debugger - pauses at this line.  type lat and it will show you, continue leave pause
    # print lat, lng

    return render_template("test.html", lat=lat, lng=lng)

# TODO: Ask instructors how to send static files
@app.route('/js/mapping.js')
def mapping_js():
    return app.send_static_file('js/mapping.js')










@app.route('/helloworld', methods=["GET", "POST"])
def say_hi():
    return "Hello World"

@app.route("/page2", methods=["GET"])
def go_to_page2():
    return render_template("page2.html") #will go look in templates for this file







if __name__ == "__main__":
    app.run(debug=True)
