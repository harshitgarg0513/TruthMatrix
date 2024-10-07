# predict.py
import sys
import os
import json

import cv2
import numpy as np
import tensorflow as tf
from mtcnn import MTCNN

# Load the pre-trained model
model = tf.keras.models.load_model('xception_deepfake_image_5o.h5')
sys.stdout.reconfigure(encoding='utf-8')
# Constants
IMAGE_SIZE = (224, 224)
MAX_SEQ_LENGTH = 20
NUM_FEATURES = 2048
FRAME_SAMPLE_RATE = 10

feature_extractor = tf.keras.applications.Xception(weights="imagenet", include_top=False, pooling="avg")
detector = MTCNN()

def extract_frames_from_video(video_path, sample_rate=FRAME_SAMPLE_RATE):
    frames = []
    vidcap = cv2.VideoCapture(video_path)
    success, image = vidcap.read()
    count = 0
    while success:
        if count % sample_rate == 0:
            frames.append(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        success, image = vidcap.read()
        count += 1
    vidcap.release()
    return frames

def detect_and_crop_faces(frame):
    if frame is None or frame.size == 0:  # Add this validation
        print("Invalid or empty frame")
        return []
    faces = []
    detections = detector.detect_faces(frame)
    for detection in detections:
        x, y, width, height = detection['box']
        # Ensure the bounding box is within the frame dimensions
        x, y = max(0, x), max(0, y)
        face = frame[y:y+height, x:x+width]
        face = cv2.resize(face, IMAGE_SIZE)
        faces.append(face)
    return faces

def preprocess_faces(faces):
    face_features = np.zeros((len(faces), *IMAGE_SIZE, 3))
    for i, face in enumerate(faces):
        face_features[i] = tf.keras.applications.xception.preprocess_input(face)
    return face_features

def predict_fake_real(video_path):
    frames = extract_frames_from_video(video_path)
    if not frames:
        return None

    all_faces = []
    for frame in frames:
        faces = detect_and_crop_faces(frame)
        all_faces.extend(faces)

    if not all_faces:
        return None

    all_faces = all_faces[:MAX_SEQ_LENGTH]
    preprocessed_faces = preprocess_faces(all_faces)

    predictions = model.predict(np.array(preprocessed_faces))
    avg_prediction = np.mean(predictions)

    return 'FAKE' if avg_prediction >= 0.5 else 'REAL'

if __name__ == '__main__':
    video_path = sys.argv[1]
    result = predict_fake_real(video_path)
    if result:
        print(result)
    else:
        print('No faces detected or unable to process video.')
os.remove(video_path)