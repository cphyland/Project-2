from flask import Flask, jsonify
import numpy as np
import flask_functions
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, session
from sqlalchemy import create_engine, inspect
from sqlalchemy import func

shark_url = "http://api.fish.wa.gov.au/webapi/v1.RawData"


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/sharks.sqlite")


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
    cleandata = flask_functions.shark_data(shark_url, "1/1/2020", "7/1/2021")
    flask_functions.load_database(cleandata, "cleanSharkTable", "data/projectdatabase")
    


if __name__ == "__main__":
    app.run(debug=True)