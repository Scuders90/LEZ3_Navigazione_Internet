let score = 0;
const updateScore = (points) => {
    score += points;
    document.getElementById('score').textContent = score;
};

// Gestione scenari
const scenarios = {
    current: 1,
    total: 3
};

// Siti di esempio con stato di sicurezza
const websites = [
    { url: 'https://www.bancasicura.it', secure: true },
    { url: 'http://www.offertesospette.com', secure: false },
    { url: 'https://www.poste.it', secure: true },
    { url: 'http://www.vincisubito.net', secure: false }
];

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    // Gestione barra degli indirizzi
    const urlInput = document.getElementById('url-input');
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkUrl(urlInput.value);
        }
    });

    // Gestione pulsanti di navigazione
    document.getElementById('back').addEventListener('click', () => {
        updateScore(-5);
        alert('Tornato alla pagina precedente');
    });

    document.getElementById('forward').addEventListener('click', () => {
        updateScore(-5);
        alert('Avanzato alla pagina successiva');
    });

    document.getElementById('reload').addEventListener('click', () => {
        updateScore(5);
        alert('Pagina ricaricata correttamente!');
    });

    // Verifica sicurezza sito
    document.querySelector('.check-button').addEventListener('click', () => {
        const currentUrl = document.querySelector('.url-display').textContent;
        const website = websites.find(site => site.url === currentUrl);
        
        if (website.secure) {
            alert('Ottimo! Questo è un sito sicuro. Note il lucchetto e "https"');
            updateScore(10);
        } else {
            alert('Attenzione! Questo sito non è sicuro. Manca il lucchetto e "https"');
            updateScore(-5);
        }
    });

    // Gestione ricerca
    document.querySelector('.search-button').addEventListener('click', () => {
        const searchInput = document.querySelector('.search-example input').value;
        if (searchInput.length > 3) {
            updateScore(5);
            document.querySelector('.search-results').innerHTML = `
                <div>Risultati per: "${searchInput}"</div>
                <ul>
                    <li>Risultato 1</li>
                    <li>Risultato 2</li>
                    <li>Risultato 3</li>
                </ul>
            `;
        }
    });

    // Gestione tabs
    let tabCount = 1;
    document.querySelector('.tab-action').addEventListener('click', () => {
        if (tabCount < 5) {
            tabCount++;
            updateScore(5);
            const newTab = document.createElement('div');
            newTab.className = 'tab';
            newTab.textContent = `Scheda ${tabCount}`;
            document.querySelector('.tabs-display').appendChild(newTab);
        } else {
            alert('Attenzione! Troppe schede aperte possono rallentare il browser.');
            updateScore(-5);
        }
    });
});

function checkUrl(url) {
    if (url.startsWith('https://')) {
        updateScore(10);
        alert('Ottimo! Hai inserito un URL sicuro');
    } else if (url.startsWith('http://')) {
        updateScore(-5);
        alert('Attenzione! Questo URL non è sicuro');
    } else {
        // Simula una ricerca
        updateScore(5);
        alert('Ricerca effettuata con successo!');
    }
}

// Cambio scenario
function changeScenario(num) {
    document.querySelectorAll('.scenario').forEach(s => s.classList.remove('active'));
    document.getElementById(`scenario${num}`).classList.add('active');
    scenarios.current = num;
}
