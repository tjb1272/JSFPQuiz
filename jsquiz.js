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
      choices: ['Thomas Jefferson', 'George Washington', 'James Knox Polk', 'Benjamin Franklin'],
      correctAnswer: 'George Washington'
    },
    {
      question: 'Who is on the Fifty Dollar Bill?',
      choices: ['George Washington', 'John Quincy Adams', 'Ulysses S. Grant', 'Winston Churchill'],
      correctAnswer: 'John Quincy Adams'
    },
    {
      question: 'Who is on the Five Dollar Bill?',
      choices: ['Abraham Lincoln', 'James Monroe', 'Andrew Jackson', 'Ulysses S. Grant'],
      correctAnswer: 'Abraham Lincoln'
    },
    {
      question: 'Who is on the Two Dollar Bill?',
      choices: ['Andrew Johnson', 'John Marshall','John Adams', 'Thomas Jefferson'],
      correctAnswer: 'Thomas Jefferson'
    },
    {
      question: 'Who is on the Hundred Dollar Bill?',
      choices: ['James Madison', 'Woodrow Wilson', 'James Buchanan', 'Benjamin Franklin'],
      correctAnswer: 'Benjamin Franklin'
    }
  ];

/* Tracks question number */
let questionCounter = 0; 
console.log (questionCounter);
let selections = []; /* Array containing user choices */
console.log (selections);
let quiz = $('#quiz'); /* Quiz div object */


/* Pulls the length of the Choices Objects */
getChoicesLength();
function getChoicesLength () {
    let clength = Object.keys(myBills[1].choices).length;
    // console.log(clength);
    return(clength);
}

/* Display initial question */
displayNext();

/* Click handler for the 'next' button */
$('#next').on('click', function (e) {e.preventDefault();
  
/* Suspend click listener during fade animation */
    if(quiz.is(':animated')) {return false;} choose();
  
/* If no user selection, progress is stopped */
    if(!(isNaN(selections[questionCounter]))) 
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
$('#start').on('click', function (e) { e.preventDefault();
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
  let qElement = $('<div>', {
      id: 'question'
  });
  
  let header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
  
  let question = $('<p>').append(myBills[index].question);
      qElement.append(question);
  
  let radioButtons = $(createRadios(index));
      qElement.append(radioButtons);
  return qElement;
}

/* Creates a list of the answer choices as radio inputs */
function createRadios(index) {
  let radioList = $('<ul>');
  let input = $('');
clength = getChoicesLength();

  for (let i = 0; i < clength; i++) {
    // for (let j = 0; j < myBills[0].question[i].length; j++) {
      input = $('<li><input type="radio" name="answer" />' + myBills[index].choices[i] + '</input></li>');
      radioList.append(input);
      console.log(input);
      console.log('Im here');
      console.log(myBills[index].choices[i]);
  // }
}
  return radioList;
}

/* Reads the user selection and pushes the value to an array */
function choose() {
  selections[questionCounter] = $('input[name="answer"]:checked').serialize();
}

/* Displays next requested element */
function displayNext() {
  quiz.fadeOut(function() {
    $('#question').remove();
    
    clength = getChoicesLength();  
      
    if(questionCounter < clength){
      let nextQuestion = createQuestionElement(questionCounter);
      quiz.append(nextQuestion).fadeIn();
      if ((isNaN(selections[questionCounter]))) {
        $('input[value='+selections[questionCounter]+']').prop('checked', true);
        console.log(selections);
        console.log(questionCounter);
      }
      
/* Controls display of 'prev' button */
    if(questionCounter === 1){
        $('#prev').show();
    } else if(questionCounter === 0){
  
        $('#prev').hide();
        $('#next').show();  
        }
      }else {
    let scoreElem = displayScore();
    quiz.append(scoreElem).fadeIn();
      $('#next').hide();
      $('#prev').hide();
      $('#start').show();
    }
  });
}

/* Computes score and returns a paragraph element to be displayed */
function displayScore() {
  let score = $('<p>',{id: 'question'});
  
  let numCorrect = 0;
  for (var i = 0; i < selections.length; i++) {

    if (selections[i] === myBills[i].correctAnswer.value) {
      numCorrect++;
    }
  }
  
  score.append('You got ' + numCorrect + ' questions out of ' + clength + ' right!!!');
  return score;
} 
}

billQuestions();
