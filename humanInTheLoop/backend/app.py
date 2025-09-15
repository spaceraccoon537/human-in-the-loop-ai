from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

app = Flask(__name__)
CORS(app)

# --- MongoDB Setup ---
client = MongoClient("mongodb+srv://AniruddhaRoy:Mongo123@cluster0.uawm0qb.mongodb.net/")
db = client["ai_receptionist"]
requests_collection = db["requests"]
knowledge_collection = db["knowledge"]

# --- API Endpoints ---

@app.route("/api/call", methods=["POST"])
def call_ai():
    data = request.get_json()
    question = data.get("question")
    customer_id = data.get("customer_id", "guest")

    # Check knowledge base first
    kb_entry = knowledge_collection.find_one({"question": question})
    if kb_entry:
        return jsonify({"response": kb_entry["answer"], "source": "knowledge"})

    # Otherwise, create a help request
    new_request = {
        "question": question,
        "customer_id": customer_id,
        "status": "PENDING",
        "answer": None,
        "timestamp": datetime.utcnow().isoformat()
    }
    inserted = requests_collection.insert_one(new_request)
    print(f"Supervisor needed: {question}")

    return jsonify({
        "response": "Let me check with my supervisor and get back to you.",
        "request_id": str(inserted.inserted_id),
        "source": "ai"
    })

@app.route("/api/requests", methods=["GET"])
def get_requests():
    requests_list = list(requests_collection.find())
    for r in requests_list:
        r["_id"] = str(r["_id"])
    return jsonify(requests_list)

@app.route("/api/requests/<req_id>/answer", methods=["POST"])
def answer_request(req_id):
    data = request.get_json()
    answer = data.get("answer")

    # Update request
    result = requests_collection.find_one_and_update(
        {"_id": ObjectId(req_id)},
        {"$set": {"status": "RESOLVED", "answer": answer}},
        return_document=True
    )

    if not result:
        return jsonify({"error": "Request not found"}), 404

    # Add to knowledge base
    knowledge_collection.update_one(
        {"question": result["question"]},
        {"$set": {"answer": answer}},
        upsert=True
    )

    print(f"AI to customer {result['customer_id']}: {answer}")
    return jsonify({"message": "Answer recorded and knowledge updated."})

@app.route("/api/knowledge", methods=["GET"])
def get_knowledge():
    knowledge_list = list(knowledge_collection.find({}, {"_id": 0}))
    return jsonify(knowledge_list)

if __name__ == "__main__":
    app.run(debug=True)
