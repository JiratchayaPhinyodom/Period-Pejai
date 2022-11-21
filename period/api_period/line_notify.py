# import requests

# url = 'https://notify-api.line.me/api/notify'
# token = "IYsi0yC9Et4EqFHBzv9evCyN1azoebOgKkyU4UygHwj"
# headers = {'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + token}

# msg = 'Hello LINE Notify'
# r = requests.post(url, headers=headers, data={'message': msg})
# print(r.text)

import requests


def get_access_token(code):  # ได้ token ออกมา
    api_url = "https://notify-bot.line.me/oauth/token"
    content_type = "application/x-www-form-urlencoded"

    grant_type = "authorization_code"
    code = code
    redirect_uri = 'http://localhost:3000/'
    client_id = '3i37SxxITCH1t4ngUNAPuz'
    client_secret = 'OL8v9BglCOlCvn1AVEpw2xwbsUuRU4iYRjES6jrL7GQ'
    headers = {'Content-Type': content_type}
    data = {
        "grant_type": grant_type,
        "code": code,
        "redirect_uri": redirect_uri,
        "client_id": client_id,
        "client_secret": client_secret
    }
    r = requests.post(api_url, headers=headers, data=data)
    return r.json()['access_token']


def send_notification(message, token):  # เอาไว้ส่งข้อความพร้อมกับ token
    url = 'https://notify-api.line.me/api/notify'
    token = token
    headers = {'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token}

    r = requests.post(url, headers=headers, data={'message': message})
    return r.json()['status']
