import requests

url = 'https://notify-api.line.me/api/notify'
token = "IYsi0yC9Et4EqFHBzv9evCyN1azoebOgKkyU4UygHwj"
headers = {'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + token}

msg = 'Hello LINE Notify'
r = requests.post(url, headers=headers, data={'message': msg})
print(r.text)
