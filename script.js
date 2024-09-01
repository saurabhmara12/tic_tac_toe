const gameInfo=document.querySelector(".user-info");
const boxes=document.querySelectorAll(".box");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

// ye hamere winning condiations hain, es given index pe agar same sign ho to  player win kar jata hain
const winningPosition=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

// in this function we add the functionalities which has initial when we start the game
 function intiGame(){// this is first step
    currentPlayer="X";
    newGameBtn.classList.remove("active");
    gameGrid=["","","","","","","","",""];

    // here we requird remove  signs from user interface also
    boxes.forEach((box,index)=>{
        box.innerText="";
        //here we add all properties of pinter cursor which we remove after click
        boxes[index].style.pointerEvents="all";
        // here we assign  css box properties to each box for remove green color
        box.classList=`box box${index+1}`;
    })
    gameInfo.innerText=`Current Player ${currentPlayer}`;
 }
 intiGame();

function switchTurn(){
    if(currentPlayer ==="X"){
        currentPlayer="0"
    }
    else{
        currentPlayer="X"
    }
    gameInfo.innerText=`Current Player ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";
    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]]!=="")&& (gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]]))
            {
            if(gameGrid[position[0]]==="X"){
                answer="x";
            }
            else{
                answer="0";
            }
            // agar winner mel gaya hain to all boxes ke property disable kardo
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            //when any of player win then we put green color as background
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    });
// here we gw=et a winner
if(answer !==""){
    gameInfo.innerText=`Winner is ${answer}`;
    newGameBtn.classList.add("active");
    return;
}

// this code run in case of draw match
let fillcount=0;
boxes.forEach((box,index)=>{
    if(gameGrid[index] !==""){
        fillcount++;
    }
});
if(fillcount ===9){
    gameInfo.innerText="game draw !!";
    newGameBtn.classList.add("active");
}
}


function handleClick(index){
    if(gameGrid[index] ===""){
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        // here we make pointer curser invisible when we go on the marked place
        boxes[index].style.pointerEvents="none";
        // this function is for the switching the palyer
        switchTurn();
        //ye function check karta hain ke koi win hogya ya nahi
        checkGameOver();
    }
}

 boxes.forEach((box,index)=> {// this is a second step
      box.addEventListener("click",()=>{
        handleClick(index);//jab jab hum kese box pe click karange tab tab ye wala function call hoga and
      })// sare ke sare conditaions check karega , jo function uper write keye gaye hain
 });

newGameBtn.addEventListener("click",intiGame);