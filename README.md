Getgo - Get your art on the go
=====

Hackbright Final Project - Fall 2014

<h3><strong>Summary</strong></h3>
Getgo materialized out of Juli’s passion for biking and maps and her wife's love of art and wine. Currently an arts and culture scene is exploding in Oakland (California), but there is no application that helps navigate it. Getgo is designed to help plan an art stroll through Oakland via bike. By entering a starting point, nearby wine and art destinations are provided.  By clicking on a destination, details about that location are shown and directions by bike may be rendered.  The day’s destinations and mileage are stored and presented at anytime during the stroll.</div><br>

<a href="#technology-stack"> Technology Stack </a

![Homepage screenshot](/static/css/screenshots/homepage.png)<br>
![Address Entered screenshot](/static/css/screenshots/address_entered.png)<br>
![Directions screenshot](/static/css/screenshots/directions.png)<br>
![Stroll screenshot](/static/css/screenshots/stroll.png)<br>

<div id="technology-stack"><h3><strong>Technology Stack</strong></h3>
Getgo is a flask application with Javascript, HTML, and CSS implementing the frontend.  
Currently the application uses the Google Maps Javascript API v3 and the Yelp API 2.0.<br>

<ul><li>Python</li>
<li>Flask</li>
<li>Jinja</li>
<li>Javascript</li>
<li>JSON</li>
<li>jQuery</li>
<li>HTML/CSS</li>
<li>Google Maps Javascript API v3</li>
<li>Yelp API 2.0</li></ul></div>



<h3><strong>Directions to Install Requirements</strong></h3>
  <ol><li>Clone the repository</li>
    <li>Install <a href="http://pip.readthedocs.org/en/latest/installing.html">pip</a> (the python package installer) - save pip anywhere you like, then run it from the terminal (you will likely need sudo before): <em>$sudo get-pip.py</em> </li>
    <li>Create a virtualenv: <em>$pip install virtual env</em></li>
    <li>Go to the directory where you cloned your repository and type: <em>$virtualenv env</em></li>
    <li>Then type: <em>$source env/bin/activate</em></li>
    <li>Now install packages that are required for this project: <em>$pip install -r requirements.txt</em></li></ol>

<h3><strong>Yelp API Key is Required to Run this Application</strong></h3>
You will need <a href="http://www.yelp.com/developers/documentation/v2/overview"> Yelp API Keys </a> (and a Yelp account).<br>

Create a separate file (Sublime or Xcode, etc.) in the project directory and save this file as: <em>/yelp_api_key.py</em><br> Type the following in this file and insert your API keys:<br>
<br>
consumer_key = “xxxxxxxxxxxxx"<br>
consumer_secret = "xxxxxxxxxxxxx"<br>
token = "xxxxxxxxxxxxx"<br>
token_secret = "xxxxxxxxxxxxx"<br>


<h3><strong>File Guide</strong></h3>
<ul><li>Getgo is run from the file webapp.py: <em>$python webapp.py.</em></li>
<li>The .json file is a static json data file from  <a href="http://data.openoakland.org/group/infrastructure?f[0]=field_tags%3A111">data.openoakland.com</a> which is parsed by the parse_oakland_public_art.py script.</li>
<li>The other three .py scripts are run within the application in order to conduct calls to the Yelp API and parse the Yelp API return data.</li></ul>

<h3><strong>Acknowledgments</strong></h3>
I want to thank all of the Hackbright staff for their support, guidance, and encouragement day after day.  As well, I am grateful to have been paired with three incredibly awesome mentors: Jeff Meadows, Jen-Mei Wu, and Lauren Budorick. Thank you so much! 
