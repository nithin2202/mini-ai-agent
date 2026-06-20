import { useState } from "react";

function QueryForm({ onAsk }) {

  const [query, setQuery] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!query.trim()) return;

    onAsk(query);

    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Ask anything..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
      />

      <button type="submit">
        Ask
      </button>

    </form>
  );
}

export default QueryForm;