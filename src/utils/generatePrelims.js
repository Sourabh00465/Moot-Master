import shuffle from "./shuffle";

export default function generatePrelims(teams) {
  if (teams.length % 2 !== 0) {
    throw new Error("Number of teams must be even");
  }

  // Round 1
  const shuffled1 = shuffle([...teams]);
  const round1 = [];
  const rolesMap = {};
  const opponentsMap = {};

  for (let i = 0; i < shuffled1.length; i += 2) {
    const petitioner = shuffled1[i];
    const respondent = shuffled1[i+1];

    round1.push({
      matchNumber: `Match ${i/2 + 1}`,
      petitioner,
      respondent
    });

    rolesMap[petitioner] = "Petitioner";
    rolesMap[respondent] = "Respondent";

    opponentsMap[petitioner] = respondent;
    opponentsMap[respondent] = petitioner;
  }

  // Pre-compute flipped roles for Round 2
  const flippedRolesMap = {};
  teams.forEach(t => {
    flippedRolesMap[t] = rolesMap[t] === "Petitioner" ? "Respondent" : "Petitioner";
  });

  // Round 2
  const shuffled2 = shuffle([...teams]);
  const round2 = [];
  const used = new Set();

  for (let i = 0; i < shuffled2.length; i++) {
    const t1 = shuffled2[i];
    if (used.has(t1)) continue;

    // Find valid opponent with complementary role and not same as Round 1
    let t2 = null;
    for (let j = i+1; j < shuffled2.length; j++) {
      const candidate = shuffled2[j];
      if (
        !used.has(candidate) &&
        opponentsMap[t1] !== candidate &&
        flippedRolesMap[t1] !== flippedRolesMap[candidate] // complementary roles
      ) {
        t2 = candidate;
        break;
      }
    }

    if (!t2) throw new Error(`Could not find valid opponent for ${t1}`);

    used.add(t1);
    used.add(t2);

    round2.push({
      matchNumber: `Match ${round2.length + 1}`,
      petitioner: flippedRolesMap[t1] === "Petitioner" ? t1 : t2,
      respondent: flippedRolesMap[t1] === "Respondent" ? t1 : t2
    });
  }

  return [round1, round2];
}
