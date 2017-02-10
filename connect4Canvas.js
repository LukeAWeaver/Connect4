


	// The code in this section was written by Thomas Doty and Luke Weaver
//---------------------------------------------------------------------------------------------------------------------------------------
{

	// object variable and necessary properties
	var connect4 = {};
  var gameOver = false;
	connect4.currentState = [];
	connect4.turn = 1;
	connect4.pickedColumn;


		// initializes the game board
	for (var A = 0 ; A < 42 ; A++) {
		connect4.currentState.push(-1);
	}

		// The do-while loop runs until there is a winner or until the board is filled.
	connect4.game = function() {


				// adds the shape in the appropriate column for the user
			if((this.turn % 2) != 0)
			{

					this.turn = this.turn + 1;

	    		currentDropColumn = this.requestUserColumn();

					if(currentDropColumn == 0)
						{
							connect4.AddShape(0, 1);
						}
						else if (currentDropColumn == 1)
						{
							connect4.AddShape(1, 1);
						}
						else if (currentDropColumn == 2)
						{
							connect4.AddShape(2, 1);
						}
						else if (currentDropColumn == 3)
						{
							connect4.AddShape(3, 1);
						}
						else if (currentDropColumn == 4)
						{
							connect4.AddShape(4, 1);
						}
						else if (currentDropColumn == 5)
						{
							connect4.AddShape(5, 1);
						}
						else if (currentDropColumn == 6)
						{
							connect4.AddShape(6, 1);
						}
			}

				// adds the shape in the appropriate column for the AI opponent
						if((this.turn % 2) == 0) {

				this.turn = this.turn + 1;

				currentDropColumn = this.AI();

				if(currentDropColumn == 0)
				{
					connect4.AddShape(0, 2);
				}
				else if (currentDropColumn == 1)
				{
					connect4.AddShape(1, 2);
				}
				else if (currentDropColumn == 2)
				{
					connect4.AddShape(2, 2);
				}
				else if (currentDropColumn == 3)
				{
					connect4.AddShape(3, 2);
				}
				else if (currentDropColumn == 4)
				{
				connect4.AddShape(4, 2);
				}
				else if (currentDropColumn == 5)
				{
					connect4.AddShape(5, 2);
				}
				else if (currentDropColumn == 6)
				{
					connect4.AddShape(6, 2);
				}
			}


				// draws the game board with each column selection from the user and from the AI
	                draw();
									dropColumn = -1;




			// outputs the result of the game
if(this.checkForWinner() == 1 || this.checkForWinner() == 2)
{
	if(this.checkForWinner() == 1)
	{
		alert("The User wins");
		userScore++;
	}
	else if(this.checkForWinner() == 2)
	{
		alert("The Computer wins");
		computerScore++;
	}
	else
	{
		alert("No Winner");
	}

	stopSim = true;
}

	}

	connect4.AddShape = function(currColumn, playerID) {

		if (currColumn < 0 || currColumn > 6) {return false;}

		if (playerID != 1 && playerID !=2) {return false;}

		if (this.currentState[currColumn] != -1) {return false;}

	 	for(i = 5; i > -1; i--) {

			pos = (i * 7) + currColumn;

		    if (this.currentState[pos] == -1) {
	            this.currentState[pos] = playerID;
	            return true;
	        }
		}

		return false;
	}

	connect4.boardFull = function() {

		if((this.currentState.indexOf(-1,0)) == -1)
		{
			return true;
		}
		else if((this.currentState.indexOf(-1,0)) != -1)
		{
			return false;
		}
	}

	connect4.checkForWinner = function() {

		for(i = 0; i < 42; i++) {

			if((this.currentState[i]    == 1) &&   			//Four to right
			   (this.currentState[i+1]  == 1) &&
			   (this.currentState[i+2]  == 1) &&
			   (this.currentState[i+3]  == 1)) {
				if( i == 4  || i == 5  || i == 6  ||
					i == 11 || i == 12 || i == 13 ||
					i == 18 || i == 19 || i == 20 ||
					i == 25 || i == 26 || i == 27 ||
					i == 32 || i == 33 || i == 34 ||
					i == 39 || i == 40 || i == 41) {
					break;
				}
				return 1;

			}
			else if((this.currentState[i] == 1) && 		//Four up
			   (this.currentState[i+7]    == 1) &&
			   (this.currentState[i+14]   == 1) &&
			   (this.currentState[i+21]   == 1)) {

				return 1;

			}
			else if((this.currentState[i] == 1) &&
			   (this.currentState[i+8]    == 1) &&
			   (this.currentState[i+16]   == 1) &&
			   (this.currentState[i+24]   == 1)) {

				if( i > 20  || i == 18 || i == 4  || i == 5  || i == 6 ||
	      	        i == 11 || i == 12 || i == 13 || i == 19 || i == 20 ) {
					break;
				}
				return 1;
			}
			else if((this.currentState[i]      == 1) &&
			       (this.currentState[i+6]     == 1) &&
			       (this.currentState[i+12]    == 1) &&
			       (this.currentState[i+18]    == 1)) {

					if( i > 20 || i == 14 || i == 0 || i == 1  || i == 2 ||
	      	            i == 7 || i == 8  || i == 9 || i == 15 || i == 16 ) {
						break;
					}
				return 1;

			}

			if((this.currentState[i]    == 2) &&   			//Four to right
			   (this.currentState[i+1]  == 2) &&
			   (this.currentState[i+2]  == 2) &&
			   (this.currentState[i+3]  == 2)) {

				if( i == 4  || i == 5  || i == 6  ||
					i == 11 || i == 12 || i == 13 ||
					i == 18 || i == 19 || i == 20 ||
					i == 25 || i == 26 || i == 27 ||
					i == 32 || i == 33 || i == 34 ||
					i == 39 || i == 40 || i == 41) {
					break;
				}
				return 2;

			}
			else if((this.currentState[i] == 2) && 		//Four up
			   (this.currentState[i+7]    == 2) &&
			   (this.currentState[i+14]   == 2) &&
			   (this.currentState[i+21]   == 2)) {

				return 2;

			}
			else if((this.currentState[i]    == 2) &&
			        (this.currentState[i+8]  == 2) &&
			        (this.currentState[i+16] == 2) &&
			        (this.currentState[i+24] == 2)) {

					if( i > 20  || i == 18 || i == 4  || i == 5  || i == 6 ||
	      	            i == 11 || i == 12 || i == 13 || i == 19 || i == 20 ) {
					    break;
					}
				return 2;

			}
			else if((this.currentState[i]    == 2) &&
			        (this.currentState[i+6]  == 2) &&
			        (this.currentState[i+12] == 2) &&
			        (this.currentState[i+18] == 2)) {
				    if( i > 20 || i == 14 || i == 0 || i == 1  || i == 2 ||
	      	            i == 7 || i == 8  || i == 9 || i == 15 || i == 16 ) {
					    break;
					}
				return 2;

			}
		}
		return 0;
	}

		// asks for the user's input in choosing the column
	connect4.requestUserColumn= function()  //RETURNS # 0-6
	{
		var column = dropColumn;
		return column;
	}


	connect4.AI= function()  //RETURNS a number between 0-6 (inclusive)
	{
	          for(var i = 0; i<42; i++) //This will allow the AI to traverse the board and  AI
	          {

	               currentColumn = i%7;
	          if(this.currentState[currentColumn] != -1)
	               {
	           break;
	               }    //0 == player && 1 == AI

	               if(currentColumn>=3 &&
	                this.currentState[i] ==-1   &&
	                this.currentState[i-1] ==2 &&
	                this.currentState[i-2] ==2
	                && this.currentState[i-3] == 2) //XXX_
	               {
	                return currentColumn;
	              }

	              else if(currentColumn<=3 &&
	               this.currentState[i] ==-1   &&
	               this.currentState[i+1] ==2 &&
	               this.currentState[i+2] ==2
	               && this.currentState[i+3] == 2) //_XXX
	              {
	               return currentColumn;
	              }
	               else if(currentColumn>=2 &&
	                this.currentState[i] ==-1   &&
	                this.currentState[i+1] ==2 &&
	                this.currentState[i-1] ==2
	                && this.currentState[i-2] == 2) //XX_X
	               {
	                return currentColumn;
	               }
	               else if(currentColumn>=1 &&
	                this.currentState[i] ==-1   &&
	                this.currentState[i+1] ==2 &&
	                this.currentState[i+2] ==2
	                && this.currentState[i-1] == 2) //X_XX
	               {
	                return currentColumn;
	               }
	               else if(
	                this.currentState[i] == -1 && //     _
	                this.currentState[i+7] == 2 &&//    X
	                this.currentState[i+14] ==2   //    X
	                && this.currentState[i+21] == 2)  //X
	               {
	                return currentColumn;
	               }
	               else if(currentColumn>=3 &&
	                this.currentState[i] == -1 &&   //         _
	                this.currentState[i+6] == 2 &&  //      X
	                this.currentState[i+12] ==2     //     X
	                && this.currentState[i+18] == 2
	              && this.currentState[i+7]!=-1)   //X
	               {
	                return currentColumn;
	               }
	               else if( currentColumn>=2 &&currentColumn<=5 &&
	                this.currentState[i-6] == 2 && //      X
	                this.currentState[i] == -1 &&//       _
	                this.currentState[i+6] ==2      //  X
	                && this.currentState[i+12] == 2
	              && this.currentState[i+7]!=-1) //X
	               {
	                return currentColumn;
	               }
	               else if(currentColumn>=1 && currentColumn<=4 &&
	                this.currentState[i-12] == 2 && //         X
	                this.currentState[i-6] == 2 &&//         X
	                this.currentState[i] ==-1   //          _
	                && this.currentState[i+6] == 2
	              && this.currentState[i+7]!=-1)  // X
	               {
	                return currentColumn;
	               }
	               else if(currentColumn<=3 &&
	                this.currentState[i-18] == 2 &&   //           X
	                this.currentState[i-12] == 2 &&   // X
	                this.currentState[i-6] ==2      // X
	                && this.currentState[i] == -1)     // _
	               {
	                return currentColumn;
	               }
	               else if(  currentColumn<=3 &&
	                this.currentState[i] == -1 && //_
	                this.currentState[i+8] == 2 &&// X
	                this.currentState[i+16] ==2   //  X
	                && this.currentState[i+24] == 2
	              && this.currentState[i+7]!=-1)  //   X
	               {
	                return currentColumn;
	               }
	               else if(currentColumn<=1 && currentColumn<=4 &&
	                this.currentState[i-8] == 2 && //X
	                this.currentState[i] == -1 &&//     _
	                this.currentState[i+8] ==2   //     X
	                && this.currentState[i+16] == 2
	              && this.currentState[i+7]!=-1)  //     X
	               {
	                return currentColumn;
	               }
	               else if( currentColumn<=2 && currentColumn<=5 &&
	                this.currentState[i-16] == 2 && //X
	                this.currentState[i-8] == 2 &&//    X
	                this.currentState[i] ==-1   //        _
	                && this.currentState[i+8] == 2
	              && this.currentState[i+7]!=-1)  //       X
	               {
	                return currentColumn;
	               }
	               else if( currentColumn<=3 &&
	                this.currentState[i-24] == 2 && //X
	                this.currentState[i-16] == 2 &&//    X
	                this.currentState[i-8] ==2   //        X
	                && this.currentState[i] == -1)  //       _
	               {
	                return currentColumn;
	               }

		       // END AI WINNING SITUATIONS
		       //START PLAYER BLOCKING SITUATIONS
	              else if(currentColumn>=3 &&
		           this.currentState[i]   == -1 &&
		           this.currentState[i-1] == 1  &&
		           this.currentState[i-2] == 1  &&
		           this.currentState[i-3] == 1) //000_
		          {
		           return currentColumn;
		          }
		          else if(currentColumn<=3 &&
		        this.currentState[i]   == -1 &&
		        this.currentState[i+1] == 1  &&
		        this.currentState[i+2] == 1  &&
		        this.currentState[i+3] == 1) //_000
		        {
		        return currentColumn;
		        }

		          else if(currentColumn>=2 &&
		           this.currentState[i] ==-1   &&
		           this.currentState[i+1] ==1 &&
		           this.currentState[i-1] ==1
		           && this.currentState[i-2] == 1) //00_0
		          {
		           return currentColumn;
		          }

		          else if(currentColumn>=1 &&
		           this.currentState[i] ==-1   &&
		           this.currentState[i+1] ==1 &&
		           this.currentState[i+2] ==1
		           && this.currentState[i-1] == 1) //0_00
		          {
		           return currentColumn;
		          }

		          else if(
		           this.currentState[i] == -1 &&   //  _
		           this.currentState[i+7] == 1 &&  // 0
		           this.currentState[i+14] ==1     // 0
		           && this.currentState[i+21] == 1) //0
		          {
		           return currentColumn;
		          }

		          else if(currentColumn>=3 &&
		           this.currentState[i] == -1 &&   //        _
		           this.currentState[i+6] == 1 &&  //     0
		           this.currentState[i+12] ==1     //    0
		           && this.currentState[i+18] == 1
		          && this.currentState[i+7]!=-1)  //0
		          {
		           return currentColumn;
		          }

		          else if(currentColumn>=2 && currentColumn<=5 &&
		           this.currentState[i-6] == 1 && //       0
		           this.currentState[i] == -1 &&//        _
		           this.currentState[i+6] ==1   //     0
		           && this.currentState[i+12] == 1
		         && this.currentState[i+7]!=-1) //0
		          {
		           return currentColumn;
		          }
		          else if(currentColumn>=1 && currentColumn<=4 &&
		           this.currentState[i-12] == 1 && //        0
		           this.currentState[i-6] == 1 &&//        0
		           this.currentState[i] ==-1   //         _
		           && this.currentState[i+6] == 1
		         && this.currentState[i+7]!=-1)  // 0
		          {
		           return currentColumn;
		          }

		          else if( currentColumn<=3 &&
		           this.currentState[i-18] == 1 && //    0
		           this.currentState[i-12] == 1 &&//    0
		           this.currentState[i-6] ==1   //    0
		           && this.currentState[i] == -1)  // _
		          {
		           return currentColumn;
		          }

		          else if( currentColumn<=3 &&
		           this.currentState[i] == -1 && //_
		           this.currentState[i+8] == 1 &&// 0
		           this.currentState[i+16] ==1   //  0
		           && this.currentState[i+24] == 1
		         && this.currentState[i+7]!=-1)  //   0
		          {
		           return currentColumn;
		          }

		          else if(currentColumn<=1 && currentColumn<=4 &&
		           this.currentState[i-8] == 1 && //0
		           this.currentState[i] == -1 &&//     _
		           this.currentState[i+8] ==1   //     0
		           && this.currentState[i+16] == 1
		         && this.currentState[i+7]!=-1)  //     0
		          {
		           return currentColumn;
		          }
		          else if(currentColumn<=2 && currentColumn<=5 &&
		           this.currentState[i-16] ==1 && //0
		           this.currentState[i-8] == 1 &&//    0
		           this.currentState[i] ==-1   //        _
		           && this.currentState[i+8] == 1
		         && this.currentState[i+7]!=-1)  //       0
		          {
		           return currentColumn;
		          }

		          else if( currentColumn<=3 &&
		           this.currentState[i-24] == 1 && //0
		           this.currentState[i-16] == 1 &&//    0
		           this.currentState[i-8] ==1   //        0
		           && this.currentState[i] == -1)  //         _
		          {
		           return currentColumn;
		          }
	         	}


			//END PLAYER BLOCKING SITUATIONS

	         var randomColumn = Math.floor(Math.random()*7);
	         if(connect4.currentState[randomColumn] != -1)
	         {
	          for(i=0; i<7; i++)
	          {
	           if(connect4.currentState[i] == -1)
	           {
	            return i;
	           }
	          }

	         }
	        return randomColumn; // _ _ _ _ _ _ _ returns a random column number.

	}


}


//---------------------------------------------------------------------------------------------------------------------------------------
	// end of game code section









var userScore = 0;
var computerScore = 0;



        // All code in the section below was originally provided by Dain Vermaak and modified by James Muoghalu for the uses of this project.
	// Date: 5/4/16
//------------------------------------------------------------------------------------------------------------
var gShapeIdCounter = 0;

function AddToConsole(/*String*/ toWrite)
{
	$('#textarea-console').append(toWrite + "\n");
	var textarea = document.getElementById('textarea-console');
	textarea.scrollTop = textarea.scrollHeight;
}


// fills each player's shape with the correct color, and fills the empty locations with the color "black"
function getShapeColor(type)
{

        if(type == 1)
	{
		return 'blue';
	}
	else if(type == 2)
	{
		return 'red';
	}
	else
	{
		return 'black';
	}

}

//-------------------------------------------------------------------------
// base helper methods
//-------------------------------------------------------------------------
function get(id)        { return document.getElementById(id);  }
function hide(id)       { get(id).style.visibility = 'hidden'; }
function show(id)       { get(id).style.visibility = null;     }
function html(id, html) { get(id).innerHTML = html;            }
function timestamp()           { return new Date().getTime();                             }
function random(min, max)      { return (min + (Math.random() * (max - min)));            }
function randomChoice(choices) { return choices[Math.round(random(0, choices.length-1))]; }
if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
                                 window.mozRequestAnimationFrame    ||
                                 window.oRequestAnimationFrame      ||
                                 window.msRequestAnimationFrame     ||
                                 function(callback, element) {
                                   window.setTimeout(callback, 1000 / 60);
                                 }
}
//-------------------------------------------------------------------------
// game constants
//-------------------------------------------------------------------------
var KEY     = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 },
    DIR     = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3, MIN: 0, MAX: 3 },
    stats   = new Stats(),
    canvas  = get('canvas'),
    ctx     = canvas.getContext('2d'),
    ucanvas = get('upcoming'),
    speed   = { start: 0.6, decrement: 0.0001, min: 0.1 }, // how long before piece drops by 1 row (seconds)
    nx      = 14, // width of game display (in blocks)
    ny      = 12, // height of game display (in blocks)
    nu      = 5;  // width/height of upcoming preview (in blocks)

//-------------------------------------------------------------------------
// game variables (initialized during reset)
//-------------------------------------------------------------------------
var dx, dy,        // pixel size of a single game block
    blocks,        // 2 dimensional array (nx*ny) representing game court - either empty block or occupied by a 'piece'
    actions,       // queue of user actions (inputs)
    playing,       // true|false - game is in progress
    dt;            // time since starting this game


//-------------------------------------------------------------------------
// VERIFICATION
//-------------------------------------------------------------------------
// Verification Variables
var gCodeChanged = true;
var gIsVerified = false;
var gIsRunning = false;
var gSequence = '';
var gShapes = [];
var gPositions = [];
var gPositionMarker = 0;

function verifyInitialFunctionality()
{
	if(gCodeChanged)
        {
		gCodeChanged = false;
		gIsVerified = true;
		if(typeof connect4 === 'undefined' || connect4 === null)
                {
			AddToConsole("No connect4 object!");
			gIsVerified = false;
		}
                else
                {

			if(typeof connect4.game !== 'function' || connect4.game === null)
                        {
				AddToConsole("connect4 object is missing an game method!");
				gIsVerified = false;
			}
		}
		if(gIsVerified)
		{
			AddToConsole("------------------------------------");
			AddToConsole("Game is Ready");
			gIsVerified = true;
			playing = true;
			reset();
			gIsRunning = true;
			step = $('#option-speed').val();
			gShapes = [];
			gPositions = [];
		}
	}
	return gIsVerified;
}

//-------------------------------------------------------------------------
// GAME LOOP
//-------------------------------------------------------------------------
var last;
var stopSim = false;
var pauseSim = false;
var currentMode = 'display';

function frame() {
	if(!stopSim)
        {
		if(currentMode == 'display')
                {
			if(!pauseSim)
                        {
				frameDisplay();
			}
		}
                else
                {
			frameTestStart();
		}
		requestAnimationFrame(frame, canvas);
	}

		// displays the game score for completed games
        else if(stopSim && gameOverPrint % 2 == 0)
        {
		AddToConsole(" ");
		AddToConsole("Game Over...");
		AddToConsole("User Score:         " + userScore);
		AddToConsole("Computer Score: " + computerScore);
		AddToConsole("------------------------------------");
		gameOverPrint = 1;

	}
}

function run()
{
          last = now = timestamp();

          resize(); // setup all our sizing information
          reset();  // reset the per-game variables
          frame();  // start the first frame
}

function frameDisplay()
{
	if(verifyInitialFunctionality())
        {
		now = timestamp();
		update(Math.min(1, (now - last) / 1000.0));
		draw();
	}
}

function frameTestStart()
{
	if(!gTestBegun)
        {
  		if(verifyInitialFunctionality())
                {
  			BeginTesting();
  		}
	}
}


function stop()
{
	stopSim = true;
}

function pause()
{
	pauseSim = !pauseSim;
}




	// canvas size was changed for the game board
function resize(event)
{
        canvas.width   = 1.4*canvas.clientWidth;  // set canvas logical size equal to its physical size
        canvas.height  = 0.86*canvas.clientWidth; // (ditto)
        dx = canvas.width  / nx; // pixel size of a single game block
        dy = canvas.height / ny; // (ditto)
        invalidate();
        invalidateNext();
}





//-------------------------------------------------------------------------
// GAME LOGIC
//-------------------------------------------------------------------------
function play() { hide('start'); reset();          playing = true;  }
function lose() { show('start'); setVisualScore(); playing = false; }
function getBlock(x,y)          { return (blocks && blocks[x] ? blocks[x][y] : null); }
function setBlock(x,y,type)     { blocks[x] = blocks[x] || []; blocks[x][y] = type; invalidate(); }
function clearBlocks()          { blocks = []; invalidate(); }
function clearActions()         { actions = []; }

function reset()
{
        dt = 0;
        clearBlocks();
}

	// modified to run the connect4 method
function update(idt)
{

        if(!gIsRunning)
        {
        	return;
        }

	if(dropColumn== -1)
	{
		return;
	}
		// calls the game function for user interaction
	connect4.game();

	dt = dt + idt;


}

//-------------------------------------------------------------------------
// RENDERING
//-------------------------------------------------------------------------
var invalid = {};
function invalidate()         { invalid.court  = true; }
function invalidateNext()     { invalid.next   = true; }
function invalidateScore()    { invalid.score  = true; }
function invalidateRows()     { invalid.rows   = true; }

function drawCourt()
{
        if (invalid.court)
        {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var x, y, block;
                for(y = 0 ; y < ny ; y++)
                {
                        for (x = 0 ; x < nx ; x++)
                        {
                                if (block = getBlock(x,y))
                                {
                                        drawBlock(ctx, x, y, block.color);
                                }
                        }
                        ctx.strokeRect(0, 0, nx*dx - 1, ny*dy - 1); // court boundary
                        invalid.court = false;
                }
        }
}


	// spreads the game board so that the 42 circles will appear symmetrically in the canvas
function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.lineWidth = 20;
	ctx.translate(0.5,0.5); // for crisp 1px black lines
	drawCourt();
	ctx.restore();
	var pCurrentState = connect4.currentState;

	var A = 0;
	var B = 0;
	for(var j = 1; j <= 11; j+=2)
	{
		A = 0;
		for(var i = 1; i <= 13; i+=2)
		{
			drawBlock(ctx, i, j, getShapeColor( pCurrentState[(B*7) + A] ) );
			A++;
		}
		B++;
	}
	B = 0;
}


	// method changed to draw circles instead of square blocks
function drawBlock(ctx, x, y, color)
{
  ctx.beginPath();
  ctx.arc(x*dx,y*dy,28,0*Math.PI,2*Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();

}




//-------------------------------------------------------------------------
// FINALLY, lets run the game
//-------------------------------------------------------------------------
run();

//------------------------------------------------------------------------------------------------------------
	// end of canvas code section
