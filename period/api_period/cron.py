from .line_notify import *
from .serializers import *

# Notification.objects.filter(uid=)

send_notification('Your period will likely start in the next 3 days.', 'uid')
