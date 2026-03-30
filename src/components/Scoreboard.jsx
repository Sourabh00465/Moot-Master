import React from "react";

function Scoreboard({ scores, numQualifiers, finishPrelims }) {
  const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]);

  return (
    <div>
      <h2>Final Scoreboard</h2>
      <ul>
        {sorted.map(([team, points], idx) => (
          <li key={team} style={{ fontWeight: idx < numQualifiers ? "bold" : "normal" }}>
            {team}: {points} pts
          </li>
        ))}
      </ul>
      <button onClick={finishPrelims}>Confirm Top {numQualifiers}</button>
    </div>
  );
}

export default Scoreboard;
