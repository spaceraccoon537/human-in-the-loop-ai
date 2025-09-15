import { useState } from "react";
import RequestsPage from "./RequestsPage";
import KnowledgePage from "./KnowledgePage";
import CustomerPage from "./CustomerPage";

function App() {
  const [page, setPage] = useState("requests");

  return (
    <div className="p-4">
      <button onClick={() => setPage("requests")}>Requests</button>
      <button onClick={() => setPage("knowledge")}>Knowledge</button>
      <button onClick={() => setPage("customer")}>Simulate Customer</button>

      {page === "requests" && <RequestsPage />}
      {page === "knowledge" && <KnowledgePage />}
      {page === "customer" && <CustomerPage />}
    </div>
  );
}

export default App;
