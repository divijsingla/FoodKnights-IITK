import requests
import array

class Dish:
    def __init__(self,id,name,description,imageId,inStock,price,veg):
        self.id=id
        self.name=name
        self.description=description
        self.imageId=f'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/{imageId}'
        self.inStock=inStock
        self.veg=veg
        self.price=int(price)/100

class Restinfo:
    def __init__(self,name,rating,people,time):
        self.name=name
        self.rating=rating
        self.people=people
        self.time=time

def restaurant_info(id):
    my_restaurant=f'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.5123388&lng=80.2329&restaurantId={id}&submitAction=ENTER'
    r= requests.get(my_restaurant)
    data = r.json()
    data=data['data']['cards'][0]['card']['card']['info']
    name =data.get('name')
    rating = data.get('avgRating')
    people = data.get('totalRatingsString')
    time = int(data.get('sla').get('maxDeliveryTime'))+10
    return Restinfo(name,rating,people,time)
    
    
    
    


def restaurant_details(id):
    my_restaurant=f'https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.5123388&lng=80.2329&restaurantId={id}&submitAction=ENTER'
    print(my_restaurant)
    r= requests.get(my_restaurant)
    data = r.json()

    restaurant_array = data['data']['cards'][-1]['groupedCard']['cardGroupMap']['REGULAR'] ['cards']

    # print(restaurant_array[1]['card']['card']['title'])
    while(restaurant_array[1]['card']['card']['title']=="Top Picks"):
        restaurant_array=restaurant_array[1:]
    else: 
        restaurant_array=restaurant_array[0:]

    dish_list = []

    for category in restaurant_array:
        
        data = category['card']['card']
        category_title = data.get('title')
        print(category_title,data.get('@type'))
        dishes= data.get('itemCards')
        if dishes is not None and len(dishes) > 0:
            for dish in dishes:
                dishinfo = dish['card']['info']
                id = dishinfo.get('id')
                name = dishinfo.get('name')
                description = dishinfo.get('description')
                imageId = dishinfo.get('imageId')
                inStock = dishinfo.get('inStock')
                price = dishinfo.get('price')
                if(price==None): price=dishinfo.get('defaultPrice')
                dishaddons = dishinfo.get('addons')
                # write here
                veg=dishinfo.get('itemAttribute').get('vegClassifier')
                # ribbon=dishinfo['itemAttribute']['ribbon']
                dish_list.append(Dish(id,name,description,imageId,inStock,price,veg))
                print(id,name,description,imageId,inStock,price,veg)


    return dish_list


        




