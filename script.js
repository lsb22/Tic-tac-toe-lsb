const xClass = "x"
const circleClass = "circle"
const allCells = document.querySelectorAll("[data-cell]")
const board = document.querySelector(".whole")
const pop_message = document.querySelector("[data-winning-message-text]")
const show_res= document.getElementById("win-mess")
const button = document.getElementById("reset-button")
const winCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
let circleTurn

startGame()

button.addEventListener("click",startGame)

function startGame(){
  circleTurn = false
  allCells.forEach(cell=>{
    cell.classList.remove(xClass)
    cell.classList.remove(circleClass)
    cell.removeEventListener("click",on_Click)
    cell.addEventListener("click",on_Click,{once:true})
  })
  show_res.classList.remove('show')
  //setHover()
}
function on_Click(e){
 const clickedcell = e.target
 const currClass = circleTurn? circleClass:xClass 
 placeMark(clickedcell,currClass)
 if(checkWin(currClass)){
    endgame(false)
  }else if(isDraw()){
   endgame(true)
  }
 changeTurn()
 //setHover()


}

function placeMark(clickedcell,currClass){
    clickedcell.classList.add(currClass)
}

function changeTurn(){
  circleTurn = !circleTurn
}

function isDraw(){
  return [...allCells].every(cell=>{
    return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
  })
}

function endgame(draw){
   if(draw){
     pop_message.innerText = "draw"
   }else{
     pop_message.innerText = `${circleTurn? "O's":"X's"} Wins!!!`

   }
  show_res.classList.add('show')
}

/*function setHover(){
  board.classList.remove(xClass)
  board.classlist.remove(circleClass)
  if(circleTurn){
    board.classList.add(circleClass)
   }else{
    board.classList.add(xClass)
   }
}*/

function checkWin(currClass){
  return winCombinations.some(combinations => {
    return combinations.every(index => {
      return allCells[index].classList.contains(currClass)
    })
  })
}