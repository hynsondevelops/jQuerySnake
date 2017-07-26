var highScoreSession = 0
var speed = 100
var foodMultiplier = 2
var currentFoodPoints = 10
var score = 0
var speedMultiplier = 1.1
//var replay = false
var grid = new Array()
for (var i = 0; i < 40; i++)
{
	grid[i] = new Array()
	for (var j = 0; j < 40; j++)
	{
		grid[i][j] = " "
	}
}
grid[20][20] = "O"
var snake = new Array()
snake[0] = [20, 20]
var direction = 'r'

var food = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)] 
grid[food[0]][food[1]] = "F"
console.log("New food at " + food[0] + food[1])

var directionHistory = new Array()

var oldGrid = []


function currentSnake()
{
	for (var i = 0; i < 1600; i++)
	{
		console.log(snake[i])
	}
}
function render() 
{
	$("#snake").empty()
	$("#snake").append("<div id = 'scoreboard'> <h3 id = 'score'> Score: " + score + "</h3> <h3 id = 'highScore'> High Score This Session: " + highScoreSession + " </h3> </div>")
	for (var i = 0; i < 40; i++)
	{
		var rowID = "row" + i
		$("#snake").append("<div class = 'row' id = '" + rowID + "'>")
		for (var j = 0; j < 40; j++)
		{
			var colID = "col" + j
			var divString = "<div class = 'imageContainer' id = '" + colID + "'>"
			if (grid[i][j] == " ")
			{
				divString += "<img src= 'grass.png'>" //"<div class = 'grass'> </div>"
			}
			else if (grid[i][j] == "O") //snake
			{
				divString += "<img src= 'snake.png'>" //"<div class = 'snake'> </div>" 
			}
			else if (grid[i][j] == "F") //snake
			{
				divString += "<img src= 'apple.jpg'>" //"<div class = 'apple'> </div>"
			}
			divString += "</div>"
			$("#" + rowID).append(divString)
		}
	}
}

function updateRender()
{
	for (var i = 0; i < 40; i++)
	{
		var rowID = "row" + i
		for (var j = 0; j < 40; j++)
		{
			var colID = "col" + j
			if (grid[i][j] != oldGrid[i][j])
			{
				//console.log("HELLO")
				console.log("Grid: " + grid[i][j] + " Old: " + oldGrid[i][j])

				var old = "";
				var replacement = "";
				if (grid[i][j] == " ")
				{
					replacement = "grass.png" //"<div class = 'grass'> </div>"
				}
				else if (grid[i][j] == "O") //snake
				{
					replacement = "snake.png" //"<div class = 'snake'> </div>" 
				}
				else if (grid[i][j] == "F") //snake
				{
					replacement = "apple.jpg" 
				}
				if (oldGrid[i][j] == " ")
				{
					old = "grass.png" //"<div class = 'grass'> </div>"
				}
				else if (oldGrid[i][j] == "O") //snake
				{
					old = "snake.png" //"<div class = 'snake'> </div>" 
				}
				else if (oldGrid[i][j] == "F") //snake
				{
					old = "apple.jpg" 
				}
				console.log("#" + rowID + " #" + colID)
				$("#" + rowID + " #" + colID).html("<img src = '" + replacement + "'>")

			}
		}
	}
}

function keyPress()
{
	$(document).keydown( function(e) {
	  console.log("Event: " + e.which)
	  switch (e.which)
	  {
	  	case 37: //left arrow
	  		direction = 'l'
	  		break;
	  	case 38: //up arrow
	  		direction = 'u'
	  		break;
	  	case 39: //right arrow
	  		direction = 'r'
	  		break;
	  	case 40: //down arrow
	  		direction = 'd'
	  		break;	
	  }
	  console.log( "Key Pressed: " + direction );

	});
}


function snakeMoving()
{
	console.log("SNAKE MOVING")
	move()
}

function extendSnake()
{
	
}

function newFood()
{
	if (snake[0][0] == food[0] && snake[0][1] == food[1])
	{	
		food = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)] 
		grid[food[0]][food[1]] = "F"
		console.log("New food at " + food[0] + food[1])
		switch (directionHistory[directionHistory.length - snake.length])
		{
			case 'l': //left
				snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] + 1])		
				break;
			case 'u': //up
				snake.push([snake[snake.length - 1][0] + 1, snake[snake.length - 1][1]])		

				break;
			case 'r': //right
				snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1] - 1])		

				break;
			case 'd': //down
				snake.push([snake[snake.length - 1][0] - 1, snake[snake.length - 1][1]])		
				break;
		}
		score += currentFoodPoints
		currentFoodPoints *= foodMultiplier
		speed /= speedMultiplier //speed is really the time in ms
		if (score > highScoreSession)
		{
			highScoreSession = score
			$("#snake #scoreboard #highScore").html("High Score This Session: " + highScoreSession)
		}
		$("#snake #scoreboard #score").html("Score: " + score)
	}	
}

function generateMove()
{
	var dir = Math.floor(Math.random() * 4)
	switch (dir)
	{
		case(0):
			direction = 'l'
	  		break;
		case(1):
			direction = 'u'
			break;
		case(2):
			direction = 'r'
			break;
		case(3):
			direction = 'd'
			break;
	}
}


function checkCollision()
{
	for (var i = 0; i < snake.length; i++) 
	{ 
		for (var j = i + 1; j < snake.length; j++) 
		{
			if (snake[i][0] == snake[j][0] && snake[i][1] == snake[j][1]) //collision
			{
				return true;
			}
		}
	}
	return false;
}

function move()
{
	oldGrid = new Array()
	for (var i = 0; i < 40; i++)
	{
		oldGrid[i] = new Array()
		for (var j = 0; j < 40; j++)
		{
			oldGrid[i][j] = grid[i][j]
		}
	}

	//generateMove()
	for (var i = 0; i < snake.length; i++)
	{
		grid[snake[i][0]][snake[i][1]] = " "
	}


	directionHistory.push(direction)
	for (var i = 0; i < snake.length; i++)
	{
		switch(directionHistory[directionHistory.length - 1 - i])
		{
			case 'l': //left
				snake[i][1] = snake[i][1] - 1
				break;
			case 'u': //up
				snake[i][0] = snake[i][0] - 1
				break;
			case 'r': //right
				snake[i][1] = snake[i][1] + 1
				break;
			case 'd': //down
				snake[i][0] = snake[i][0] + 1
				break;
		}
	}
	/*switch(direction)
	{
		case 'l': //left
			for (var i = 0; i < snake.length; i++)
			{
				snake[i][1] = snake[i][1] - 1
			}
			break;
		case 'u': //up
			for (var i = 0; i < snake.length; i++)
			{
				snake[i][0] = snake[i][0] - 1
			}
			break;
		case 'r': //right
			for (var i = 0; i < snake.length; i++)
			{
				snake[i][1] = snake[i][1] + 1
			}
			break;
		case 'd': //down
			for (var i = 0; i < snake.length; i++)
			{
				snake[i][0] = snake[i][0] + 1
			}
			break;
	}
*/
	newFood() // also grows snake	
	if (snake[0][0] < 0 || snake[0][0] > 39 || snake[0][1] < 0 || snake[0][1] > 39 || checkCollision())
	{
		alert("Game Over.\nScore:" + score)
		$("#snake").empty()
		grid[20][20] = "O"
		snake = []
		snake[0] = [20, 20]
		currentFoodPoints = 10
		score = 0
		speed = 100
		render()
		setTimeout(function(){ move() }, speed); 
	}
	else 
	{
		//oldGrid = grid;
		for (var i = 0; i < snake.length; i++)
		{
			grid[snake[i][0]][snake[i][1]] = "O"
			//console.log("Snake extended at " +  i)
		}
		updateRender()
		setTimeout(function(){ move() }, speed); 
	}
}



$( document ).ready(function() {
	if (grid[20][20] == "O")
	{
		console.log("Correct")
	}
	keyPress()
	render()
	move()
	//currentSnake()
});
