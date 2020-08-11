import random
import time
import threading
#import datetime
from datetime import date, datetime, timedelta
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from statistics import mean
import asyncio
import datetime
import random
import websockets
import json


#now = datetime.now()


def query(path):
    return db.reference(path).get()

# Fetch the service account key JSON file contents
cred = credentials.Certificate('occupansee-firebase-adminsdk-cisvj-870d9162db.json')

# Initialize the app with a service account, granting admin privileges
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://occupansee.firebaseio.com'
})


def get_last_week():
    result = []
    for i in range(1, 8):
        result.append(datetime.datetime.strftime(datetime.datetime.now() - timedelta(i), '%A, %B %-d'))
    return result;


def mean_of_minute(data):
    return mean(data[k] for k in data)


def mean_of_hour(data):
    sum = 0
    size = 0
    for k in data:
        sum += mean_of_minute(data[k])
        size += 1
    return sum / size


def mean_of_day(data):
    sum = 0
    size = 0
    for k in data:
        sum += mean_of_hour(data[k])
        size += 1
    return sum / size


def get_last_week_data():
    result = []
    weekdays = get_last_week()
    #weekdays = ['July 30, 2020','July 29, 2020', 'July 28, 2020']
    for weekday in weekdays:

        result.append(weekday)
        # add data from the week
        day_data = query(weekday)
        if day_data is not None:
            average_of_day = str(round(mean_of_day(day_data), 2))
            print("Average of day" + str(average_of_day))
            result.append(average_of_day)
            for hour_data in day_data:
                average = str(round(mean_of_hour(day_data[hour_data]) , 2))
                result.append(average)

    return result

lastweekdata = get_last_week_data()

def get_to_send():
    toSend = []
    for weekday in lastweekdata:
        toSend.append(weekday)
        toSend.append(str(random.randint(40, 50)))

        for i in range(15):
            toSend.append(str(random.randint(30, 60)))
    return toSend

toSend = get_to_send()
#print(lastweekdata)
print(toSend)

# As an admin, the app has access to read and write all data, regradless of Security Rules

today = date.today()
ref = db.reference('July 28, 2020/22:00/22:17')
data = ref.get()

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


