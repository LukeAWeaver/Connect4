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
	<title>Tetris Tester V0.1</title>	
	
	<style>
	   /*body      { font-family: Helvetica, sans-serif; }*/
	    #tetris   {}
	    #stats    { display: inline-block; vertical-align: top; }
	    #canvas   { background: url('../tetris/texture.jpg'); 
box-shadow: 10px 10px 10px #999; border: 2px solid #333; }
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
	<link href="../includes/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="../includes/bootstrap/js/bootstrap.min.js"></script>

	<script src="../includes/lz-string/lz-string.min.js"></script>
	
	<script>
		function Ajax_UpdateCode(){
			var jqxhr = $.post("ajax/updatecode.php", {code: $('#textarea-jscode').val()}, function(data) {
		  		$('#scriptcode').html(data);
			});
		}

	
		$( document ).ready(function() {		
			$('.btn').click(function(e){
				e.preventDefault();
				Ajax_UpdateCode();
			});	
		});
	</script>
</head>

<body>
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<h3>Tetris Tester V0.1</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<form class="form-limitedwidth">
					<div class="form-group">
						<label for="option-mode">Mode</label>
						<select class="form-control" id="option-mode" name="option-mode">
							<option>EECS 368 - Display Only</option>
						</select>
					</div>
				</form>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<form class="form-limitedwidth">
					<div class="form-group">
						<label for="option-speed">Speed</label>
						<select class="form-control" id="option-speed" name="option-speed">
							<option value="10">Slow</option>
							<option value="5">Normal</option>
							<option value="1">Fast</option>
							<option value="0.1">Very Fast</option>
							<option value="0.01">Too Fast</option>
						</select>
					</div>
				</form>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<form class="form-limitedwidth">
					<div class="form-group">
						<label for="input-rseq">Random Sequence (Dictates the order and position of shapes)</label>
						<input type="text" class="form-control" id="input-rseq" name="input-rseq" />
					</div>
				</form>
			</div>
		</div>


		<div class="row">
			<div class="col-md-6">
				<form class="form-limitedwidth">
					<div class="form-group">
						<label for="textarea-jscode">JavaScriptCode</label>
						<textarea class="form-control" id="textarea-jscode" name="textarea-jscode" rows="8"></textarea>
						<button type="submit" class="btn btn-block btn-primary">Test Code</button>
					</div>
				</form>
				<br clear="all" />
				<form>
					<div class="form-group">
						<label for="textarea-console">Console</label>
						<textarea class="form-control" id="textarea-console" name="textarea-console" disabled="disabled"></textarea>
					</div>
				</form>
				
			</div>
			<div class="col-md-6">
				<div id="tetris">
			    
			    <canvas id="canvas">
			      Sorry, this example cannot be run because your browser does not support the &lt;canvas&gt; element
			    </canvas>
			  </div>
			</div>
		</div>
	</div>

	<div id="scriptcode"></div>
	<script src="stats.js"></script>  	
  	<script src="tetris368.js"></script>
</body>

</html>
