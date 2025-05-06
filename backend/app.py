import os
import uuid
import time
import threading
from flask import Flask, request, jsonify
from flask_cors import CORS
from constant import service
import json
import random
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50 MB
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

jobs = {}
required_documents = service

# Simulate processing
def mock_process(job_id, service):
    steps = required_documents.get(service, [])
    total = len(steps)

    error_chance = 0.2  # 20% chance of error per document

    for i, doc in enumerate(steps, start=1):
        time.sleep(3)  # simulate processing time
        print("checking",doc)

        if random.random() < error_chance:
            jobs[job_id]['status'] = 'error'
            jobs[job_id]['current_doc'] = doc
            jobs[job_id]['message'] = f"Failed to process {doc}. File may be corrupted or missing."
            return

        percent = int((i / total) * 100)
        jobs[job_id]['status'] = 'processing'
        jobs[job_id]['current_doc'] = doc
        jobs[job_id]['percent'] = percent

    time.sleep(1)
    jobs[job_id]['status'] = 'complete'
    jobs[job_id]['current_doc'] = 'all done'
    jobs[job_id]['percent'] = 100

@app.route("/test", methods=["GET"])
def test():
    return jsonify({"msg": "the server is reachable"})

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files.get('file')
    service = request.form.get('service')

    if not file or not service:
        return jsonify({'error': 'Missing file or service'}), 400

    job_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_FOLDER, f"{job_id}.pdf")
    # file.save(file_path)

    jobs[job_id] = {
        'status': 'processing',
        'service': service,
        'percent': 0,
        'current_doc': '',
        'message': ''
    }

    thread = threading.Thread(target=mock_process, args=(job_id, service))
    thread.start()

    return jsonify({'job_id': job_id})

@app.route('/status', methods=['GET'])
def check_status():
    job_id = request.args.get('job_id')

    if not job_id or job_id not in jobs:
        return jsonify({'error': 'Invalid job ID'}), 404

    return jsonify(jobs[job_id])

if __name__ == '__main__':
    app.run(debug=True)
