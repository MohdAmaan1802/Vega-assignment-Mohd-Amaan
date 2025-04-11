import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => onSearch(query)}>Search</button>
    </div>
  );
}
