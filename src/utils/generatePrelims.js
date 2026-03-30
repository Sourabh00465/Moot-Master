import shuffle from "./shuffle";

export default function generatePrelims(teams) {
  if (teams.length % 2 !== 0) {
    throw new Error("Number of teams must be even");
  }

  // Round 1
  const shuffled1 = shuffle([...teams]);
  const round1 = [];
  const rolesMap = {}; // track who was petitioner/respondent

  for (let i = 0; i < shuffled1.length; i += 2) {
    round1.push({
      matchNumber: `Match ${i/2 + 1}`,
      petitioner: shuffled1[i],
      respondent: shuffled1[i+1]
    });
    rolesMap[shuffled1[i]] = "Petitioner";
    rolesMap[shuffled1[i+1]] = "Respondent";
  }

  // Track opponents
  const opponentsMap = {};
  round1.forEach(m => {
    opponentsMap[m.petitioner] = m.respondent;
    opponentsMap[m.respondent] = m.petitioner;
  });

  // Round 2
  const shuffled2 = shuffle([...teams]);
  const round2 = [];

  for (let i = 0; i < shuffled2.length; i += 2) {
    let t1 = shuffled2[i];
    let t2 = shuffled2[i+1];

    // Avoid repeat opponents
    if (opponentsMap[t1] === t2 || opponentsMap[t2] === t1) {
      const swapIndex = (i+2) % shuffled2.length;
      [shuffled2[i+1], shuffled2[swapIndex]] = [shuffled2[swapIndex], shuffled2[i+1]];
      t2 = shuffled2[i+1];
    }

    // Alternate roles: flip compared to Round 1
    const t1Role = rolesMap[t1] === "Petitioner" ? "Respondent" : "Petitioner";
    const t2Role = rolesMap[t2] === "Petitioner" ? "Respondent" : "Petitioner";

    round2.push({
      matchNumber: `Match ${i/2 + 1}`,
      petitioner: t1Role === "Petitioner" ? t1 : t2,
      respondent: t1Role === "Respondent" ? t1 : t2
    });
  }

  return [round1, round2];
}
