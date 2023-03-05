import requests
import array

class Dish:
    def __init__(self,id,name,description,imageId,inStock,price,veg):
        self.id=id
        self.name=name
        self.description=description
        self.imageId=imageId
        self.inStock=inStock
        self.veg=veg
        self.price=int(price)/100



def restaurant_details(id):
    my_restaurant=f'https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.5123388&lng=80.2329&restaurantId={id}&submitAction=ENTER'
    print(my_restaurant)
    r= requests.get(my_restaurant)
    data = r.json()

    restaurant_array = data['data']['cards'][-1]['groupedCard']['cardGroupMap']['REGULAR'] ['cards']

    while(restaurant_array[1]['card']['card']['title']!="Recommended"):
        restaurant_array==restaurant_array[2:]
    else: 
        restaurant_array=restaurant_array[1:]

    dish_list = []

    for category in restaurant_array:
        data = category['card']['card']
        category_title = data.get('title')
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
                dishaddons = dishinfo.get('addons')
                # write here
                veg=dishinfo['itemAttribute']['vegClassifier']
                # ribbon=dishinfo['itemAttribute']['ribbon']
                dish_list.append(Dish(id,name,description,imageId,inStock,price,veg))
                print(id,name,description,imageId,inStock,price,veg)


    return dish_list


        



