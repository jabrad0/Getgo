from flask import Flask, render_template, request 

app = Flask (__name__)

def helper_function():
    pass

@app.route('/', methods=["GET", "POST"])
def home_page():
    if request.method == 'POST':
        address = request.form['address']
        print "THIS IS THE ADDRESS! WOOHOO!", address
        return render_template("index.html", address=address)

    else:
        address = "201 Orange Street"
        return render_template("index.html", address=address)

# @app.route("/wonderful")
# def go_to_wonderful():
#     return render_template("wonderful.html") #will go look in templates for this file

if __name__ == "__main__":
    app.run(debug=True)
