// Constructed from https://github.com/jakesgordon/javascript-tetris
// Date: 3/18/2016

// Used to create a unique id per shape
var gShapeIdCounter = 0;

function AddToConsole(/*String*/ toWrite){
	$('#textarea-console').append(toWrite + "\n");
	var textarea = document.getElementById('textarea-console');
	textarea.scrollTop = textarea.scrollHeight;
}

//-------------------------------------------------------------------------
// shape options
//-------------------------------------------------------------------------
function getShapeColor(type){
	if(type == 0){
		return 'blue';
	}else if(type == 1){
		return 'orange';
	}else if(type == 2){
		return 'cyan';
	}else if(type == 3){
		return 'green';
	}else if(type == 4){
		return 'black';
	}else if(type == 5){
		return 'purple';
	}else if(type == 6){
		return 'yellow';
	}
}

// Source: http://stackoverflow.com/questions/20817618/is-there-a-splice-method-for-strings
function spliceSlice(str, index, count, add) {
	var pFront = ((index > 0) ? str.slice(0, index) : "");
	var pAdd = (add || "");
	var pEnd = str.slice(index + count);
  	return  pFront + pAdd + pEnd;
}

// Returns remaining sequence
function recoverTwoDigitArrayFromSequence(sequence, numDigits, twoDigitArray){
	var shrinkingSeq = sequence;
	for(var s = 0; s < (numDigits*2); s += 2){
		twoDigitArray.push(Number(shrinkingSeq[s]+shrinkingSeq[s+1]));
	}
	return spliceSlice(shrinkingSeq,0,numDigits*2,"");
}

function generateRandomPositions(sequence){
	var pPositionOffsets = [];
	var pShapeType = null;
	var pMaxPosition = null;
	var pPositionCounter = null;

	var pSequence = recoverTwoDigitArrayFromSequence(sequence,51,pPositionOffsets);

	// At this point the pSequence variable contains only position digits
	// between 0 and 90
	gPositionMarker += pPositionOffsets.shift();
	pPositionCounter = 0;
	for(var s = 0; s < gShapes.length; s++){
		pShapeType = gShapes[s];
		pMaxPosition = getMaxPosition(pShapeType);

		gPositionMarker += pPositionOffsets[pPositionCounter];
		pPositionCounter += 1;
		if(pPositionCounter >= pPositionOffsets.length){
			pPositionCounter = 0;
		}

		while(gPositionMarker > pMaxPosition){
			gPositionMarker -= pMaxPosition + 1;
		}

		if(gPositionMarker > 8){
			throw "Error! position should never be more than 8";
		}

		if(gPositionMarker == 0){
			gPositions.push(gPositionMarker);
			continue;
		}

		gPositions.push(gPositionMarker);
	}

	// Verify positions
	for(var s = 0; s < gShapes.length; s++){
		pShapeType = gShapes[s];
		pMaxPosition = getMaxPosition(pShapeType);
		if(gPositions[s] > pMaxPosition){
			throw "Error! Shape {" + s + "} has max position = {" + pMaxPosition + "} but position {" + s + "} is {" + gPositions[s] + "} which is too big.";
		}
	}
	return pSequence;
}

function generateRandomShapes(sequence){
	var pSwapSequence = [];
	var pNumDigits = 70;
	var pNewSequence = null;

	pNewSequence = recoverTwoDigitArrayFromSequence(sequence,pNumDigits,pSwapSequence);

	for(var i = 0; i < 10; i++){
		for(var s = 0; s < 7; s++){
			gShapes.push(s);
		}
	}

	// Shuffle
	var temp = 0;
	for(var s = 0; s < pSwapSequence.length; s++){
		temp = gShapes[s];
		gShapes[s] = gShapes[pSwapSequence[s]];
		gShapes[pSwapSequence[s]] = temp;
	}

	generateRandomPositions(pNewSequence);
}

function generateRandomSequence(){
	// Generate Sequence
	var sequence = "";
	var sequencemax = 10*7;

	// Generate shape types
	for(var i = 0; i < sequencemax; i++){
		var swapIndex = Math.floor((Math.random() * sequencemax));
		if(swapIndex < 10){
			sequence += 0;
		}
		sequence += swapIndex;
	}


	// Generate initial position
	var initialPos = Math.floor(Math.random() * 90);
	sequence += ((initialPos < 10) ? "0" : "");
	sequence += initialPos;


	// Generate subsequent positions
	var subsequentPos = null;
	for(var i = 0; i < 50; i++){
		subsequentPos = Math.floor(Math.random() * 90) + 1;
		sequence += ((subsequentPos < 10) ? "0" : "");
		sequence += subsequentPos;
	}


	return sequence;
}

function getMaxPosition(shapeType){
	if(shapeType == 0){
		return 6;
	}else if(shapeType == 4){
		return 8;
	}else{
		return 7;
	}
}

function generateRandomPosition(shapeType){
	return Math.floor(Math.random() * getMaxPosition(shapeType));
}



function getRandomShape(){
	return gShapes.shift();
}

function getRandomPosition(){
	return gPositions.shift();
}


function hasRandomShape(){
	if(gShapes.length > 0){
		return true;
	}else{
		return false;
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
    nx      = 10, // width of tetris court (in blocks)
    ny      = 20, // height of tetris court (in blocks)
    nu      = 5;  // width/height of upcoming preview (in blocks)

//-------------------------------------------------------------------------
// game variables (initialized during reset)
//-------------------------------------------------------------------------
var dx, dy,        // pixel size of a single tetris block
    blocks,        // 2 dimensional array (nx*ny) representing tetris court - either empty block or occupied by a 'piece'
    actions,       // queue of user actions (inputs)
    playing,       // true|false - game is in progress
    dt,            // time since starting this game
    current,       // the current piece
    next,          // the next piece
    score,         // the current score
    vscore,        // the currently displayed score (it catches up to score in small chunks - like a spinning slot machine)
    rows,          // number of completed rows in the current game
    step;          // how long before current piece drops by 1 row

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

function verifyInitialFunctionality(){
	if(gCodeChanged){
		gCodeChanged = false;
		gIsVerified = true;
		if(typeof tetrisGame === 'undefined' || tetrisGame === null){
			AddToConsole("No tetrisGame object!");
			gIsVerified = false;
		}else{
			AddToConsole("tetrisGame object found!");
			if(typeof tetrisGame.AddShape !== 'function' || tetrisGame.AddShape === null){
				AddToConsole("tetrisGame object is missing an AddShape method!");
				gIsVerified = false;
			}
			if(typeof tetrisGame.IncrementTime !== 'function' || tetrisGame.IncrementTime === null){
				AddToConsole("tetrisGame object is missing an IncrementTime method!");
				gIsVerified = false;
			}
			if(typeof tetrisGame.IsShapeFalling !== 'function' || tetrisGame.IsShapeFalling === null){
				AddToConsole("tetrisGame object is missing an IsShapeFalling method!");
				gIsVerified = false;
			}
			if(typeof tetrisGame.GetCurrentState !== 'function' || tetrisGame.GetCurrentState === null){
				AddToConsole("tetrisGame object is missing an GetCurrentState method!");
				gIsVerified = false;
			}
		}

		if(gIsVerified){
			//setRows(1);
			AddToConsole("------------------------------------");
			AddToConsole("Initial Functions Verified... All four functions present");
			gIsVerified = true;
			playing = true;
			reset();
			gIsRunning = true;
			step = $('#option-speed').val();

			gSequence = $('#input-rseq').val();
			if(gSequence == ''){
				gSequence = generateRandomSequence();
				$('#input-rseq').val(LZString.compressToBase64(gSequence));
			}else{
				gSequence = LZString.decompressFromBase64(gSequence);
			}

			gShapes = [];
			gPositions = [];
		}
	}
	return gIsVerified;
}

//-------------------------------------------------------------------------
// GAME LOOP
//-------------------------------------------------------------------------
function run() {
  var last = now = timestamp();
  function frame() {
  	if(verifyInitialFunctionality()){
	    now = timestamp();
		update(Math.min(1, (now - last) / 1000.0));
		draw();
	}
    requestAnimationFrame(frame, canvas);
  }
  resize(); // setup all our sizing information
  reset();  // reset the per-game variables
  frame();  // start the first frame
}

function resize(event) {
  canvas.width   = canvas.clientWidth;  // set canvas logical size equal to its physical size
  canvas.height  = 2*canvas.clientWidth; // (ditto)
  dx = canvas.width  / nx; // pixel size of a single tetris block
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

function reset() {
  dt = 0;
  clearBlocks();
}

function update(idt){
	if(!gIsRunning){
		return;
	}

 	dt = dt + idt;
    if (dt > step) {
		if(tetrisGame.IsShapeFalling()){
			tetrisGame.IncrementTime();
		}else{
			if(hasRandomShape()){
				//AddToConsole("\nHasRandomShape...");
				var pShapeType = getRandomShape();
				tetrisGame.AddShape(pShapeType,getRandomPosition(pShapeType),gShapeIdCounter);
				gShapeIdCounter++;
			}else{
				generateRandomShapes(gSequence);
			}

		}
		dt = dt - step;
	}
}


//-------------------------------------------------------------------------
// RENDERING
//-------------------------------------------------------------------------
var invalid = {};
function invalidate()         { invalid.court  = true; }
function invalidateNext()     { invalid.next   = true; }
function invalidateScore()    { invalid.score  = true; }
function invalidateRows()     { invalid.rows   = true; }

function drawCourt() {
  if (invalid.court) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var x, y, block;
    for(y = 0 ; y < ny ; y++) {
      for (x = 0 ; x < nx ; x++) {
        if (block = getBlock(x,y))
          drawBlock(ctx, x, y, block.color);
      }
    }
    ctx.strokeRect(0, 0, nx*dx - 1, ny*dy - 1); // court boundary
    invalid.court = false;
  }
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.lineWidth = 1;
	ctx.translate(0.5, 0.5); // for crisp 1px black lines
	drawCourt();
	ctx.restore();
	var pCurrentState = tetrisGame.GetCurrentState();
	for(var j = 0; j < 20; j++){
		for(var i = 0; i < 10; i++){
			if(pCurrentState[j*10 + i] != -1){
				drawBlock(ctx, i, j, getShapeColor(pCurrentState[j*10 + i]));
			}
		}
	}
}


function drawBlock(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x*dx, y*dy, dx, dy);
  ctx.strokeRect(x*dx, y*dy, dx, dy)
}

//-------------------------------------------------------------------------
// FINALLY, lets run the game
//-------------------------------------------------------------------------
run();
