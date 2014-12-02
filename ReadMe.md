

<strong>Summary</strong>
<p>Getgo materialized out of Juli’s passion for biking and maps and her wife’s love of art and wine. Currently an arts and culture scene is exploding in Oakland, but there is no application that helps navigate it. Getgo is designed to help plan an art stroll through Oakland via bike. By entering a starting point, nearby wine and art destinations are provided, then by clicking on a destination a suggested bike route is presented – get and go.  The day’s destinations and mileage are stored and presented at the end of the stroll.</p>    

<strong>Technologies Used</strong>
<ul><li>Python</li>
<li>Flask</li>
<li>Jinja</li>
<li>JavaScript</li>
<li>JSON</li>
<li>jQuery</li>
<li>HTML/CSS</li>
<li>Google Maps API</li>
<li>Yelp API</li></ul>


<strong>Install Requirements</strong>
Start by cloning the repository.
You will need to create a virtualenv and pip (the python package installer)
(save pip anywhere you like, then run from terminal, you will likely need sudo before)
$sudo get-pip.py
then $pip install virtual env
go to directory from where you will run this application and tpye $virtualenv env
then $ source env/bin/activate
Install packages that are required for this project: $pip install -r requirements.txt

<strong>Yelp API Key is Required</strong>
You will need a Yelp account and your own Yelp API keys.
Go here:
http://www.yelp.com/developers/documentation/v2/overview

Then create separate file containing:
consumer_key = “xxxxxxxxxxxxx"
consumer_secret = "xxxxxxxxxxxxx"
token = "xxxxxxxxxxxxx"
token_secret = "xxxxxxxxxxxxxk"
Save file as: yelp_api_key.py


<strong>Files</strong>
Getgo is run via: $python webapp.py
The .json file is a static json data file which is parsed via the parse_oakland_public_art.py file
The other .py files are run within the application in order to conduct calls to the Yelp API and parse the Yelp API call data.


