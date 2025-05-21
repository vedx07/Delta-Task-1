let red = { titan: 4, score: 0 };
let blue = { titan: 4, score: 0 };
let nodes = document.querySelectorAll(".circle");
let turn = "red";
let level = {
  level1: "unlocked",
  level2: "locked",
  level3: "locked",
};



const levelUnlocker=()=>{
  if(nodes[0].style.backgroundColor!=="pink"&&
     nodes[1].style.backgroundColor!=="pink"&&
     nodes[2].style.backgroundColor!=="pink"&&
     nodes[3].style.backgroundColor!=="pink"&&
     nodes[4].style.backgroundColor!=="pink"&&
     nodes[5].style.backgroundColor!=="pink")
     {
      level.level2="unlocked";
      console.log("huiiiiiii");
     }
     if(nodes[6].style.backgroundColor!=="pink"&&
     nodes[7].style.backgroundColor!=="pink"&&
     nodes[8].style.backgroundColor!=="pink"&&
     nodes[9].style.backgroundColor!=="pink"&&
     nodes[10].style.backgroundColor!=="pink"&&
     nodes[11].style.backgroundColor!=="pink")
     {
      level.level3="unlocked";
     }
}

const changeTurn = () => {
  return turn === "red" ? "blue" : "red";
};

Array.from(nodes).forEach((e) => {
  e.addEventListener("click", (k) => {
    e.style.backgroundColor = turn;
    turn = changeTurn();
    levelUnlocker();
    console.log(k);
  });
});

