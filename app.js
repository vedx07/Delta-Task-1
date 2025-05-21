let red = { titan: 4, score: 0 };
let blue = { titan: 4, score: 0 };
let player ={red,blue}
let turn = "red";
const levels = [1,2,3];
const unlockedLevels = [];



const changeTurn = () => {
  return turn === "red" ? "blue" : "red";
};

const islevel =(level)=>{
  if(level===1){return true;}
  else if(unlockedLevels.includes(level)){return true;}
  else{ return false;}
}

const checkUnlockNextlevel=(level)=>{
  let levelnodes = document.querySelectorAll(`.circle.level-${level}`);
  let flag;
  for(let i=0; i<6; i++){
    if(levelnodes[i].style.backgroundColor==="")
    {
      flag=false;
      break;
    }
    else{
      flag=true;
    }
  }
  if(flag){
    unlockedLevels.push(level+1);
  }
}

const moveSelect = (e,turn) =>{
  if(e.style.backgroundColor==`${turn}`){
    e.style.border = "2px solid yellow";
    return e.classList[3];
  }
  else{
    console.log("Movement phase Invalid")
  }
}

levels.forEach( (level)=>{
  let nodes = document.querySelectorAll(`.circle.level-${level}`);
  
  Array.from(nodes).forEach((e) => {
  e.addEventListener("click", (k) => {
    //PLACEMENT PHASE
    if(islevel(level) && player[turn].titan>0 && e.style.backgroundColor!="red" && e.style.backgroundColor!="blue"){
        e.style.backgroundColor = turn;
        player[turn].titan--;
        // console.log(`${turn} : ${player[turn].titan}`);
        turn = changeTurn();
        checkUnlockNextlevel(level);
    }
    //MOVEMENT PHASE
    else if(player[turn].titan==0){
      //node = SELECT(e,turn)
      //TARGET(e,turn,node compare node codition for movement)
      let nodeSelected = moveSelect(e,turn);
      
      // let node = e.classList[3];
     console.log(nodeSelected);
     turn = changeTurn();
    }
    else{
      console.log("Invalid");
    }
    
  })
})
})


