import requests


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
        print(data)
    else:
        print(f"Error: {response.status_code}")