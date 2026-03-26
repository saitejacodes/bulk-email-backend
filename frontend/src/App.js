import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Campaign from "./pages/Campaign";
import Status from "./pages/Status";

function App() {
  const [page, setPage] = useState("dashboard");
  return (
    <>
      <nav>
        <a href="#" className={page === "dashboard" ? "active" : ""} onClick={() => setPage("dashboard")}>Dashboard</a>
        <a href="#" className={page === "campaign" ? "active" : ""} onClick={() => setPage("campaign")}>Send Mail</a>
        <a href="#" className={page === "status" ? "active" : ""} onClick={() => setPage("status")}>Email History</a>
      </nav>
      <div className="container">
        {page === "dashboard" && <Dashboard />}
        {page === "campaign" && <Campaign />}
        {page === "status" && <Status />}
      </div>
    </>
  );
}

export default App;
