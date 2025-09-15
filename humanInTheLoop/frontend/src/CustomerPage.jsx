import { useState } from "react";
import "./CustomerPage.css"; // import CSS file

function CustomerPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const askAI = () => {
    if (!question.trim()) return;
    fetch("http://localhost:5000/api/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })
      .then(res => res.json())
      .then(data => setResponse(data.response));
  };

  return (
    <div className="customer-container">
      <div className="card">
        <h2 className="title">💬 Customer Simulation</h2>
        <div className="input-group">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something..."
            className="input-box"
          />
          <button onClick={askAI} className="ask-btn">Ask</button>
        </div>
        {response && (
          <div className="response-box">
            <b>AI:</b> {response}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerPage;
