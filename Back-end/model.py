import numpy as np
import argparse
import time
import cv2
import base64
import os
import helper
from flask import Flask, jsonify, request
from bounding_box import bounding_box as bb

def img_detect(params):
    arguments = {
        "image": "file_upload.jpg",
        "label": "yolo-coco/{}".format(params["names"]),
        "weight": "yolo-coco/{}".format(params["weight"]),
        "config": "yolo-coco/{}".format(params["config"]),
        "threshold": params["threshold"],
        "confidence": params["confidence"]
    }

    LABELS = open(arguments["label"]).read().strip().split("\n")
    COLORS = helper.get_rand_colors(len(LABELS))

    weightsPath = arguments["weight"]
    configPath = arguments["config"]

    ########################### reference ###########################
    print("[INFO] loading YOLO from disk...")
    net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)
    image = cv2.imread(arguments["image"])
	
    (H, W) = image.shape[:2]
    ln = net.getLayerNames()
    ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]

    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416), swapRB=True, crop=False)

    net.setInput(blob)

    layerOutputs = net.forward(ln)

    boxes = []
    confidences = []
    classIDs = []

	# loop over each of the layer outputs
    for output in layerOutputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]

            if confidence > arguments["confidence"]:
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")

                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))

                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                classIDs.append(classID)
                
    idxs = cv2.dnn.NMSBoxes(boxes, confidences, arguments["confidence"], arguments["threshold"])

    ########################### reference ###########################
    obj = []
    if len(idxs) > 0:
        for i in idxs.flatten():
            (x, y) = (boxes[i][0], boxes[i][1])
            (w, h) = (boxes[i][2], boxes[i][3])

            text = "{}".format(LABELS[classIDs[i]])
            color = COLORS[classIDs[i]]
            bb.add(image, x, y, x+w, y+h, text, color)
            bb.add(image, x, y, x+w, y+h, text)

            if classIDs[i] not in obj:
                obj.append(classIDs[i])

	# show the output image
    retval, buffer = cv2.imencode('.png', image)
    jpg_as_text = base64.b64encode(buffer)
    restext = jpg_as_text.decode(encoding='UTF-8')

    response = {
        "res": restext,
        "obj": obj
    }

    return response