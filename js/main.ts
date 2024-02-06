//gmae constants
let inputDir = {x:0, y:0};
const backgroundSound = new Audio('audio/background audio.mp3');
const moveSound = new Audio('audio/snakemove.mp3');
const foodSound = new Audio('audio/foodeat.mp3');
const gameoverSound = new Audio('audio/gameover.mp3');
let speed= 5;
let score = 0;
let lastPainTime = 0;
const boardElemnt = document.querySelector('#board') as HTMLElement;

let snakeArr =[
    {x:12 , y:15}
]
let food = {x:3 , y:7};




//game functions
function main(currtime:any){
    window.requestAnimationFrame(main);
    if((currtime - lastPainTime)/1000 < 1/speed){
        return;
    }
    lastPainTime=currtime;
    gameEngine();
    
}
//game modes
let easy = document.getElementById('btn1') as HTMLElement;
let medium = document.getElementById('btn2') as HTMLElement;
let hard = document.getElementById('btn3') as HTMLElement;

easy.addEventListener("click",()=>{
     speed = 5;
});
medium.addEventListener("click",()=>{
    speed = 9;
});
hard.addEventListener("click",()=>{
    speed = 19;
});
function isCollide( snake: { x: number; y: number }[]): boolean | undefined {
    // if collided with its body
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // when collided with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}



function gameEngine(){
    //update snake array & food
    if(isCollide( snakeArr )){
        gameoverSound.play();
        backgroundSound.pause();
        moveSound.pause();
        inputDir = {x:0 ,y:0};
        alert('Game Over! press any key to play again.');
        snakeArr = [{x:12 , y:15}];
        moveSound.play();
        backgroundSound.play();
        score = 0;

    };
    // if eaten foog , increment snake and generate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        let scoreCard = document.getElementById('score') as HTMLElement;
        scoreCard.innerHTML= 'Score:' + `${score}`;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random()) }

    }
    //moving snake
    for(let i = snakeArr.length -2; i>=0; i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //display snake & food
    boardElemnt.innerHTML= "";
    //display snake
   
    snakeArr.forEach((e , index)=>{
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = `${e.y}`;
        snakeElement.style.gridColumnStart = `${e.x}`;
       
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        
        boardElemnt.appendChild(snakeElement);
    });

        //display food
    
    
        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = `${food.y}`;
        foodElement.style.gridColumnStart = `${food.x}`;
        foodElement.classList.add('food');
        boardElemnt.appendChild(foodElement);
    

   
    
}


















//game logics
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    //start game
    backgroundSound.play();
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            case 'ArrowDown':
            console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
            case 'ArrowLeft':
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
            case 'ArrowRight':
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})
