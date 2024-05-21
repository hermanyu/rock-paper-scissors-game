"use strict";

// game functions
function convertChoiceToNumber(choice) {
    const choiceDict = {
        "rock" : 0,
        "paper" : 1,
        "scissor" : 2,
        "scissors" : 2
    }

    return choiceDict[choice];
}


function getRandomInt(min, max){
    return Math.floor( Math.random() * (max + 1) ) + min;
}

function getComputerChoice(){
    const choiceDict = {
        0 : "rock",
        1 : "paper",
        2 : "scissors"
    }

    return choiceDict[getRandomInt(0, 2)];
}

function getPlayerChoice(){
    const validChoices = ["rock", "paper", "scissor", "scissors"];

    let playerChoice = prompt("Choose: Rock, Paper, or Scissors");
    playerChoice = playerChoice.toLowerCase();

    if (!validChoices.includes(playerChoice)){
        playerChoice = "rock";
    } else if (playerChoice === "scissor"){
        playerChoice = "scissors";
    }

    return playerChoice;
}

function checkResult(playerChoice, computerChoice){
    const playerChoiceInt = convertChoiceToNumber(playerChoice);
    const computerChoiceInt = convertChoiceToNumber(computerChoice);

    if (playerChoiceInt === computerChoiceInt){
        return "tie";
    } else if (playerChoiceInt === 2 && computerChoiceInt === 0) {
        return "computer";
    } else if (playerChoiceInt === 0 && computerChoiceInt === 2) {
        return "player";
    } else if (playerChoiceInt < computerChoiceInt) {
        return "computer";
    } else {
        return "player";
    }
}

function updateScore(result) {
    if (result === "player"){
        const scoreNode = document.querySelector("div.player-score > div.score > p");
        scoreNode.textContent = Number(scoreNode.textContent) + 1;
    } else if (result === "computer"){
        const scoreNode = document.querySelector("div.cpu-score > div.score > p");
        scoreNode.textContent = Number(scoreNode.textContent) + 1;
    }
}

function updatePlayerImage(choice){

    const imageNode = document.querySelector("img.player-image");
    const choiceNode = document.querySelector("div.player-area > div.choice > p.choice-text");

    const imgSrc = "assets/" + choice + ".png";
    choiceNode.textContent = choice;
    imageNode.setAttribute("src", imgSrc);
}

function updateCPUImage(choice){
    const imageNode = document.querySelector("img.cpu-image");
    const choiceNode = document.querySelector("div.cpu-area > div.choice > p.choice-text");

    const imgSrc = "assets/" + choice + ".png";

    choiceNode.textContent = choice;
    imageNode.setAttribute("src", imgSrc);
}

function playRound(playerChoice){
    let choiceDictionary = {
        0 : "rock",
        1 : "paper",
        2 : "scissors"
    }
    
    let computerChoice = getComputerChoice();

    updatePlayerImage(playerChoice);
    updateCPUImage(computerChoice);

    console.log(`Player Choice: ${choiceDictionary[playerChoice]}`);
    console.log(`Computer Choice: ${choiceDictionary[computerChoice]}`);
    let result = checkResult(playerChoice, computerChoice);
    updateScore(result);
    console.log(result);
    return result;
}

const buttonNodeList = document.querySelectorAll("button.choice-button");

for (let buttonNode of buttonNodeList){
    buttonNode.addEventListener("mouseenter", ()=>{buttonNode.classList.add("highlighted");});
    buttonNode.addEventListener("mouseleave", ()=>{buttonNode.classList.remove("highlighted");});
    buttonNode.addEventListener(
        "click",
        () => {
            playRound(buttonNode.textContent.toLowerCase());
        }
    );
}


// function playGame(){
//     let playerScore = 0;
//     let computerScore = 0;

//     let result = "init";

//     for (let i = 0; i < 1; i++){
//         console.log(`Round ${i + 1}`);
//         result = playRound();
//         updateScore(result);
//         console.log("-----------------------------\n");
//     }

//     console.log(`Final Score: Player ${playerScore} - Computer ${computerScore}`);

// }

// const bodyNode = document.querySelector("div.gamearea");
// bodyNode.addEventListener("click", playGame);