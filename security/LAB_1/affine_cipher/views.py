from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.shortcuts import render
import json
import os,sys

parentdir = os.path.dirname(__file__)
sys.path.insert(0,parentdir)
from cipher import encrypt, decrypt

# Create your views here.
def affine_cipher(request):
    return render(request, 'affine_cipher/affine_cipher.html', {})

@csrf_exempt 
def encryption_button(request):
    if request.method == "POST":
        data = json.loads(request.body)
        encryptedData = encrypt(data['text'], int(data['key1']), int(data['key2']))
        responseJson = json.dumps({
           'text': encryptedData
        }, ensure_ascii=False)
        return HttpResponse(responseJson, content_type='application/json')

@csrf_exempt 
def decryption_button(request):
    if request.method == "POST":
        data = json.loads(request.body)
        decryptedData = decrypt(data['text'], int(data['key1']), int(data['key2']))
        responseJson = json.dumps({
           'text': decryptedData
        }, ensure_ascii=False)
        return HttpResponse(responseJson, content_type='application/json')