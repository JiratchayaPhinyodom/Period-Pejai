import datetime
from .line_notify import send_notification


def update_notification():
    send_notification(f"message", 'token')
    pass
