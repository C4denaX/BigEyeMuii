#Declaraciones
from picamera import PiCamera
import time
import base64
import os
import keyboard
import requests, json
import RPi.GPIO as GPIO
#from pynput.keyboard import key, Controller
#import boto3
 
 
camera = PiCamera()
camera.resolution= (480,480)
camera.stop_preview()
camera.start_preview(fullscreen=False, window=(100,200,300,400))
 
cond = True
try:
    while(cond):
        timestr = time.strftime("%Y%m%d-%H%M%S")	
        path = '/home/pi/Pictures/image_'+timestr+'.jpg'
        camera.capture(path)
        time.sleep(1)
        with open(path,"rb") as img_file:
            b64_string = base64.b64encode(img_file.read()).decode('utf-8')
            print(b64_string)
 
            data_toSend = {'thumbnail': b64_string}
 
        response = requests.post('https://pfv6ftjiv2.execute-api.us-east-1.amazonaws.com/dev/access', data=json.dumps(data_toSend))
        print(response.reason)
        time.sleep(1)
except KeyboardInterrupt:
    camera.stop_preview()
    camera.close()
    cond = False
