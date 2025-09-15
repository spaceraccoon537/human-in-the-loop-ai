import requests

FLASK_API = "http://localhost:5000/api"

def livekit_agent(question, customer_id="cust123"):
    # Step 1: Check knowledge base
    kb_resp = requests.get(f"{FLASK_API}/knowledge").json()
    kb = {item["question"]: item["answer"] for item in kb_resp}

    if question in kb:
        answer = kb[question]
        print(f"AI (from KB): {answer}")
        return answer
    else:
        # Step 2: Create help request
        resp = requests.post(f"{FLASK_API}/call", json={
            "question": question,
            "customer_id": customer_id
        }).json()

        print("AI: Let me check with my supervisor and get back to you.")
        return resp["response"]

if __name__ == "__main__":
    print("=== Simulated AI Receptionist ===")
    while True:
        q = input("Customer: ")
        if q.lower() in ["exit", "quit"]:
            break
        livekit_agent(q)
