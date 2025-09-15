import { useState } from "react";

function CustomerPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const askAI = () => {
    fetch("http://localhost:5000/api/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })
      .then(res => res.json())
      .then(data => setResponse(data.response));
  };

  return (
    <div>
      <h2>Customer Simulation</h2>
      <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask something..." />
      <button onClick={askAI}>Ask</button>
      {response && <p><b>AI:</b> {response}</p>}
    </div>
  );
}

export default CustomerPage;
