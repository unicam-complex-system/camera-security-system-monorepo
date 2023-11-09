import gi
gi.require_version('Gst', '1.0')
from gi.repository import GObject, Gst
import numpy as np
import cv2

GObject.threads_init()
Gst.init(None)

def YUV_stream2RGB_frame(data):

    w=640
    h=368
    size=w*h

    stream=np.fromstring(data,np.uint8) #convert data form string to numpy array

    #Y bytes  will start form 0 and end in size-1 
    y=stream[0:size].reshape(h,w) # create the y channel same size as the image

    #U bytes will start from size and end at size+size/4 as its size = framesize/4 
    u=stream[size:(size+(size/4))].reshape((h/2),(w/2))# create the u channel its size=framesize/4

    #up-sample the u channel to be the same size as the y channel and frame using pyrUp func in opencv2
    u_upsize=cv2.pyrUp(u)

    #do the same for v channel 
    v=stream[(size+(size/4)):].reshape((h/2),(w/2))
    v_upsize=cv2.pyrUp(v)

    #create the 3-channel frame using cv2.merge func watch for the order
    yuv=cv2.merge((y,u_upsize,v_upsize))

    #Convert TO RGB format
    rgb=cv2.cvtColor(yuv,cv2.cv.CV_YCrCb2RGB)

    #show frame
    cv2.imshow("show",rgb)
    cv2.waitKey(5)

def on_new_buffer(appsink):

   sample = appsink.emit('pull-sample')
   #get the buffer
   buf=sample.get_buffer()
   #extract data stream as string
   data=buf.extract_dup(0,buf.get_size())
   YUV_stream2RGB_frame(data)
   return False

def Init():

   CLI="rtspsrc name=src location=rtsp://192.168.1.20:554/live/ch01_0 latency=10 !decodebin ! appsink name=sink"

   #simplest way to create a pipline
   pipline=Gst.parse_launch(CLI)

   #getting the sink by its name set in CLI
   appsink=pipline.get_by_name("sink")

   #setting some important properties of appsnik
   appsink.set_property("max-buffers",20) # prevent the app to consume huge part of memory
   appsink.set_property('emit-signals',True) #tell sink to emit signals
   appsink.set_property('sync',False) #no sync to make decoding as fast as possible

   appsink.connect('new-sample', on_new_buffer) #connect signal to callable func

def run():
    pipline.set_state(Gst.State.PLAYING)
    GObject.MainLoop.run()


Init()
run()