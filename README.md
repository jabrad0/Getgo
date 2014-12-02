Getgo - Get your art on the go
=====

Hackbright Final Project - Fall 2014

<h3><strong>Summary</strong></h3>
Getgo materialized out of Juli’s passion for biking and maps and her wife’s love of art and wine. Currently an arts and culture scene is exploding in Oakland, but there is no application that helps navigate it. Getgo is designed to help plan an art stroll through Oakland via bike. By entering a starting point, nearby wine and art destinations are provided, then by clicking on a destination a suggested bike route is presented.  The day’s destinations and mileage are stored and presented at anytime during the stroll.</div><br>

![Homepage screenshot](/static/css/screenshots/homepage.png)

<div><h3><strong>Technologies Used</strong></h3>
<ul><li>Python</li>
<li>Flask</li>
<li>Jinja</li>
<li>JavaScript</li>
<li>JSON</li>
<li>jQuery</li>
<li>HTML/CSS</li>
<li>Google Maps API</li>
  <li>Yelp API</li></ul></div>



<h3><strong>Install Requirements</strong></h3>
  <ol><li>Clone the repository</li>
    <li>Install <a href="http://pip.readthedocs.org/en/latest/installing.html">pip</a> (the python package installer) - save pip anywhere you like, then run it from the terminal (you will likely need sudo before): <em>$sudo get-pip.py</em> </li>
    <li>Create a virtualenv: <em>$pip install virtual env</em></li>
    <li>Go to the directory from where you will run this application and type: <em>$virtualenv env</em></li>
    <li>Then type: <em>$source env/bin/activate</em></li>
    <li>Now install packages that are required for this project: <em>$pip install -r requirements.txt</em></li></ol>

<h3><strong>Yelp API Key is Required</strong></h3>
You will need <a href="http://www.yelp.com/developers/documentation/v2/overview"> Yelp API Keys</a> (and a Yelp account),


Now create a separate file (in Sublime or Xcode, etc.) containing:<br>
consumer_key = “xxxxxxxxxxxxx"<br>
consumer_secret = "xxxxxxxxxxxxx"<br>
token = "xxxxxxxxxxxxx"<br>
token_secret = "xxxxxxxxxxxxxk"<br>

Save this file as: yelp_api_key.py<br>


<h3><strong>Description of Files</strong></h3>
Getgo is run via the file webapp.py: <em>$python webapp.py</em><br>
The .json file is a static json data file which is parsed via the parse_oakland_public_art.py file.<br>
The other .py files are run within the application in order to conduct calls to the Yelp API and parse the Yelp API call data.

