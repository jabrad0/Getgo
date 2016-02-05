Getgo - Get your art on the go
=====
Developer's Note: Address entered must be an actual address (try 201 Orange Street).
This will be fixed in the next version 2.0.

Hackbright Final Project - Fall 2014

<h3><strong>Summary</strong></h3>
Getgo materialized out of Juli’s passion for biking and maps and love of art and wine. Currently an arts and culture scene has been exploding in Oakland (California), but there is no application that helps navigate it. Getgo is designed to help plan an art stroll through Oakland via bike. By entering a starting point, nearby wine and art destinations are provided.  By clicking on a destination, details about that location are shown and directions by bike may be rendered.  The day’s destinations and mileage are stored and presented at anytime during the stroll.</div><br>

<h3><strong>Table of Contents</strong></h3>
<ul><li><a href="#screenshots"> Screenshots </a></li>
<li><a href="#technology-stack"> Technology Stack</a></li>
<li><a href="#directions-requirements"> Directions to Install Requirements</a></li>
<li><a href="#yelp-key"> Yelp API Keys</a></li>
<li><a href="#file-guide"> File Guide</a></li>
<li><a href="#acknowledgments"> Acknowledgments</a></li></ul>


<h3 id="screenshots"><strong>Screenshots</strong></h3>
![Homepage screenshot](/static/css/screenshots/homepage.png)<br>
<br>
Art and wine near the current location with details about one location showing.
![Address Entered screenshot](/static/css/screenshots/address_entered.png)<br>
<br>
Suggested bike routes.
![Directions screenshot](/static/css/screenshots/directions.png)<br>
<br>
A log of destinations and milage.
![Stroll screenshot](/static/css/screenshots/stroll.png)<br>

<h3 id="technology-stack"><strong>Technology Stack</strong></h3>
<ul><li>Python</li>
<li>Flask</li>
<li>Jinja</li>
<li>Javascript</li>
<li>JSON</li>
<li>jQuery</li>
<li>HTML/CSS</li>
<li>Google Maps Javascript API v3</li>
<li>Google Maps Geocoder API v3</li>
<li>Yelp API 2.0</li></ul>

<h3 id="directions-requirements"><strong>Directions to Install Requirements</strong></h3>
  <ol><li>Clone the repository.</li>
    <li>Install <a href="http://pip.readthedocs.org/en/latest/installing.html">pip</a> (the python package installer) - save pip anywhere you like, then run it from the terminal (you will likely need sudo before): <code>$sudo get-pip.py</code> </li>
    <li>Create a virtualenv: <code>$pip install virtual env</code></li>
    <li>Go to the directory where you cloned your repository and type: <code>$virtualenv env</code></li>
    <li>Then type: <code>$source env/bin/activate</code></li>
    <li>Now install packages that are required for this project: <code>$pip install -r requirements.txt</code></li></ol>

<h3 id="yelp-key"><strong>Yelp API Keys</strong></h3>
You will need <a href="http://www.yelp.com/developers/documentation/v2/overview"> Yelp API Keys </a> (and a Yelp account) to run this application.<br>

Create a separate file (Sublime or Xcode, etc.) in the project directory and save this file as: <em>/yelp_api_key.py</em><br> Type the following in this file and insert your API keys:<br>
<br>
consumer_key = “xxxxxxxxxxxxx"<br>
consumer_secret = "xxxxxxxxxxxxx"<br>
token = "xxxxxxxxxxxxx"<br>
token_secret = "xxxxxxxxxxxxx"<br>


<h3 id="file-guide"><strong>File Guide</strong></h3>
<ul><li>Getgo is run from the file webapp.py: <code>$python webapp.py.</code></li>
<li>The .json file is a static json data file from  <a href="http://data.openoakland.org/group/infrastructure?f[0]=field_tags%3A111">data.openoakland.com</a> which is parsed by the parse_oakland_public_art.py script.</li>
<li>The other three .py scripts are run within the application in order to conduct calls to the Yelp API and parse the Yelp API return data.</li></ul>

<h3 id="acknowledgments"><strong>Acknowledgments</strong></h3>
I want to thank all of the Hackbright staff for their support, guidance, and encouragement day after day.  As well, I am grateful to have been paired with three incredibly awesome mentors: Jeff Meadows, Jen-Mei Wu, and Lauren Budorick. Thank you so much!
