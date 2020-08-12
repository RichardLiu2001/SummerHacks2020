import random
import time
import threading
#import datetime
from datetime import date, datetime, timedelta
#import firebase_admin
#from firebase_admin import credentials
#from firebase_admin import db
#from statistics import mean
import asyncio
import datetime
import random
import websockets
import json


#now = datetime.now()





toSend = ['Sunday, August 9', '44', '60', '33', '36', '59', '57', '43', '60', '56', '51', '56', '53', '47', '38', '34', '60', 'Saturday, August 8', '49', '32', '40', '49', '31', '60', '40', '55', '54', '46', '58', '31', '46', '44', '43', '48', 'Friday, August 7', '50', '47', '53', '56', '35', '41', '56', '52', '60', '34', '33', '52', '40', '45', '56', '30', 'Thursday, August 6', '49', '60', '55', '34', '41', '46', '35', '30', '43', '60', '30', '59', '47', '50', '50', '51', 'Wednesday, August 5', '43', '45', '55', '42', '53', '32', '43', '51', '55', '42', '34', '31', '36', '46', '58', '30', 'Tuesday, August 4', '42', '55', '51', '37', '37', '30', '59', '41', '46', '54', '48', '32', '34', '37', '57', '55', 'Monday, August 3', '49', '48', '40', '54', '56', '31', '49', '36', '51', '60', '32', '37', '40', '56', '44', '41']
#print(lastweekdata)
print(toSend)

# As an admin, the app has access to read and write all data, regradless of Security Rules

today = date.today()

#minute = db.reference('July 28, 2020/23:00/23:05')
#minute_data = minute.get()

#hour = db.reference('July 28, 2020/23:00')
#hour_data = hour.get()

#print('mean of 23:05: ' + str(mean_of_minute(minute_data)))
#print('mean of 23:00: ' + str(mean_of_hour(hour_data)))


#print(get_last_week())


async def time(websocket, path):
    while True:
        #now = datetime.datetime.utcnow().isoformat() + "Z"
        #random_num = str(random.randint(0, 100))
        jsonmessage = json.dumps(toSend)
        await websocket.send(jsonmessage)
        #await websocket.send("ASDfaflkjasdfha")
        await asyncio.sleep(1)

start_server = websockets.serve(time, "127.0.0.1", 8080)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

#print(type(data))
#print(data)

#["Saturday, August 7", '10', ...., '|', 'Friday, August 6'..]
#0 : [list for yesterday]


#this.state.click = 0


