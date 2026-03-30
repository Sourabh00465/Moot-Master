import React from "react";
import { motion } from "framer-motion";

function MatchCard({ petitioner, respondent, recordResult }) {
  const handleWinner = (winner) => {
    recordResult(winner, 3); // winner gets 3 points
  };

  return (
    <motion.div 
      className="match-card"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p><strong>Petitioner:</strong> {petitioner}</p>
      <p><strong>Respondent:</strong> {respondent}</p>
      <button onClick={() => handleWinner(petitioner)}>Petitioner Wins</button>
      <button onClick={() => handleWinner(respondent)}>Respondent Wins</button>
    </motion.div>
  );
}

export default MatchCard;
