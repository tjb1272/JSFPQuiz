class quiz {
    constructor(question, choices, correctAnswer) {
        this.question = question;
        this.choices = choices;
        this.correctAnswer = correctAnswer;
    } 
    }
  
function billQuestions() {
  const myBills = [
    { 
      question: 'Who is on the One Dollar Bill?',
      choices: {a: 'Thomas Jefferson', b: 'George Washington', c: 'James Knox Polk', d: 'Benjamin Franklin'},
      correctAnswer: 'b'
    },
    {
      question: 'Who is on the Fifty Dollar Bill?',
      choices: {a: 'George Washington', b: 'John Quincy Adams', c: 'Ulysses S. Grant', d: 'Winston Churchill'},
      correctAnswer: 'c'
    },
    {
      question: 'Who is on the Five Dollar Bill?',
      choices: {a: 'Abraham Lincoln', b: 'James Monroe', c: 'Andrew Jackson', d: 'Ulysses S. Grant'},
      correctAnswer: 'a'
    },
    {
      question: 'Who is on the Two Dollar Bill?',
      choices: {a: 'Andrew Johnson', b: 'John Marshall',c: 'John Adams', d: 'Thomas Jefferson'},
      correctAnswer: 'd'
    },
    {
      question: 'Who is on the Hundred Dollar Bill?',
      choices: {a: 'James Madison', b: 'Woodrow Wilson', c: 'James Buchanan', d: 'Benjamin Franklin'},
      correctAnswer: 'd'
    }
  ];
    
let questionCounter = 0; /* Tracks question number */
let selections = []; /* Array containing user choices */
let quiz = $('#quiz'); /* Quiz div object */


    
/* Display initial question */
displayNext();

/* Click handler for the 'next' button */
$('#next').on('click', function (e) {e.preventDefault();
  
/* Suspend click listener during fade animation */
  if(quiz.is(':animated')) {return false;} choose();
  
/* If no user selection, progress is stopped */
  if (isNaN(selections[questionCounter])) 
    {alert('Please make a selection!');
} else {questionCounter++;
    displayNext();
  }
});

/* Click handler for the 'prev' button */
$('#prev').on('click', function (e) { e.preventDefault();
 if(quiz.is(':animated')) {return false;}
  choose();
  questionCounter--;
  displayNext();
});

/* Click handler for the 'Start Over' button */
$('#start').on('click', function (e) {
  e.preventDefault();
  
  if(quiz.is(':animated')) {
    return false;
  }
  questionCounter = 0;
  selections = [];
  displayNext();
  $('#start').hide();
});

/* Animates buttons on hover */
$('.button').on('mouseenter', function () {
  $(this).addClass('active');
});
$('.button').on('mouseleave', function () {
  $(this).removeClass('active');
});

/* Creates and returns the div that contains the questions and 
*  the answer selections */
function createQuestionElement(index) {
  var qElement = $('<div>', {
      id: 'question'
  });
  
  var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
  
  var question = $('<p>').append(myBills[index].question);
      qElement.append(question);
  
  var radioButtons = createRadios(index);
      qElement.append(radioButtons);
  
  return qElement;
}

/* Creates a list of the answer choices as radio inputs */
function createRadios(index) {
  var radioList = $('<ul>');
  var item;
  var input = '';
  for (var i = 0; i < myBills[index].choices.length; i++) {
    item = $('<li>');
    input = '<input type="radio" name="answer" value=' + i + ' />';
    input += myBills[index].choices[i];
    item.append(input);
    radioList.append(item);
  }
  return radioList;
}

/* Reads the user selection and pushes the value to an array */
function choose() {
  selections[questionCounter] = +$('input[name="answer"]:checked').val();
}

/* Displays next requested element */
function displayNext() {
  quiz.fadeOut(function() {
    $('#question').remove();
    
    if(questionCounter < myBills.length){
      var nextQuestion = createQuestionElement(questionCounter);
      quiz.append(nextQuestion).fadeIn();
      if (!(isNaN(selections[questionCounter]))) {
        $('input[value='+selections[questionCounter]+']').prop('checked', true);
      }
      
/* Controls display of 'prev' button */
    if(questionCounter === 1){
        $('#prev').show();
    } else if(questionCounter === 0){
  
        $('#prev').hide();
        $('#next').show();  
        }
      }else {
  var scoreElem = displayScore();
    quiz.append(scoreElem).fadeIn();
      $('#next').hide();
      $('#prev').hide();
      $('#start').show();
    }
  });
}

/* Computes score and returns a paragraph element to be displayed */
function displayScore() {
  var score = $('<p>',{id: 'question'});
  
  var numCorrect = 0;
  for (var i = 0; i < selections.length; i++) {
    if (selections[i] === myBills[i].correctAnswer) {
      numCorrect++;
    }
  }
  
  score.append('You got ' + numCorrect + ' questions out of ' +
               myBills.length + ' right!!!');
  return score;
} 
}
billQuestions();
