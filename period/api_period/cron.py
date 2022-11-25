import requests
import datetime


def send_notification(message, token):  # เอาไว้ส่งข้อความพร้อมกับ token
    url = 'https://notify-api.line.me/api/notify'
    token = token
    headers = {'content-type': 'application/x-www-form-urlencoded', 'Authorization': f'Bearer {token}'}

    r = requests.post(url, headers=headers, data={'message': message})
    return r.json()['status']


uid_token = requests.get("http://localhost:8000/api/notification")
for i in uid_token:
    print(i)
    uid = i["uid"]
    token = i["token"]
    response = requests.get(f"http://localhost:8000/api/predict/?uid={uid}")
    current_date = datetime.now()
    next_three_day = datetime.datetime.strptime(response[0])
    if current_date + 3 == next_three_day:
        send_notification("message", token)
