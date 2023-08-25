// js DOM

// memunculkan dan mengelurkan peraturan
// membuat variabel setiap function
const btnperaturan = document.querySelector(".tombol-peraturan");
const btnkeluar = document.querySelector(".tombol_close_peraturan");
const peraturan = document.querySelector(".peraturan");

// menampilkan/ menghilangkan peraturan
btnperaturan.addEventListener("click", () => {
  peraturan.classList.toggle("tampilkan_cara");
});
btnkeluar.addEventListener("click", () => {
  peraturan.classList.toggle("tampilkan_cara");
});

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results_winner");
const resultText = document.querySelector(".results_text");

const playAgainBtn = document.querySelector(".play-again-btn");

const scoreNumber = document.querySelector(".score_total"); 

var score = 0;

// game logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="assets/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
        `;
    }, idx * 100);
  });
   gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win";
      keepScore(1);
    } else if (aiWins) {
      resultText.innerText = "you lose";
      keepScore(-1);
    } else {
      resultText.innerText = "draw";
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
}

// Play Again
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
});

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

// sricpt tombol play again untuk bermain lagi
// playAgainBtn.addEventListener('click', () => {
//   gameDiv.classList.toggle('hidden')
//   resultsDiv.classList.toggle('hidden')

//   resultsDiv.forEach(resultsDiv => {
//     resultsDiv.innerHTML = ""
//     resultsDiv.classList.remove('winner')
//   })

//   resultText.innerText = ""
//   resultWinner.classList.toggle('hidden')
//   resultsDiv.classList.toggle('show-winner')
// })
