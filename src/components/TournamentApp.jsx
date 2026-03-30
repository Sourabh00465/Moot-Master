import React, { useState, useEffect } from "react";
import SetupForm from "./SetupForm";
import Prelims from "./Prelims";
import Knockout from "./Knockout";

function TournamentApp() {
  const [phase, setPhase] = useState("setup");
  const [teams, setTeams] = useState([]);
  const [rounds, setRounds] = useState([[], []]);
  const [qualified, setQualified] = useState([]);
  const [quarterFinals, setQuarterFinals] = useState([]);
  const [semiFinals, setSemiFinals] = useState([]);
  const [finals, setFinals] = useState([]);
  const [winner, setWinner] = useState(null);
  const [state, setState] = useState({
    currentRound: 1,
    currentMatchIndex: 0,
    quarterFinalsMatchIndex: 0,
    semiFinalsMatchIndex: 0,
    finalsMatchIndex: 0
  });

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tournamentState");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPhase(parsed.phase || "setup");
      setTeams(parsed.initialTeams || []);
      setRounds([parsed.round1 || [], parsed.round2 || []]);
      setQualified(parsed.qualifiedTeams || []);
      setQuarterFinals(parsed.quarterFinals || []);
      setSemiFinals(parsed.semiFinals || []);
      setFinals(parsed.finals || []);
      setWinner(parsed.winner || null);
      setState(parsed.state || {});
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const data = {
      phase,
      initialTeams: teams,
      qualifiedTeams: qualified,
      round1: rounds[0],
      round2: rounds[1],
      quarterFinals,
      semiFinals,
      finals,
      winner,
      state
    };
    localStorage.setItem("tournamentState", JSON.stringify(data));
  }, [phase, teams, rounds, qualified, quarterFinals, semiFinals, finals, winner, state]);

  // Reset tournament
  const resetTournament = () => {
    localStorage.removeItem("tournamentState");
    setPhase("setup");
    setTeams([]);
    setRounds([[], []]);
    setQualified([]);
    setQuarterFinals([]);
    setSemiFinals([]);
    setFinals([]);
    setWinner(null);
    setState({
      currentRound: 1,
      currentMatchIndex: 0,
      quarterFinalsMatchIndex: 0,
      semiFinalsMatchIndex: 0,
      finalsMatchIndex: 0
    });
  };

  return (
    <div className="tournament-container">
      <h1 className="title">MootMaster</h1>

      <div className="controls">
        <button onClick={resetTournament}>Reset Tournament</button>
      </div>

      <div className="phase-container">
        {phase === "setup" && (
          <SetupForm
            setTeams={setTeams}
            setRounds={setRounds}
            setPhase={setPhase}
          />
        )}

        {phase === "prelims" && (
          <Prelims
            rounds={rounds}
            teams={teams}
            setQualified={setQualified}
            setPhase={setPhase}
          />
        )}

        {phase === "knockout" && (
          <Knockout
            initialTeams={teams}
            qualified={qualified}
            round1={rounds[0]}
            round2={rounds[1]}
            quarterFinals={quarterFinals}
            setQuarterFinals={setQuarterFinals}
            semiFinals={semiFinals}
            setSemiFinals={setSemiFinals}
            finals={finals}
            setFinals={setFinals}
            winner={winner}
            setWinner={setWinner}
            setPhase={setPhase}
            state={state}
            setState={setState}
            resetTournament={resetTournament}
          />
        )}
      </div>
    </div>
  );
}

export default TournamentApp;
