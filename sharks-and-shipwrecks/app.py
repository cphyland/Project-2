from flask import Flask, render_template, redirect
import flask_functions
from sqlalchemy import create_engine
import pandas as pd




#################################################
# Database Setup
#################################################
#engine = create_engine("sqlite:///data/sharks.sqlite")
shark_api_url = "http://api.fish.wa.gov.au/webapi/v1/RawData"
shark_table_name = "sharks"
shark_csv_path = "static/data/sharks/sharks_cleaned.csv"
sqlite_path = "static/data/sharks/sharks-and-ships.sqlite"

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def index():
  # return render_template("index.html")
  return "pizza"

@app.route("/update")
def update_data():
    # access, clean, and save the data to a sqlite database
    sharks_df = flask_functions.shark_data(shark_api_url, "2020-01-01", "2021-07-01")
    flask_functions.load_database(sharks_df, shark_table_name, sqlite_path)

    # save the data to a csv file for the leaflet app
    sharks_df.to_csv(shark_csv_path)

    # send user to the main page on task completion
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)