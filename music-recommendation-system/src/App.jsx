import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [songName, setSongName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:5000/recommend?song=${encodeURIComponent(songName)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) =>
        console.error("Error fetching recommendations:", error)
      );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          style={{ margin: 30, fontSize: 30, padding: 20 }}
          type="search"
          name="song"
          id="song"
          placeholder="Enter a song name"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
        <br />
        <input
          style={{
            margin: 10,
            fontSize: 30,
            padding: 20,
            borderRadius: 20,
            backgroundColor: "crimson",
          }}
          type="submit"
          value="Recommend"
        />
      </form>
      <div>
        <h1>Recommended Songs:</h1>
        {data && data.recommendations ? (
          <ul>
            {data.recommendations.map((song, index) => (
              <li key={index}>
                {song.name} ({song.year})
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default App;
