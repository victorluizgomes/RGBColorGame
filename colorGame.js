var numSquares = 6;
var colors = [];
var pickedColor;
var scoreCount = 0;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var score = document.getElementById("score");
var messegeDisplay = document.querySelector("#messege");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var resetScoreButton = document.querySelector("#resetScore");

init();

function init(){
	
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			if(this.textContent === "Easy"){
				numSquares = 3;
			}else if(this.textContent === "Hard"){
				numSquares = 6;
			}else{
				numSquares = 12;
			}

			reset();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
		// add initial colors
		squares[i].style.backgroundColor = colors[i];

		// click listeners
		squares[i].addEventListener("click", function(){
			var colorClicked = this.style.backgroundColor;
			if(colorClicked === pickedColor){
				messegeDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				// if statement so when all the colors are the same it doesnt count extra score
				if(squares[0].style.backgroundColor !== squares[1].style.backgroundColor &&
					squares[0].style.backgroundColor !== squares[2].style.backgroundColor){
					scoreCount = scoreCount + 1;
					score.textContent = scoreCount;
				}
				changeColors(colorClicked);
				h1.style.backgroundColor = colorClicked;
				
			}else{
				this.style.backgroundColor = "#232323";
				messegeDisplay.textContent = "Try Again";
				scoreCount = scoreCount - 1;
				score.textContent = scoreCount;
			}
		});	
	}
}

function reset(){
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";

	// change color of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}	
	}
	h1.style.backgroundColor = "steelblue";
	messegeDisplay.textContent = "";
}

// when clicked on new colors or play again? button
resetButton.addEventListener("click", function(){
	reset();
});

// when clicked on reset score button
resetScoreButton.addEventListener("click", function(){
	reset();
	resetScore();
});

function resetScore(){
	scoreCount = 0;
	score.textContent = 0;
}

function changeColors(color){
	// loop through all squares
	// change each color to match given color
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	// make an array
	var arr = [];
	// add num random colors to array
	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	// return that array 
	return arr;
}

function randomColor(){
	// builds a string that randomly picks a number for red green and blue that goes from 0-255
	var rgbRandomColor = "rgb(" + Math.floor(Math.random() * 256) + ", " +
								Math.floor(Math.random() * 256) + ", " + 
								Math.floor(Math.random() * 256) + ")"; 
	return rgbRandomColor;
}
