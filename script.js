let score = 0;

const sitiSicuri = {
    1: true,  // bancasicura.it
    2: false, // super-offerta.net
    3: true,  // inps.it
    4: false  // fake poste
};

const feedback = {
    1: {
        correct: "Corretto! Il sito è sicuro: ha https e il lucchetto",
        incorrect: "Attenzione! Questo è un sito sicuro: nota https e il lucchetto"
    },
    2: {
        correct: "Corretto! Il sito non è sicuro: manca https",
        incorrect: "Sbagliato! Questo sito non è sicuro: manca https"
    },
    3: {
        correct: "Corretto! Il sito INPS è sicuro",
        incorrect: "Attenzione! I siti governativi con https sono sicuri"
    },
    4: {
        correct: "Corretto! Questo è un sito di phishing",
        incorrect: "Sbagliato! URL sospetto: non è il vero sito Poste"
    }
};

function verificaSicurezza(siteId, userAnswer) {
    const correctAnswer = sitiSicuri[siteId];
    const feedbackDiv = document.getElementById(`feedback-${siteId}`);
    
    if (userAnswer === correctAnswer) {
        score += 10;
        feedbackDiv.className = 'feedback correct';
        feedbackDiv.textContent = feedback[siteId].correct;
    } else {
        score -= 5;
        feedbackDiv.className = 'feedback incorrect';
        feedbackDiv.textContent = feedback[siteId].incorrect;
    }
    
    document.getElementById('score').textContent = score;
    feedbackDiv.style.display = 'block';
}
