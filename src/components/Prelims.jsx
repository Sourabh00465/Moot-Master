import React, { useState } from "react";

function Prelims({ rounds = [[], []], teams = [], setQualified, setPhase }) {
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showRound2, setShowRound2] = useState(false);

  const toggleTeam = (team) => {
    if (selected.includes(team)) {
      setSelected(selected.filter(t => t !== team));
    } else if (selected.length < inputValue) {
      setSelected([...selected, team]);
    }
  };

  const confirmSelection = () => {
    if (selected.length === inputValue) {
      setQualified(selected);
      setPhase("knockout");
    } else {
      alert(`Please select exactly ${inputValue} teams`);
    }
  };

  // Export prelims JSON (after Round 2 only)
  const exportPrelims = () => {
    const data = {
      initialTeams: teams,
      round1: rounds[0],
      round2: rounds[1],
      selectedTeams: selected,
      qualifiersCount: inputValue
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prelims.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="prelims-page">
      <h2>Prelims</h2>

      <div className="rounds-side">
        <div className="round-column">
          <h3>Round 1</h3>
          {rounds[0]?.map((match, idx) => (
            <div key={idx} className="match-card">
              <p><strong>Petitioner:</strong> {match.petitioner}</p>
              <p><strong>Respondent:</strong> {match.respondent}</p>
            </div>
          ))}
          {!showRound2 && rounds[0]?.length > 0 && (
            <button onClick={() => setShowRound2(true)}>Reveal Round 2</button>
          )}
        </div>

        {showRound2 && (
          <div className="round-column">
            <h3>Round 2</h3>
            {rounds[1]?.map((match, idx) => (
              <div key={idx} className="match-card">
                <p><strong>Petitioner:</strong> {match.petitioner}</p>
                <p><strong>Respondent:</strong> {match.respondent}</p>
              </div>
            ))}
            {/* Export after Round 2 */}
            <button onClick={exportPrelims}>Export Prelims Data</button>
          </div>
        )}

        <div className="round-column">
          <h3>Selected Teams</h3>
          <ul>
            {selected.map(team => <li key={team}>{team}</li>)}
          </ul>
        </div>
      </div>

      <div className="prelims-right">
        <h2>Enter Number of Qualifiers</h2>
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(+e.target.value)} 
        />

        <div className="selection-container">
          <h3>All Teams</h3>
          <ul>
            {teams.map(team => (
              <li key={team}>
                <button 
                  onClick={() => toggleTeam(team)}
                  className={selected.includes(team) ? "selected" : ""}
                >
                  {team}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={confirmSelection}>Confirm Selection</button>
      </div>
    </div>
  );
}

export default Prelims;
