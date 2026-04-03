"""WSGI config for chess_auth project."""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chess_auth.settings')
application = get_wsgi_application()
