from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os
import subprocess

app = Flask(__name__)

uploads_dir = os.path.join(app.instance_path, 'uploads')

os.makedirs(uploads_dir, exist_ok=True)


@app.route("/")
def hello_world():
    return render_template('index.html')


@app.route("/detect", methods=['POST'])
def detect():
    if not request.method == "POST":
        return

    video = request.files['video']
    browser_safe_filename = secure_filename(video.filename)
    video.save(os.path.join(uploads_dir, browser_safe_filename))

    subprocess.run(['python3', 'detect.py', '--exist-ok', '--line-thickness=2', '--hide-labels',
                   '--source', os.path.join(uploads_dir, browser_safe_filename)])

    detected_filepath = f"runs/detect/exp/{browser_safe_filename}"
    converted_filepath = f"static/{browser_safe_filename}"
    subprocess.run(['ffmpeg', '-i', detected_filepath, converted_filepath])

    return converted_filepath
