import requests
import matplotlib.pyplot as plt


def GetData(target):
    APP_ID = "kZVJTYM8C7k89Nk5l9U6eAlKuagCVbJNiwFGScUH"
    REST_API_KEY = "V9nIQf5ZCZSYkzSmx6Cjq0gXDVcK0OVv4ZMywRsh"

    HEADERS = {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": REST_API_KEY
    }

    url = f"https://parseapi.back4app.com/classes/{target}"
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        data = response.json()
        #print(data)
    else:
        print(f"Error: {response.status_code}")
        return -1
    
    return data

keywords = ["Sleep", "Food", "mood", "symptom", "activity"]

for target in keywords:
    if target not in ["Sleep", "Food"]:
        data = GetData("GeneralLog")
    else:
        data = GetData(target)
    if target == "Sleep":
        sleepTimes = []
        for val in data['results']:
            segments = val['totalSleep'].split()
            sleepTimes.append(float(segments[0]) + float(segments[2])/60)
        print(sleepTimes)
    if target == "Food":
        foods = []
        for val in data['results']:
            #print(val)
            categories = ['breakfast', 'lunch', 'dinner', 'snacks']
            for i in categories:
                if val.get(i, -1) != -1 and val.get(i, -1) != '':
                   foods.append(val[i]) 
            
        print(foods)
    if target == "mood":
        moods = []
        for val in data['results']:
            #print(val)
            if val['category'] == 'mood':
                moods.append(float(val['value']))
        print(moods)
    if target == "symptom":
        symptoms = []
        for val in data['results']:
            #print(val)
            if val['category'] == 'symptom':
                symptoms.append(val['value'])
        print(symptoms)
    if target == "activity":
        activitys = []
        for val in data['results']:
            #print(val)
            if val['category'] == 'activity':
                activitys.append(val['value'])
        print(activitys)
    
    #send info to AI and write to some Graph database in back4app