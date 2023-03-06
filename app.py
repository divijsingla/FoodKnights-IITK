from flask import Flask, render_template, request,jsonify,session
from flask_sqlalchemy import SQLAlchemy
from betterscrape import rest_list
from restaurantscrape import restaurant_details


app = Flask(__name__,static_url_path='/static')
app.secret_key = 'your-secret-key'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db=SQLAlchemy(app)

class CartItem(db.Model):
    item_name = db.Column(db.String(100), primary_key=True)
    item_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<CartItem {self.item_id}>'
    
def create_database():
    with app.app_context():
        db.create_all()

@app.route('/')
def home():
    return render_template('index.html',restlist=rest_list)


@app.route('/restaurant/<int:restaurant_id>')
def restaurant_page(restaurant_id):
    # Generate product page for the given product ID
    return render_template('restaurant.html', dish_list=restaurant_details(restaurant_id))


@app.route('/add-to-cart', methods=['POST'])
def add_to_cart():
    
    id= request.json['id']
    name= request.json['name']
    price= request.json['price']
    userid= 1
    
    cart_item = CartItem(item_name = name, item_id=id, quantity=1, user_id=userid)
    create_database()
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({'result': 'success'})



if __name__=='__main__':
    app.run(debug=True, port=8000)

