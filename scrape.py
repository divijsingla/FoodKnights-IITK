import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time
import array

options= Options()
options.add_experimental_option("detach", True)

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)
from bs4 import BeautifulSoup
url="https://swiggy.com"



driver.get(url)

login = driver.find_element(By.XPATH,'/html/body/div/div[1]/div[1]/div/div[1]/div[1]/div/div[1]/div/a[1]')
login.click()
phoneno = driver.find_element(By.XPATH,'/html/body/div[2]/div/div/div[2]/div/div/div/form/div[1]/div/input')
phoneno.send_keys('9416725199')
submit=driver.find_element(By.XPATH,'/html/body/div[2]/div/div/div[2]/div/div/div/form/div[2]/a')
submit.click();

time.sleep(5)
otp = driver.find_element(By.XPATH,'/html/body/div[2]/div/div/div[2]/div/div/div/div[2]/form/div[1]/div[2]/input')
otp.send_keys('291426')
sub = driver.find_element(By.XPATH,'/html/body/div[2]/div/div/div[2]/div/div/div/div[2]/form/div[2]/div[2]/a')
sub.click()
cookies = driver.get_cookies()
import json

with open('cookies.json', 'w') as f:
    json.dump(cookies, f)

time.sleep(100)

# button_findfood = driver.find_element(By.CLASS_NAME, 'Iou1H')
# button_findfood.click()
# input_findloc = driver.find_element(By.XPATH,'/html/body/div[3]/div/div/div[2]/div/div/div[2]/div[2]/div/input')

# input_findloc.send_keys("IIT Kanpur")
# time.sleep(4)

# input_findloc = driver.find_element(By.XPATH,'/html/body/div[3]/div/div/div[2]/div/div/div[3]/div/div/div[1]/div/div[2]/div[1]')
# input_findloc.click()
# time.sleep(10)
# # find the div element containing links using the By class and CSS selector
# link_div = driver.find_element(By.XPATH, "/html/body/div[1]/div[1]/div[1]/div/div[4]/div/div/div[2]/div[1]")

# # find all link elements within the div using the By class and CSS selector
# links = link_div.find_elements(By.CLASS_NAME, "_3XX_A")

# class restaurants:
#     def __init__(self, name, link, description, time, img):
#         self.name = name
#         self.link = link
#         self.description = description
#         self.time = time
#         self.img = img

# arr = []
# for link in links:
#     parent = link.find_element(By.CLASS_NAME,"_1j_Yo")
#     href = parent.get_attribute('href');
#     print(href ,'\n')
#     subp = parent.find_element(By.CLASS_NAME,'_1HEuF')
#     subp2=subp.find_element(By.CLASS_NAME,'_3FR5S')
#     imgparent = subp2.find_element(By.CLASS_NAME,'efp8s')
#     imglink = imgparent.find_element(By.TAG_NAME, 'img').get_attribute('src')
#     print(imglink ,'\n')
#     nameparent = subp2.find_element(By.CLASS_NAME,'_3Ztcd')
#     name = nameparent.find_element(By.CLASS_NAME,'nA6kb').text
#     print(name ,'\n')


    
#     arr.append(restaurants(name,href,"Hi",0,imglink)) 

# # for restaurant in arr:
#     # print("name:", restaurant.name,'\n')    
#     # print("imglink:", restaurant.img,'\n')    
#     # print("href:", restaurant.link,'\n')    

time.sleep(5)
# driver.quit();



