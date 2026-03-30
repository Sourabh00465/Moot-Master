export function shuffle (array) {
    for(let i = array.length-1;i > 0;i--){
        const j = Math.floor(Math.random() * (i-1));
        [array[i], array[j]] = [array[j],array[i]];
    }
    return array;
}

export function generatedKnockout(teams){
    let shuffled = shuffle([...teams]);
    let rounds = [];

    while(shuffled.length > 1) {
        let round = [];
        for(let i = 0; i < shuffled.length; i+= 2){
            if(i + 1 < shuffled.length) {
                round.push(shuffled[i],shuffled[i+1]);
            } else {
                round.push(shuffled[i],'BYE');
            }
        }
        rounds.push(round);

        shuffled = round.map(match => match[1] === 'BYE' ? match[0] : match[Math.floor(Math.random() * 2)]);
    }
    return rounds;
}