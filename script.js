let score = 0;
let currentLevel = 'base';

const scenari = {
    base: [
        {
            id: 1,
            url: "https://www.bancasicura.it",
            hasLock: true,
            title: "Accesso Banca",
            content: "Accedi al tuo conto online",
            isSecure: true,
            explanation: "Sito sicuro: ha https e il lucchetto"
        },
        {
            id: 2,
            url: "http://www.super-offerta.net",
            hasLock: false,
            title: "VINCI SUBITO!",
            content: "Hai vinto 1.000.000€! Inserisci i tuoi dati per ricevere il premio.",
            isSecure: false,
            explanation: "Sito non sicuro: manca https e il lucchetto"
        }
    ],
    intermedio: [
        {
            id: 3,
            url: "https://www.amazon-account-verify.com",
            hasLock: true,
            title: "Amazon - Verifica Account",
            content: "Il tuo account è stato bloccato. Inserisci i dati della carta per sbloccare.",
            isSecure: false,
            explanation: "Attenzione! URL falso che imita Amazon"
        },
        {
            id: 4,
            url: "https://www.paypal.it/login",
            hasLock: true,
            title: "PayPal Login",
            content: "Accedi al tuo conto PayPal",
            isSecure: true,
            explanation: "Sito sicuro: URL ufficiale PayPal con https"
        }
    ],
    avanzato: [
        {
            id: 5,
            url: "http://www.bancaintesa.secure-login.com",
            hasLock: false,
            title: "Banca Intesa - Login Sicuro",
            content: "Accedi qui per sbloccare la tua carta",
            isSecure: false,
            explanation: "Attenzione! Sito di phishing che imita una banca"
        },
        {
            id: 6,
            url: "https://mail.google.com?redirect=mail.google.secure-login.com",
            hasLock: true,
            title: "Gmail Login",
            content: "Accedi alla tua email",
            isSecure: false,
            explanation: "Attenzione al redirect sospetto nell'URL"
        }
    ],
    esperto: [
        {
            id: 7,
            url: "https://accounts.google.com.verify-account.tk",
            hasLock: true,
            title: "Google Account Verification",
            content: "Verifica il tuo account Google",
            isSecure: false,
            explanation: "Attenzione al dominio .tk e alla struttura dell'URL"
        },
        {
            id: 8,
            url: "https://www.poste.it/verificaid.php?redirect=https://posteid.poste.it",
            hasLock: true,
            title: "Poste ID Login",
            content: "Accedi ai servizi Poste Italiane",
            isSecure: true,
            explanation: "Redirect sicuro verso un dominio ufficiale Poste"
        }
    ]
};

function cambiaLivello(livello) {
    // Rimuovi classe active da tutti i bottoni
    document.querySelectorAll('.btn-level').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Aggiungi classe active al bottone cliccato
    event.target.classList.add('active');
    
    currentLevel = livello;
    caricaScenari(scenari[livello]);
}

function caricaScenari(scenariLivello) {
    const container = document.querySelector('.website-list');
    container.innerHTML = ''; // Pulisci contenuto esistente
    
    scenariLivello.forEach(scenario => {
        container.appendChild(creaScenario(scenario));
    });
}

function creaScenario(scenario) {
    const div = document.createElement('div');
    div.className = 'browser-window';
    
    div.innerHTML = `
        <div class="browser-toolbar">
            <div class="url-bar">
                <span class="lock-icon">${scenario.hasLock ? '🔒' : '❌'}</span>
                <span class="url-text">${scenario.url}</span>
            </div>
        </div>
        <div class="browser-content">
            <div class="site-content">
                <h3>${scenario.title}</h3>
                <p>${scenario.content}</p>
            </div>
            <div class="action-buttons">
                <button class="btn btn-sicuro" onclick="verificaSicurezza(${scenario.id}, true)">Sicuro</button>
                <button class="btn btn-non-sicuro" onclick="verificaSicurezza(${scenario.id}, false)">Non Sicuro</button>
            </div>
            <div id="feedback-${scenario.id}" class="feedback"></div>
        </div>
    `;
    
    return div;
}

function verificaSicurezza(id, userAnswer) {
    let scenario;
    // Trova lo scenario corretto
    for (let level in scenari) {
        const found = scenari[level].find(s => s.id === id);
        if (found) {
            scenario = found;
            break;
        }
    }
    
    const feedbackDiv = document.getElementById(`feedback-${id}`);
    
    if (userAnswer === scenario.isSecure) {
        score += 10;
        feedbackDiv.className = 'feedback correct';
        feedbackDiv.textContent = `Corretto! ${scenario.explanation}`;
    } else {
        score -= 5;
        feedbackDiv.className = 'feedback incorrect';
        feedbackDiv.textContent = `Sbagliato. ${scenario.explanation}`;
    }
    
    document.getElementById('score').textContent = score;
    feedbackDiv.style.display = 'block';
}

// Carica il livello base all'avvio
window.onload = () => {
    document.querySelector('.btn-level').classList.add('active');
    caricaScenari(scenari.base);
};
