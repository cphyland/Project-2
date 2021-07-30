from flask import Flask, jsonify
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, session
from sqlalchemy import create_engine, inspect
from sqlalchemy import func

shark_url = "http://api.fish.wa.gov.au/webapi/vi.RawData"


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data/sharks.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
#Base.classes.keys()
# Save reference to the table
Sharks = Base.classes.sharks
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
    shark_data(shark_url, "1/1/2020", "7/1/2021")
    
    )


@app.route("/")
    cleandata = shark_data(shark_url, "1/1/2020", "7/1/2021")
    load_database(cleandata, "cleanSharkTable", "data/projectdatabase")

    )

if __name__ == "__main__":
    app.run(debug=True)