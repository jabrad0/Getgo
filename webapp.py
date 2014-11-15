from flask import Flask, render_template, request 
import pdb #python debugger

app = Flask (__name__)

def helper_function():
    pass

@app.route('/', methods=["GET", "POST"])
def home_page():
    if request.method == 'POST':
        address = request.form['address']
        print "THIS IS THE ADDRESS! WOOHOO!", address
        return render_template(("index.html"), address=address)

    else:
        address = "1807 Telegraph Avenue"
        return render_template("index.html", address=address)

@app.route('/get_nearby_businesses', methods=["GET", "POST"])
def get_nearby_points():
    data = request.form
    lat = data.get('lat')
    lng = data.get('lng')
    #pdb.set_trace()  #python debugger - pauses at this line.  type lat and it will show you, continue leave pause
    print lat, lng

    return render_template("test.html")












@app.route('/helloworld', methods=["GET", "POST"])
def say_hi():
    return "Hello World"

@app.route("/page2", methods=["GET"])
def go_to_page2():
    return render_template("page2.html") #will go look in templates for this file







if __name__ == "__main__":
    app.run(debug=True)
