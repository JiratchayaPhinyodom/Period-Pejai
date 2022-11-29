import requests


def get_access_token(code, uid):
    api_url = "https://notify-bot.line.me/oauth/token"
    content_type = "application/x-www-form-urlencoded"

    grant_type = "authorization_code"
    code = code
    uid = uid
    redirect_uri = 'https://period-pejai-deploy.vercel.app/'
    client_id = '3i37SxxITCH1t4ngUNAPuz'
    client_secret = 'OL8v9BglCOlCvn1AVEpw2xwbsUuRU4iYRjES6jrL7GQ'
    headers = {'Content-Type': content_type}
    data = {
        "grant_type": grant_type,
        "code": code,
        "uid": uid,
        "redirect_uri": redirect_uri,
        "client_id": client_id,
        "client_secret": client_secret
    }
    r = requests.post(api_url, headers=headers, data=data)
    return r.json()['access_token']
