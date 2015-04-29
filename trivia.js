// Constants yo
var reader = new FileReader();
var questions = "";
var trivia = [];
var curQuestion = 0;
var curMode = 'question';

// Read some input, set up our trivia.
// Initiate Kraken
function readText(that){
	var reader = new FileReader();
	reader.onload = function (e) {  
		questions = e.target.result;
		questions = questions.split("<q>");
		questions.shift();
		trivia = questions.map(function(str) {
			var arrObj = {};
			var newArr = str.split("<a>");
			if (newArr.length == 2) {
				arrObj['question'] = newArr[0].trim();
				arrObj['answer'] = newArr[1].trim();
				return arrObj
			}
			return null;
		});

		$('#fileInput').hide();
		$('#kraken').attr("src", "kraken.jpg");
	
		//alert(trivia[0].question);
	};//end onload()
	reader.readAsText(that.files[0]);

	$(document).click(function(e) {
		advanceQA();
	});
	$(".scoringArea").click(function(e) {
		e.stopPropagation();
	});
}

// Make a question. Make an answer. 50/50 chance.
// Side effects include killing the kraken.
function advanceQA() {
	if (curMode == 'question') {
		$("#hereBeText").html(trivia[curQuestion].question);
		curMode = 'timer';
	} 
	else if (curMode == 'timer') {
		curMode = 'answer';

		var sec = 15;
		var gogogogo = setInterval(function(){
	        document.getElementById("wibblyWobblyTimeyWimey").innerHTML = sec;
	        if(sec == 0) {
	        	document.getElementById("wibblyWobblyTimeyWimey").innerHTML = "";
	        	$("#hereBeText").html("And the answer is...");
	        	window.clearInterval(gogogogo)
	        }
	        sec--;
	    },1000);
	}
	else if (curMode == 'answer') {
		$("#hereBeText").html(trivia[curQuestion].answer);
		if (curQuestion < trivia.length - 1) {
			curQuestion++;
			curMode = 'question';
		} else {
			curMode = 'end'
		}
	} 
	else {
		$("#hereBeText").html("GAMES OVER GO HOME GUYS");
		$(document).off();
	}
}


// Scores go up, don't go down. That's life.
function plusplus(el){
	var row = el.parentElement;
	var daScore = row.cells[1];
	var score = Number(daScore.innerText);
	daScore.innerText = score +1;
}