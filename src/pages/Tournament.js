import React, { useState } from "react";
import TeamInput from "../components/TeamInput";
import MatchCard from "../components/MatchCard";
import { shuffle } from "../utils/knockout";
import "../styles/App.css";

function Tournament() {
  const [currentRound, setCurrentRound] = useState([]);
  const [winners, setWinners] = useState({});
  const [roundNumber, setRoundNumber] = useState(0);
  const [champion, setChampion] = useState(null);

  const handleTeams = (teams) => {
    const shuffled = shuffle([...teams]);
    const firstRound = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        firstRound.push([shuffled[i], shuffled[i+1]]);
      } else {
        firstRound.push([shuffled[i], "BYE"]);
      }
    }
    setCurrentRound(firstRound);
    setRoundNumber(1);
    setWinners({});
    setChampion(null);
  };

  const handleWinner = (matchIndex, winner) => {
    setWinners(prev => ({ ...prev, [matchIndex]: winner }));
  };

  const nextRound = () => {
    if (Object.keys(winners).length === currentRound.length) {
      const nextTeams = Object.values(winners);
      if (nextTeams.length === 1) {
        setChampion(nextTeams[0]);
      } else {
        const newRound = [];
        const shuffled = shuffle([...nextTeams]);
        for (let i = 0; i < shuffled.length; i += 2) {
          if (i + 1 < shuffled.length) {
            newRound.push([shuffled[i], shuffled[i+1]]);
          } else {
            newRound.push([shuffled[i], "BYE"]);
          }
        }
        setCurrentRound(newRound);
        setRoundNumber(roundNumber + 1);
        setWinners({}); // ✅ reset winners for new round
      }
    } else {
      alert("Please select winners for all matches first!");
    }
  };

  return (
    <div className="tournament-container">
      <h1>Knockout Tournament</h1>
      <TeamInput onGenerate={handleTeams} />
      {currentRound.length > 0 && (
        <div>
          <h2 className="round-title">Round {roundNumber}</h2>
          <div className="round-container">
            {currentRound.map((match, idx) => (
              <MatchCard
                key={idx}
                teamA={match[0]}
                teamB={match[1]}
                winner={winners[idx]}   // controlled by parent
                onWinner={(winner) => handleWinner(idx, winner)}
              />
            ))}
          </div>
          <button onClick={nextRound}>Proceed to Next Round</button>
        </div>
      )}
      {champion && <div className="champion">🏆 Champion: {champion}</div>}
    </div>
  );
}

export default Tournament;
