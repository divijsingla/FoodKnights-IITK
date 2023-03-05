from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from betterscrape import rest_list

app = Flask(__name__,static_url_path='/static')
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db=SQLAlchemy(app)

for rest in rest_list:
    print(rest.id, rest.name,rest.cloudinary)

@app.route('/')
def home():
    return render_template('index.html',restlist=rest_list)
    # return "Hi"

@app.route('/products')
def func():
    return "Hello guyz"

if __name__=='__main__':
    app.run(debug=True, port=8000)

