import React, { useState } from "react";

function SelectionScreen({ teams, setNumQualifiers, numQualifiers, setQualified, setPhase }) {
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState(numQualifiers || "");

  const toggleTeam = (team) => {
    if (selected.includes(team)) {
      setSelected(selected.filter(t => t !== team));
    } else if (selected.length < inputValue) {
      setSelected([...selected, team]);
    }
  };

  const confirmSelection = () => {
    if (selected.length === inputValue) {
      setNumQualifiers(inputValue);
      setQualified(selected);
      setPhase("knockout");
    } else {
      alert(`Please select exactly ${inputValue} teams`);
    }
  };

  return (
    <div>
      <h2>Enter Number of Qualifiers</h2>
      <input 
        type="number" 
        value={inputValue} 
        onChange={(e) => setInputValue(+e.target.value)} 
      />

      <div style={{ display: "flex", gap: "40px" }}>
        <div>
          <h3>All Teams</h3>
          <ul>
            {teams.map(team => (
              <li key={team}>
                <button 
                  onClick={() => toggleTeam(team)}
                  style={{ background: selected.includes(team) ? "lightgreen" : "white" }}
                >
                  {team}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Selected Teams</h3>
          <ul>
            {selected.map(team => <li key={team}>{team}</li>)}
          </ul>
        </div>
      </div>
      <button onClick={confirmSelection}>Confirm Selection</button>
    </div>
  );
}

export default SelectionScreen;
