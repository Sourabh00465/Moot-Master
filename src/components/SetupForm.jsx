import React, { useState, useRef } from "react";
import generatePrelims from "../utils/generatePrelims";

function SetupForm({ setTeams, setRounds, setPhase }) {
  const [teamCount, setTeamCount] = useState("");
  const fileInputRef = useRef(null);

  const startTournament = () => {
    const teams = [];
    for (let i = 1; i <= teamCount; i++) {
      teams.push(`T${i}`);
    }
    setTeams(teams);

    // Generate prelim rounds immediately
    const [round1, round2] = generatePrelims(teams);
    setRounds([round1, round2]);

    setPhase("prelims");
  };

  const importTournament = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      setTeams(data.initialTeams || []);
      setRounds([data.round1 || [], data.round2 || []]);
      setPhase("prelims");
    };
    reader.readAsText(file);
  };

  return (
    <div className="setup-page">
      <h1>MootMaster</h1>
      <div className="setup-controls">
        <h2>Setup Tournament</h2>
        <input
          type="number"
          placeholder="Enter number of teams"
          value={teamCount}
          onChange={(e) => setTeamCount(+e.target.value)}
        />
        <button onClick={startTournament}>Start Tournament</button>

        <h3>Or Import Saved Tournament</h3>
        <input
          type="file"
          accept="application/json"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => importTournament(e.target.files[0])}
        />
        <button onClick={() => fileInputRef.current.click()}>
          Import Tournament
        </button>
      </div>
    </div>
  );
}

export default SetupForm;
