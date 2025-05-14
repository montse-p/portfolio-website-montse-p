import pymongo
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Connect to MongoDB
client = pymongo.MongoClient()
db = client.portfoliodb
portfolio_collection = db.portfolio

@app.route("/")
def index():
    return render_template("index.html") 

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/data")
def data():
    portfolio = list(portfolio_collection.find({}, {"_id": 0}))
    return jsonify(portfolio)

if __name__ == "__main__":
    app.run(debug=True)