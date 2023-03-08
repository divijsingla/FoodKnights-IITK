from flask import Flask, render_template, request,jsonify,session
from flask_sqlalchemy import SQLAlchemy
from betterscrape import rest_list
from restaurantscrape import restaurant_details,restaurant_info


app = Flask(__name__,static_url_path='/static')
app.secret_key = 'your-secret-key'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db=SQLAlchemy(app)
    
def create_database():
    with app.app_context():
        db.create_all()

@app.route('/')
def home():
    return render_template('index.html',restlist=rest_list)

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/restaurant/<int:restaurant_id>')
def restaurant_page(restaurant_id):
    # Generate product page for the given product ID
    return render_template('restaurant.html', dish_list=restaurant_details(restaurant_id),restinfo=restaurant_info(restaurant_id),restid=restaurant_id)






if __name__=='__main__':
    app.run(debug=True, port=8000)

