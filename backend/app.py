import os
import uuid
import time
import threading
from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
from constant import service
from queue import Queue
import json
import time
import random
from functools import wraps
from dotenv import load_dotenv
load_dotenv()




app = Flask(__name__)
CORS(app)

# Folder to store uploaded files
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Mock job storage
jobs = {}

# Required document checklist
required_documents = service


# Simulate processing
def mock_process(job_id, service):
    steps = required_documents.get(service, [])
    total = len(steps)
    q = jobs[job_id]['queue']
    
    error_chance = 0.2  # 20% chance of error per document

    for i, doc in enumerate(steps, start=1):
        time.sleep(2)  # simulate processing time

        # Randomly decide to throw an error
        if random.random() < error_chance:
            q.put({
                'type': 'error',
                'doc': doc,
                'message': f"Failed to process {doc}. File may be corrupted or missing."
            })
            continue

        percent = int((i / total) * 100)
        q.put({
            'type': 'update',
            'doc': doc,
            'percent': percent
        })

    time.sleep(2)

    q.put({'type': 'done'})


# def require_auth(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = request.headers.get("Authorization")
#         if not token or not token.startswith("Bearer "):
#             return jsonify({"error": "Unauthorized"}), 401
#         CLERK_PUBLIC_KEY = os.getenv("CLERK_PUBLIC_KEY").replace("\\n", "\n")
#         try:
#             payload = jwt.decode(
#                 token,
#                 key=CLERK_PUBLIC_KEY,
#                 algorithms=["RS256"],
#                 options={"verify_aud": False}  # Turn off audience check unless you need it
#             )
#             return payload  # Valid token, return user info
#         except InvalidTokenError as e:
#             raise Exception(f"Invalid token: {str(e)}")
        
#     return decorated



@app.route("/test",methods=["GET"])
def test():
    print("server is reachable")
    return jsonify({"msg":"the server is reachable"})

@app.route('/upload', methods=['POST'])
def upload():
    print("server is here")
    file = request.files.get('file')
    service = request.form.get('service')

    if not file or not service:
        return jsonify({'error': 'Missing file or service'}), 400

    job_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_FOLDER, f"{job_id}.pdf")
    # file.save(file_path)

    job_queue = Queue()
    jobs[job_id] = {
        'status': 'processing',
        'service': service,
        'queue': job_queue
    }

    thread = threading.Thread(target=mock_process, args=(job_id, service))
    thread.start()

    return jsonify({'job_id': job_id})

@app.route('/status', methods=['GET'])
def check_status():
    job_id = request.args.get('job_id')
    print(job_id)
    if not job_id or job_id not in jobs:
        return jsonify({'error': 'Invalid job ID'}), 404
    
    job = jobs[job_id]
    q = job['queue']

    def event_stream():
        while True:
            msg = q.get()
            if msg['type'] == 'update':
                yield f"data: {json.dumps({'status': 'processing', 'doc': msg['doc'], 'percent': msg['percent']})}\n\n"
            elif msg['type'] == 'error':
                yield f"data: {json.dumps({'status':'error','doc':msg['doc'],'message':msg['message']})}\n\n"
                break
            elif msg['type'] == 'done':
                yield f"data: {json.dumps({'status': 'complete','doc':'all done','percent':100})}\n\n"
                break

    return Response(stream_with_context(event_stream()), content_type='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)
