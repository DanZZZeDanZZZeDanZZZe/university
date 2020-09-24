from django.urls import path
from . import views

urlpatterns = [
    path('', views.affine_cipher, name='affine_cipher'),
    path('encryption_button', views.encryption_button, name='encryption_button'),
    path('decryption_button', views.decryption_button, name='decryption_button'),
]