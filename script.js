// Ukrycie menu głównego, a wyświetlenie sekcji gry.
document.getElementById('startButton').addEventListener('click', startGame);

// Domyślne wartości zmiennych na początku gry.
const choices = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let aiScore = 0;
let roundNumber = 1;
let countdownInterval;
let playerChoice = null;

// Rozpoczęcie gry.
function startGame() {
    document.getElementById('main').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    nextRound();
}

// Sprawdzenie czy któryś z graczy osiągnął wymaganą liczbę punktów do wygrania gry.
function nextRound() {
    if (playerScore >= 3 || aiScore >= 3) {
        endGame();
        return;
    }

    document.getElementById('round').textContent = `Runda: ${roundNumber}`;
    document.getElementById('playerScore').textContent = `Gracz: ${playerScore}/3`;
    document.getElementById('aiScore').textContent = `AI: ${aiScore}/3`;
    playerChoice = null;
    document.getElementById('result').textContent = '';
    document.getElementById('playerImage').style.display = 'none';
    document.getElementById('aiImage').style.display = 'none';
    enableButtons();
    startCountdown();
}

// Funkcja obsługująca odliczanie sekund na podjęcie decyzji.
function startCountdown() {
    let countdown = 5;
    document.getElementById('countdown').textContent = countdown;
    countdownInterval = setInterval(() => {
        countdown--;
        document.getElementById('countdown').textContent = countdown;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            checkResult();
        }
    }, 1000);
}

// Funkcja wyświetlająca zdjęcie wyboru po podjęciu decyzji przez gracza.
document.querySelectorAll('.choiceButton').forEach(button => {
    button.addEventListener('click', () => {
        if (!playerChoice) {
            playerChoice = button.getAttribute('data-choice');
            document.getElementById('playerImage').src = `${playerChoice}.jpg`;
            document.getElementById('playerImage').style.display = 'block';
            disableButtons();
            clearInterval(countdownInterval); // Zatrzymanie odliczania
            document.getElementById('countdown').textContent = '0'; // Ustawienie odliczania na zero
            checkResult(); // Wywołanie funkcji sprawdzającej wynik
        }
    });
});

// Funkcja blokująca przyciski wyboru po podjęciu decyzji przez gracza.
function disableButtons() {
    document.querySelectorAll('.choiceButton').forEach(button => {
        button.disabled = true;
    });
}

// Funkcja odblokowująca przyciski wyboru.
function enableButtons() {
    document.querySelectorAll('.choiceButton').forEach(button => {
        button.disabled = false;
    });
}

// Rozbudowana funkcja:
// - Funkcja losująca decyzję AI,
// - Przypisywanie zdjęcia do decyzji AI,
// - Sprawdzenie przypadku remisu,
// - Sprawdzenie przypadku nie podjęcia decyzji przez gracza,
// - Sprawdzenie pojedyńczych przypadków wygrania lub przegrania rundy,
// - Aktywowanie animacji do zdjęcia wygrywającego rundę,
// - Dodanie czasowego interwału na animację po wygraniu rundy.
function checkResult() {
    const aiChoice = choices[Math.floor(Math.random() * choices.length)];
    let resultMessage;

    document.getElementById('aiImage').src = `${aiChoice}.jpg`;
    document.getElementById('aiImage').style.display = 'block';

    if (playerChoice === aiChoice) {
        resultMessage = 'Remis! Żaden z graczy nie otrzymuje punktu.';
    } else if (!playerChoice) {
        ++aiScore;
        resultMessage = 'Gracz nie wybrał opcji, punkt dla AI!';
        document.getElementById('aiImage').classList.add('bounce');
    } else if (
        (playerChoice === 'rock' && aiChoice === 'scissors') ||
        (playerChoice === 'paper' && aiChoice === 'rock') ||
        (playerChoice === 'scissors' && aiChoice === 'paper')
    ) {
        ++playerScore;
        resultMessage = 'Wygrałeś rundę!';
        document.getElementById('playerImage').classList.add('bounce');
    } else {
        ++aiScore;
        resultMessage = 'Przegrałeś rundę!';
        document.getElementById('aiImage').classList.add('bounce');
    }

    document.getElementById('result').textContent = resultMessage;

    setTimeout(() => {
        document.getElementById('playerImage').classList.remove('bounce');
        document.getElementById('aiImage').classList.remove('bounce');
        roundNumber++;
        nextRound();
    }, 3000);
}

// Wyświetlenie komunikatu o zwycięzcy gry.
function endGame() {
    const winner = playerScore >= 3 ? 'Gracz' : 'AI';
    document.getElementById('result').textContent = `KONIEC GRY! Zwycięzcą zostaje ${winner}!`;
    setTimeout(resetGame, 10000);
}

// Przywrócenie gry do domyślnych wartości oraz powrót do menu po zakończeniu gry.
function resetGame() {
    playerScore = 0;
    aiScore = 0;
    roundNumber = 1;
    document.getElementById('main').style.display = 'block';
    document.getElementById('game').style.display = 'none';
}
