
var isGameStarted = false;
var i;//stopwatch counter
var interval = 30;//30sec timeout
var intervalRet;
var currentQuizz;
var timeoutRet;
var isAnswered; //boolean flag if play select an answer.
var quizzItems = [];

function gameStart() {

	isGameStarted = true;

	//reset to zero second
	i = 30;

	isAnswered = false;

	//list of question objects

	quizzItems = [

		{	
			"question": "What is the world's most valuable brand?",
			"options": ["Verizon","Amazon","Louis Vuitton","Apple"],
			"answer":3

		},

		{	
			"question": "What is the smallest country in the world by population?",
			"options": ["Monaco","Maldives","Vatican","Liechtenstein"],
			"answer":2

		},

		{	
			"question": "What is the first programming language?",
			"options": ["Assembly","Pascal","Fortran","Ada"],
			"answer":2 

		},
		{	
			"question": "What is the tallest building in the world?",
			"options": ["One World Trade Center","Shanghai Tower","Petronas Tower","Burj Khalifa Tower"],
			"answer":3 

		},
		{	
			"question": "Who is not a BackstreetBoys member?",
			"options": ["Justin Timberlake","AJ McLean","Nick Carter","Kevin Richardson"],
			"answer":0

		}

	];

	reset();

	askQuizz();

}

//count() increase counter i and display stopwatch time

function count() {

	i--;

	time = timeConverter(i);

	$(".timer").html("<h3>"+time+"</h3>");

	if (i == 0) {

		//if i reach interval, answer will be displayed, pass -1 meaning timeout and no answer

		showAnswer(-1);	

	}
	
}

//askQuizz() displays question, options

function askQuizz() {

	//clean up answer of previous question

	reset();

	//reset counter to 0 second

	i=30;

	//get an item from list of available quizz and display it

	currentQuizz = quizzItems.shift();

	//check if still an item in the list

	if (currentQuizz) {

		intervalRet = setInterval(count,1000);

		$("#question").html("<p>"+currentQuizz.question+"</p>"+

		'<a class="options" href="#">' +currentQuizz.options[0] + '</a>'+
		'<a class="options" href="#">'+currentQuizz.options[1] + '</a>'+
		'<a class="options" href="#"">'+currentQuizz.options[2] + '</a>'+
		'<a class="options" href="#">' +currentQuizz.options[3] + '</a>');
	}

	else {

		//if there is no more quizz in the list, clean up everything, reset game to intial state.

			isGameStarted = false;
			clearTimeout(timeoutRet);

			$(".timer").html("<p>Please click start to play!</p>");

	}
}

function reset() {

	isAnswered = false;

	clearInterval(intervalRet);
	clearTimeout(timeoutRet);

	$(".timer").html("<h3>00:00</h3>");

	$(".answer").html('');

	$("#question").html('');
}

function showAnswer(userChoice) {

	//take userChoice param as user selected option

	clearInterval(intervalRet);

	var correctAnswer = currentQuizz.answer;

	var answer = currentQuizz.options[correctAnswer];

	//update background color of correct answer

	$(".options:contains('" + answer + "')").addClass("correct-answer");

	if (userChoice === -1) {

		$(".answer").html('<p class="result">TimeOut! The answer is: '+ answer +'</p>');

	}

	else if (userChoice === answer) {

		$(".answer").html('<p class="result">Correct! The answer is: '+ answer +'</p>');

	}

	else {

		$(".answer").html('<p class="result">Nope! The answer is: '+ answer +'</p>');

	}

	updateResultImage(answer);

	timeoutRet = setTimeout(askQuizz,5000);

}

function timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
 }

$("#start").on("click",function() {

	if (isGameStarted == false) {

		gameStart();

	}

});

$('#question').on("click",".options",function() {

	if (isAnswered == false) {

		//change color of selected answer.

		$(this).addClass("selected");

		var userChoice = $(this).text();

		isAnswered = true;

		showAnswer(userChoice);

	}

});

//get a gif image randomly from giphy and display it in answer
 function updateResultImage(keyword) {

      var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+keyword;

      //
      $.ajax({
        url: queryURL,
        method: "GET"

      })

      //
      .done(function(response) {

        imageUrl = response.data.image_original_url;

		var keywordImage = $("<img>");

    	keywordImage.attr("src", imageUrl);

		$(".answer").append(keywordImage);
        
      });

    }
