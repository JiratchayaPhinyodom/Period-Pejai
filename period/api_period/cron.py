import requests
from datetime import datetime, timedelta


def send_notification(message, token):  # เอาไว้ส่งข้อความพร้อมกับ token
    url = 'https://notify-api.line.me/api/notify'
    token = token
    headers = {'content-type': 'application/x-www-form-urlencoded', 'Authorization': f'Bearer {token}'}

    r = requests.post(url, headers=headers, data={'message': message})
    return r.json()['status']


uid_token = requests.get("http://localhost:8000/api/notification").json()
for i in uid_token:
    uid = i["uid"]
    token = i["token"]
    response = requests.get(f"http://localhost:8000/api/predict?uid={uid}")
    print(response)
    current_date = datetime.now()
    date_time_str = response[0]
    date_time_obj = datetime.strptime(date_time_str, '%y-%m-%d')
    if current_date + timedelta(days=3) == date_time_obj:
        send_notification("message", token)
