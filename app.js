let red = { titan: 4, score: 0, time: 0 };
let blue = { titan: 4, score: 0, time: 0 };
let player = { red, blue };
let turn = "red";
let ting = new Audio("ting.mp3");
const levels = [1, 2, 3];
const unlockedLevels = [];
const edges = [
  [1, 2, 1],
  [2, 3, 3],
  [3, 4, 2],
  [4, 5, 1],
  [5, 6, 2],
  [6, 1, 1],
  [1, 7, 1],
  [3, 9, 1],
  [5, 11, 1],
  [7, 8, 6],
  [8, 9, 4],
  [9, 10, 5],
  [10, 11, 6],
  [11, 12, 4],
  [12, 7, 5],
  [8, 14, 1],
  [10, 16, 1],
  [12, 18, 1],
  [13, 14, 8],
  [14, 15, 9],
  [15, 16, 8],
  [16, 17, 8],
  [17, 18, 9],
  [18, 13, 8],
];
const colors = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
  16: "",
  17: "",
  18: "",
};

//TIMER 

const INITIAL_TIME = 4 * 60; // in seconds
red.time = INITIAL_TIME;
blue.time = INITIAL_TIME;
let intervalId = null;
let isPaused = false;

const formatTime = (t) => {
  let min = Math.floor(t / 60);
  let sec = t % 60;
  sec = sec < 10 ? `0${sec}` : sec;
  return `${min} : ${sec}`;
};
const updateDisplay = () => {
  document.querySelector(".red-timer").textContent = `Red : ${formatTime(
    red.time
  )}`;
  document.querySelector(".blue-timer").textContent = `Blue : ${formatTime(
    blue.time
  )}`;
};

const tick = () => {
  if (isPaused) return;

  if (turn === "red" && red.time > 0) {
    red.time--;
  } else if (turn === "blue" && blue.time > 0) {
    blue.time--;
  }

  updateDisplay();
  if (red.time === 0 || blue.time === 0) {
    clearInterval(intervalId);
    // alert(`${turn.toUpperCase()} ran out of time!`);
    isWin(turn);
  }
};
const startTimer = () => {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(tick, 1000);
};

const pauseTimer = () => {
  isPaused = true;
};
const resumeTimer = () => {
  if (red.time === 0 || blue.time === 0) return;
  isPaused = false;
  startTimer();
};
const resetTimer = () => {
  clearInterval(intervalId);
  red.time = INITIAL_TIME;
  blue.time = INITIAL_TIME;
  turn = "red";
  isPaused = false;
  updateDisplay();
};

updateDisplay(); // Initial render
startTimer();


function changeTurn() {
  document.querySelector(".card-main-msg").innerHTML =
    turn === "red" ? "Blue's Turn" : "Red's Turn";
  document.querySelector(".card-main-msg").style.color =
    turn === "red" ? "blue" : "red";
  return turn === "red" ? "blue" : "red";
}

const islevel = (level) => {
  if (level === 1) {
    return true;
  } else if (unlockedLevels.includes(level)) {
    return true;
  } else {
    return false;
  }
};

const checkUnlockNextlevel = (level) => {
  let levelnodes = document.querySelectorAll(`.circle.level-${level}`);
  let flag;
  for (let i = 0; i < 6; i++) {
    if (levelnodes[i].style.backgroundColor === "") {
      flag = false;
      break;
    } else {
      flag = true;
    }
  }
  if (flag) {
    unlockedLevels.push(level + 1);
  }
};

const validMove = (e, selectedNode, level, levelofselectedNode) => {
  //level wise movement
  if (level === levelofselectedNode) {
    return (
      e.classList[3] == Number(selectedNode) + 1 ||
      e.classList[3] == Number(selectedNode) - 1 ||
      e.classList[3] == Number(selectedNode) + 5 ||
      e.classList[3] == Number(selectedNode) - 5
    );
  }
  if (level != levelofselectedNode) {
    let isbridge =
      e.classList[3] == Number(selectedNode) + 6 ||
      e.classList[3] == Number(selectedNode) - 6;
    if (levelofselectedNode == 1) {
      let canMove = [7, 9, 11];
      return canMove.includes(Number(e.classList[3])) && isbridge;
    }
    if (levelofselectedNode == 2) {
      let canMove = [1, 3, 5, 14, 16, 18];
      return canMove.includes(Number(e.classList[3])) && isbridge;
    }
    if (levelofselectedNode == 3) {
      let canMove = [8, 10, 12];
      return canMove.includes(Number(e.classList[3])) && isbridge;
    }
  } else {
    return false;
  }
};

const soureCount = () => {
  Array.from(document.querySelectorAll(".circle")).forEach((e) => {
    colors[Number(e.classList[3])] = e.style.backgroundColor;
    // console.log(e.classList[3]);
  });
  red.score = 0;
  blue.score = 0;
  for (const [v1, v2, score] of edges) {
    const color1 = colors[v1];
    const color2 = colors[v2];

    if (color1 === color2) {
      if (color1 === "red") red.score += score;
      else if (color1 === "blue") blue.score += score;
    }
  }

  //  console.log(`Red : ${red.score} , Blue : ${blue.score}`);
  document.querySelector(".red-score").innerHTML = `${red.score}`;
  document.querySelector(".blue-score").innerHTML = `${blue.score}`;
};


const isWin=(timeoverCOLOR)=>{
  let count=0;
  let innerHex = document.querySelectorAll(".level-3");

  Array.from(innerHex).forEach((e)=>{
    if(e.style.backgroundColor!=""){
      count++;
    } })

  if(count==6){
    alert(`YAYY! ${Number(document.querySelector(".red-score").innerHTML)>Number(document.querySelector(".blue-score").innerHTML)?" RED ":" BLUE "} WON THE GAME 🎉`);
  }
  if(timeoverCOLOR=="red"||timeoverCOLOR=="blue"){
    alert(`YAYY! ${timeoverCOLOR=="blue"?" RED ":" BLUE "} WON THE GAME 🎉`)
    
  }

}


let selectedNode = null;
let levelofselectedNode = 0;

levels.forEach((level) => {
  let nodes = document.querySelectorAll(`.circle.level-${level}`);

  Array.from(nodes).forEach((e) => {
    e.addEventListener("click", (k) => {
      // console.log(`${turn} : ${player[turn].titan}`);
      // console.log(`levelunlocked : ${unlockedLevels}`);
      // console.log(turn);
      // console.log(e.classList[3]);

      //PLACEMENT PHASE
      if (
        islevel(level) &&
        player[turn].titan > 0 &&
        e.style.backgroundColor != "red" &&
        e.style.backgroundColor != "blue"
      ) {
        e.style.backgroundColor = turn;
        ting.play();
        player[turn].titan--;
        // console.log(`${turn} : ${player[turn].titan}`);
        turn = changeTurn();
        checkUnlockNextlevel(level);
      }

      // Movement Phase - select piece
      if (islevel(level) && player[turn].titan == 0) {
        if (e.style.backgroundColor === turn && selectedNode === null) {
          selectedNode = e.classList[3];
          levelofselectedNode = level;
          e.style.border = "2px solid yellow";
          ting.play();
        }
        console.log(`Selected Node - ${selectedNode}`);

        // If already selected a node, now selecting target
        if (selectedNode !== null && e.style.backgroundColor === "") {
          if (validMove(e, selectedNode, level, levelofselectedNode)) {
            e.style.backgroundColor = turn;
            let prev = document.querySelector(`.c${selectedNode}`);
            prev.style.backgroundColor = "";
            prev.style.border = "2px solid black";
            selectedNode = null;
            ting.play();
            isWin();
            turn = changeTurn();
            checkUnlockNextlevel(level);
          } else {
            console.log("Invalid target!");
          }
        } else {
          console.log("Invalid selection or target");
        }
      }

      soureCount();
      // console.log(colors);
    });
  });
});

document.querySelector("#rbtn").addEventListener("click", () => {
  resetTimer();
  resumeTimer();
  document.querySelector("#p-rbtn").textContent = "Pause";
  Array.from(document.querySelectorAll(".circle")).forEach((e) => {
    e.style.backgroundColor="";
    colors[Number(e.classList[3])] = e.style.backgroundColor;
    red.titan=4;
    blue.titan=4;
    red.score=0;
    blue.score=0;
    document.querySelector(".red-score").innerHTML = `${red.score}`;
    document.querySelector(".blue-score").innerHTML = `${blue.score}`;
    
  });

  

});

document.querySelector("#p-rbtn").addEventListener("click", () => {
  if (document.querySelector("#p-rbtn").textContent == "Pause") {
    pauseTimer();
    document.querySelector("#p-rbtn").textContent = "Resume";
  } else {
    resumeTimer();
    document.querySelector("#p-rbtn").textContent = "Pause";
  }
});
