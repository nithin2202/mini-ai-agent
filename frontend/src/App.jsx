import { useState, useEffect } from "react";
import axios from "axios";
import QueryForm from "./components/QueryForm";
import ResponseCard from "./components/ResponseCard";
import StatsCard from "./components/StatsCard";
import "./App.css";

function App() {
  const [response, setResponse] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/rest2/api/stats"
      );

      setStats(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const askQuestion = async (query) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/rest2/api/query",
        { query }
      );

      setResponse(res.data.data);

      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

      <h1>
        Mini AI Support Agent
      </h1>

      <QueryForm onAsk={askQuestion} />

      {response && (
        <ResponseCard response={response} />
      )}

      {stats && (
        <StatsCard stats={stats} />
      )}

    </div>
  );
}

export default App;