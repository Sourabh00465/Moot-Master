// import React, { useState, useEffect } from "react";
// import shuffle from "../utils/shuffle";

// function Knockout({
//   qualified,
//   quarterFinals,
//   setQuarterFinals,
//   semiFinals,
//   setSemiFinals,
//   finals,
//   setFinals,
//   winner,
//   setWinner,
//   round1,
//   round2,
//   initialTeams
// }) {
//   const [selectedWinners, setSelectedWinners] = useState([]);

//   // Generate initial knockout bracket dynamically
//   useEffect(() => {
//     if (qualified.length > 0 && quarterFinals.length === 0 && semiFinals.length === 0 && finals.length === 0) {
//       const shuffled = shuffle([...qualified]);

//       if (shuffled.length === 2) {
//         // Direct Finals
//         setFinals([{ petitioner: shuffled[0], respondent: shuffled[1] }]);
//       } else if (shuffled.length === 4) {
//         // Direct Semifinals
//         setSemiFinals([
//           { petitioner: shuffled[0], respondent: shuffled[1] },
//           { petitioner: shuffled[2], respondent: shuffled[3] }
//         ]);
//       } else {
//         // Quarterfinals (default for 8+ teams)
//         const matches = [];
//         for (let i = 0; i < shuffled.length - 1; i += 2) {
//           matches.push({ petitioner: shuffled[i], respondent: shuffled[i+1] });
//         }
//         if (shuffled.length % 2 === 1) {
//           matches.push({ petitioner: shuffled[shuffled.length - 1], respondent: "BYE" });
//           setSelectedWinners([...(selectedWinners || []), shuffled[shuffled.length - 1]]);
//         }
//         setQuarterFinals(matches);
//       }
//     }
//   }, [qualified, quarterFinals, semiFinals, finals, setQuarterFinals, setSemiFinals, setFinals]);

//   const pickWinner = (matchIndex, winnerName) => {
//     const updated = [...selectedWinners];
//     updated[matchIndex] = winnerName;
//     setSelectedWinners(updated);
//   };

//   const confirmStage = (currentMatches, setNextStage) => {
//     const next = [];
//     for (let i = 0; i < selectedWinners.length; i += 2) {
//       if (selectedWinners[i+1]) {
//         next.push({ petitioner: selectedWinners[i], respondent: selectedWinners[i+1] });
//       }
//     }
//     setNextStage(next);
//     setSelectedWinners([]);
//   };

//   const confirmFinals = () => {
//     setWinner(selectedWinners[0]);
//     setSelectedWinners([]);
//   };

//   const exportTournament = () => {
//     const data = {
//       initialTeams,
//       qualifiedTeams: qualified,
//       round1,
//       round2,
//       quarterFinals,
//       semiFinals,
//       finals,
//       winner
//     };
//     const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "tournament-results.json";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="knockout-page">
//       <h2>Knockouts</h2>

//       <div className="knockout-container">
//         {/* Quarterfinals */}
//         {quarterFinals.length > 0 && semiFinals.length === 0 && finals.length === 0 && (
//           <div className="round-column">
//             <h3>Quarterfinals</h3>
//             {quarterFinals.map((match, idx) => (
//               <div key={idx} className="match-card">
//                 <p><strong>Petitioner:</strong> {match.petitioner}</p>
//                 <p><strong>Respondent:</strong> {match.respondent}</p>
//                 {match.respondent !== "BYE" ? (
//                   <>
//                     <button
//                       className={selectedWinners[idx] === match.petitioner ? "winner-button" : ""}
//                       onClick={() => pickWinner(idx, match.petitioner)}
//                     >
//                       {match.petitioner}
//                     </button>
//                     <button
//                       className={selectedWinners[idx] === match.respondent ? "winner-button" : ""}
//                       onClick={() => pickWinner(idx, match.respondent)}
//                     >
//                       {match.respondent}
//                     </button>
//                   </>
//                 ) : (
//                   <p>Bye → {match.petitioner} advances</p>
//                 )}
//               </div>
//             ))}
//             {selectedWinners.length === quarterFinals.length &&
//              selectedWinners.every(Boolean) && (
//               <button onClick={() => confirmStage(quarterFinals, setSemiFinals)}>
//                 Confirm Quarterfinal Winners
//               </button>
//             )}
//           </div>
//         )}

//         {/* Semifinals */}
//         {semiFinals.length > 0 && finals.length === 0 && (
//           <div className="round-column">
//             <h3>Semifinals</h3>
//             {semiFinals.map((match, idx) => (
//               <div key={idx} className="match-card">
//                 <p><strong>Petitioner:</strong> {match.petitioner}</p>
//                 <p><strong>Respondent:</strong> {match.respondent}</p>
//                 <button
//                   className={selectedWinners[idx] === match.petitioner ? "winner-button" : ""}
//                   onClick={() => pickWinner(idx, match.petitioner)}
//                 >
//                   {match.petitioner}
//                 </button>
//                 <button
//                   className={selectedWinners[idx] === match.respondent ? "winner-button" : ""}
//                   onClick={() => pickWinner(idx, match.respondent)}
//                 >
//                   {match.respondent}
//                 </button>
//               </div>
//             ))}
//             {selectedWinners.length === semiFinals.length &&
//              selectedWinners.every(Boolean) && (
//               <button onClick={() => confirmStage(semiFinals, setFinals)}>
//                 Confirm Semifinal Winners
//               </button>
//             )}
//           </div>
//         )}

//         {/* Finals */}
//         {finals.length > 0 && !winner && (
//           <div className="round-column">
//             <h3>Finals</h3>
//             {finals.map((match, idx) => (
//               <div key={idx} className="match-card">
//                 <p><strong>Petitioner:</strong> {match.petitioner}</p>
//                 <p><strong>Respondent:</strong> {match.respondent}</p>
//                 <button
//                   className={selectedWinners[idx] === match.petitioner ? "winner-button" : ""}
//                   onClick={() => pickWinner(idx, match.petitioner)}
//                 >
//                   {match.petitioner}
//                 </button>
//                 <button
//                   className={selectedWinners[idx] === match.respondent ? "winner-button" : ""}
//                   onClick={() => pickWinner(idx, match.respondent)}
//                 >
//                   {match.respondent}
//                 </button>
//               </div>
//             ))}
//             {selectedWinners.length === 1 && selectedWinners[0] && (
//               <button onClick={confirmFinals}>Confirm Champion</button>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Champion + Export */}
//       {winner && (
//         <div className="champion">
//           <h2>🏆 Champion: {winner}</h2>
//           <button onClick={exportTournament}>Export Tournament Results</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Knockout;
import React, { useState, useEffect } from "react";
import shuffle from "../utils/shuffle";

function Knockout({
  qualified,
  quarterFinals,
  setQuarterFinals,
  semiFinals,
  setSemiFinals,
  finals,
  setFinals,
  winner,
  setWinner,
  round1,
  round2,
  initialTeams
}) {
  const [selectedWinners, setSelectedWinners] = useState([]);

  // Generate initial knockout bracket dynamically
  useEffect(() => {
    if (qualified.length > 0 && quarterFinals.length === 0 && semiFinals.length === 0 && finals.length === 0) {
      const shuffled = shuffle([...qualified]);

      if (shuffled.length === 2) {
        // Direct Finals
        setFinals([{ petitioner: shuffled[0], respondent: shuffled[1] }]);
      } else if (shuffled.length === 4) {
        // Direct Semifinals
        setSemiFinals([
          { petitioner: shuffled[0], respondent: shuffled[1] },
          { petitioner: shuffled[2], respondent: shuffled[3] }
        ]);
      } else {
        // Quarterfinals (default for 8+ teams)
        const matches = [];
        for (let i = 0; i < shuffled.length - 1; i += 2) {
          matches.push({ petitioner: shuffled[i], respondent: shuffled[i+1] });
        }
        if (shuffled.length % 2 === 1) {
          matches.push({ petitioner: shuffled[shuffled.length - 1], respondent: "BYE" });
          setSelectedWinners([...(selectedWinners || []), shuffled[shuffled.length - 1]]);
        }
        setQuarterFinals(matches);
      }
    }
  }, [qualified, quarterFinals, semiFinals, finals, setQuarterFinals, setSemiFinals, setFinals]);

  const pickWinner = (matchIndex, winnerName) => {
    const updated = [...selectedWinners];
    updated[matchIndex] = winnerName;
    setSelectedWinners(updated);
  };

  const confirmStage = (currentMatches, setNextStage) => {
    const next = [];
    for (let i = 0; i < selectedWinners.length; i += 2) {
      if (selectedWinners[i+1]) {
        next.push({ petitioner: selectedWinners[i], respondent: selectedWinners[i+1] });
      }
    }
    setNextStage(next);
    setSelectedWinners([]);
  };

  const confirmFinals = () => {
    setWinner(selectedWinners[0]);
    setSelectedWinners([]);
  };

  // Export helper
  const exportTournament = (filename = "tournament-results.json") => {
    const data = {
      initialTeams,
      qualifiedTeams: qualified,
      round1,
      round2,
      quarterFinals,
      semiFinals,
      finals,
      winner
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="knockout-page">
      <h2>Knockouts</h2>

      <div className="knockout-container">
        {/* Quarterfinals */}
        {quarterFinals.length > 0 && semiFinals.length === 0 && finals.length === 0 && (
          <div className="round-column">
            <h3>Quarterfinals</h3>
            {quarterFinals.map((match, idx) => (
              <div key={idx} className="match-card">
                <p><strong>Petitioner:</strong> {match.petitioner}</p>
                <p><strong>Respondent:</strong> {match.respondent}</p>
                {match.respondent !== "BYE" ? (
                  <>
                    <button
                      className={selectedWinners[idx] === match.petitioner ? "winner-button" : ""}
                      onClick={() => pickWinner(idx, match.petitioner)}
                    >
                      {match.petitioner}
                    </button>
                    <button
                      className={selectedWinners[idx] === match.respondent ? "winner-button" : ""}
                      onClick={() => pickWinner(idx, match.respondent)}
                    >
                      {match.respondent}
                    </button>
                  </>
                ) : (
                  <p>Bye → {match.petitioner} advances</p>
                )}
              </div>
            ))}
            {selectedWinners.length === quarterFinals.length &&
             selectedWinners.every(Boolean) && (
              <button onClick={() => confirmStage(quarterFinals, setSemiFinals)}>
                Confirm Quarterfinal Winners
              </button>
            )}
            <button onClick={() => exportTournament("quarterfinals.json")}>
              Export Quarterfinals
            </button>
          </div>
        )}

        {/* Semifinals */}
        {semiFinals.length > 0 && finals.length === 0 && (
          <div className="round-column">
            <h3>Semifinals</h3>
            {semiFinals.map((match, idx) => (
              <div key={idx} className="match-card">
                <p><strong>Petitioner:</strong> {match.petitioner}</p>
                <p><strong>Respondent:</strong> {match.respondent}</p>
                <button
                  className={selectedWinners[idx] === match.petitioner ? "winner-button" : ""}
                  onClick={() => pickWinner(idx, match.petitioner)}
                >
                  {match.petitioner}
                </button>
                <button
                  className={selectedWinners[idx] === match.respondent ? "winner-button" : ""}
                  onClick={() => pickWinner(idx, match.respondent)}
                >
                  {match.respondent}
                </button>
              </div>
            ))}
            {selectedWinners.length === semiFinals.length &&
             selectedWinners.every(Boolean) && (
              <button onClick={() => confirmStage(semiFinals, setFinals)}>
                Confirm Semifinal Winners
              </button>
            )}
            <button onClick={() => exportTournament("semifinals.json")}>
              Export Semifinals
            </button>
          </div>
        )}

        {/* Finals */}
        {finals.length > 0 && !winner && (
          <div className="round-column">
            <h3>Finals</h3>
            {finals.map((match, idx) => (
              <div key={idx} className="match-card">
                <p><strong>Petitioner:</strong> {match.petitioner}</p>
                <p><strong>Respondent:</strong> {match.respondent}</p>
                <button
                  className={selectedWinners[idx] === match.petitioner ? "winner-button" : ""}
                  onClick={() => pickWinner(idx, match.petitioner)}
                >
                  {match.petitioner}
                </button>
                <button
                  className={selectedWinners[idx] === match.respondent ? "winner-button" : ""}
                  onClick={() => pickWinner(idx, match.respondent)}
                >
                  {match.respondent}
                </button>
              </div>
            ))}
            {selectedWinners.length === 1 && selectedWinners[0] && (
              <button onClick={confirmFinals}>Confirm Champion</button>
            )}
            <button onClick={() => exportTournament("finals.json")}>
              Export Finals
            </button>
          </div>
        )}
      </div>

      {/* Champion + Export */}
      {winner && (
        <div className="champion">
          <h2>🏆 Champion: {winner}</h2>
          {/* <button onClick={() => exportTournament("champion.json")}>
            Export Champion
          </button> */}
          <button onClick={() => exportTournament("tournament-results.json")}>
            Export Full Tournament
          </button>
        </div>
      )}
    </div>
  );
}

export default Knockout;
