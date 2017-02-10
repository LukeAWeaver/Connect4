<!--

	The following code was provided by Dain Vermaak and modified by James Muoghalu for the purposes of creating a connect4 game.
	Date: 5/4/16

-->



<?php
//=========== SET TIMEZONE =======================
date_default_timezone_set('America/Denver');

//=========== PHP ERROR REPORTING ================
error_reporting(E_ALL);
ini_set("display_errors", 1);
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
	<title>EECS 368: Group #2: Project 3</title>

	<style>
	   /*body      { font-family: Helvetica, sans-serif; }*/
	    #tetris   {}
	    #stats    { display: inline-block; vertical-align: top; }
	    #canvas   { background: black;
	    		box-shadow: 10px 10px 10px #999; border: 2px solid #333;
		 	}
	    #menu     { display: inline-block; vertical-align: top; position: relative; }
	    #menu p   { margin: 0.5em 0; text-align: center; }
	    #menu p a { text-decoration: none; color: black; }
	    #upcoming { display: block; margin: 0 auto; background-color: #E0E0E0; }
	    #score    { color: red; font-weight: bold; vertical-align: middle; }
	    #rows     { color: blue; font-weight: bold; vertical-align: middle; }
		.form-limitedwidth{
			width:100%;
		}
	</style>

	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

	<!-- Bootstrap -->
	<link href="../connect4/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="../connect4/bootstrap/js/bootstrap.min.js"></script>

	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="../connect4/bootstrap-datepicker-master/dist/js/bootstrap-datepicker.min.js"></script>
	<link rel="stylesheet" type="text/css" href="../connect4/bootstrap-datepicker-master/dist/css/bootstrap-datepicker.css" />

	<script src="../connect4/lz-string/lz-string.min.js"></script>

	<script>
	var dropColumn = -1;
		function Ajax_UpdateCode(){
			var jqxhr = $.post("../connect4/ajax/updatecode.php", {code: $('#textarea-jscode').val()}, function(data) {
		  		$('#scriptcode').html(data);
			});
		}

		function Ajax_RefreshCode(){
			var jqxhr = $.post("../connect4/ajax/updatecode.php", {code: $('#textarea-jscode').val()}, function(data) {
		  		$('#scriptcode').html(data);
		  		ContinueTesting();
			});
		}

		var gCodeAltered = false; // Not the same as gCodeChanged for tetris368.js
		function UpdatePauseButton()
		{
			if(currentMode == 'display')
			{
				$('#btn-pause').show();
			}
			else
			{
				$('#btn-pause').hide();
			}


			if(pauseSim)
			{
				if(gCodeAltered)
				{
					Ajax_UpdateCode();
					$('#btn-pause').html("Resume<br />(Click 'Test Code' To Apply Code Changes)");
				}
				else
				{
					$('#btn-pause').html("Resume");
				}
			}
			else
			{
				$('#btn-pause').html("Pause");
			}


		}

			// global variables
		var stopSim = true;
		var gameOverPrint = 0;

			// when the "New Game" button is clicked
		$( document ).ready(function() {
			$('#btn-test').click(function(e)
			{
				e.preventDefault();
				gTestBegun = false;
				gTestComplete = false;
				gCodeAltered = false;
				pauseSim = false;
				gPositionMarker  = 0;
				gameOverPrint = 0;
				Ajax_UpdateCode();


				connect4.currentState = [];
				connect4.turn = 1;
				connect4.pickedColumn;
				stopSim = false;

				for (var A = 0 ; A < 42 ; A++)
				{
					connect4.currentState.push(-1);
				}


				reset();  // reset the per-game variables
				frame();  // start the first frame
				draw();



				UpdatePauseButton();

			});

			$('#btn-pause').click(function(e)
			{
				e.preventDefault();
				pause();
				UpdatePauseButton();
			});


			$('#option-mode').change(function()
			{
				$('#scriptcode').html('');
				stop();
				currentMode = $('#option-mode').val();
				UpdatePauseButton();
			});

			$("textarea").keydown(function(e)
			{
			    if(e.keyCode === 9) { // tab was pressed
			        // get caret position/selection
			        var start = this.selectionStart;
			        var end = this.selectionEnd;

			        var $this = $(this);
			        var value = $this.val();

			        // set textarea value to: text before caret + tab + text after caret
			        $this.val(value.substring(0, start)
			                    + "\t"
			                    + value.substring(end));

			        // put caret at right position again (add one for the tab)
			        this.selectionStart = this.selectionEnd = start + 1;

			        // prevent the focus lose
			        e.preventDefault();
			    }
			});

			$('#textarea-jscode').bind('input propertychange',
				function()
				{
					if(!gCodeAltered)
					{
				      		gCodeAltered = true;
				      		UpdatePauseButton();
				    	}
				}
			);

				// For the seven buttons representing each column in the canvas

			$(".0").click(
				function()
				{
					dropColumn=0;
				}
			); //close trigger

			$(".1").click(
				function()
				{
					dropColumn=1;
				}
			); //close trigger

			$(".2").click(
				function()
				{
					dropColumn=2;
				}
			); //close trigger

			$(".3").click(
				function()
				{
					dropColumn=3;
				}
			); //close trigger

			$(".4").click(
				function()
				{
					dropColumn=4;
				}
			); //close trigger

			$(".5").click(
				function()
				{
					dropColumn=5;
				}
			); //close trigger

			$(".6").click(
				function()
				{
					dropColumn=6;
				}
			); //close trigger


		});




	</script>
</head>

<body>
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<h3>Connect 4<br />
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<form class="form-limitedwidth">
					<div class="form-group">
						<label for="option-mode">By: James Muoghalu, Thomas Doty, and Luke Weaver</label>
					</div>
				</form>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
			</div>
		</div>


		<div class="row">
			<div class="col-md-6">
				<form class="form-limitedwidth" style="margin-top:5%">
					<div class="form-group">
						<button type="submit" id="btn-test" class="btn btn-block btn-primary">New Game</button>
					</div>
				</form>
				<br clear="all" />
				<form>
					<div class="form-group" style="margin-top:5%">
						<label for="textarea-console">Console</label>
						<textarea class="form-control" id="textarea-console" name="textarea-console" rows="18">
						</textarea>
					</div>
				</form>

			</div>
			<div class="col-md-6">
				<h3><span style="margin-left:20%;">Select a column:</style></h3>
				<h6><span style="margin-left:16%;">(If column is already full, choose another)</style></h6>​

				<table style="margin-left:20%;">
					<tr>
					<td class="0"><button>1</button></td>
					<td class="1"><button>2</button></td>
					<td class="2"><button>3</button></td>
					<td class="3"><button>4</button></td>
					<td class="4"><button>5</button></td>
					<td class="5"><button>6</button></td>
					<td class="6"><button>7</button></td>
				</tr>
			</table>
				<label for="textarea-console">Display</label>

				<div id="tetris">

			    <canvas id="canvas">
			      Sorry, this example cannot be run because your browser does not support the &lt;canvas&gt; element
			    </canvas>
			  </div>
			</div>
		</div>
	</div>

	<div id="scriptcode"></div>
	<script src="../connect4/stats.js"></script>
  	<script src="../connect4/connect4Canvas.js"></script>


</body>

</html>
