
      question: 'Who is on the One Dollar Bill?',
      choices: ['Make a Selection', 'Martin Van Buren', 'George Washington', 'James Knox Polk', 'Benjamin Franklin'],
      correctAnswer: ['George Washington']
    },
    {
      question: 'Who is on the Fifty Dollar Bill?',
      choices: ['Make a Selection', 'John Tyler', 'John Quincy Adams', 'Ulysses S. Grant', 'Winston Churchill'],
      correctAnswer: ['John Quincy Adams']
    },
    {
      question: 'Who is on the Five Dollar Bill?',
      choices: ['Make a Selection', 'Abraham Lincoln', 'James Monroe', 'Andrew Jackson', 'Ulysses S. Grant'],
      correctAnswer: ['Abraham Lincoln']
    },
    {
      question: 'Who is on the Two Dollar Bill?',
      choices: ['Make a Selection', 'Andrew Johnson', 'John Marshall','John Adams', 'Thomas Jefferson'],
      correctAnswer: ['Thomas Jefferson']
    },
    {
      question: 'Who is on the Hundred Dollar Bill?',
      choices: ['Make a Selection', 'James Madison', 'Woodrow Wilson', 'James Buchanan', 'Benjamin Franklin'],
      correctAnswer: ['Benjamin Franklin']
    }
  ];

/* Tracks question number */
let questionCounter = 0; 
console.log (questionCounter);
let selected = new Array (); /* Array containing user choices */
// selected.toString();
console.log (selected);
let quiz = $('#quiz'); /* Quiz div object */


/* Pulls correctAnswer Values */

getAnswerValues(); 
function getAnswerValues() {
  for (let i = 0; i < myBills[i].correctAnswer.length; i++) {
   let aValues = Object.values(myBills[i].correctAnswer);
   console.log(aValues);
  }
};


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
    getSelectedValues();
    function getSelectedValues() {
        let sValues = Object.values(selected);
        console.log(sValues);
  for (i = 0; i < selected.length; i++) {
    if(sValues[i] === "Make a Selection") {
        alert('Make a Selection to Move Forward');
          console.log(sValues);
            questionCounter--;
              selected.pop();
    } else if(sValues[i] !== 'Make a Selection')  {
        questionCounter++;
           console.log (questionCounter);
           console.log(selected.length)
        displayNext();
      }
    }
  }
});


/* Click handler for the 'prev' button */
$('#prev').on('click', function (e) { e.preventDefault();
  if(quiz.is(':animated')) {return false;}
    choose();
    questionCounter--;
    selected.pop();
    displayNext();
});

/* Click handler for the 'Start Over' button */
$('#start').on('click', function (e) { e.preventDefault();
    if(quiz.is(':animated')) {
    return false;
  }
    questionCounter = 0;
    selected = [];
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
  
  let dropDowns = $(List(index));
      qElement.append(dropDowns);
  return qElement;
}

/* Creates a list of the answer choices as radio inputs */
function List(index) {
  let dropDown = $('<select>');
  let input = $('');
clength = getChoicesLength();

  for (let i = 0; i < clength; i++) {
      input = $('<option> ' + myBills[index].choices[i] + '</option>');
      dropDown.append(input);
}
  return dropDown;
}
 
/* Reads the user selection and pushes the value to an array */
function choose() {
      $('option:selected').each(function() {
        selected.push($(this).val());
      });
      console.log(selected);
      console.log(questionCounter);      
};

/* Displays next requested element */
function displayNext() {
    quiz.fadeOut(function() {
        $('#question').remove();
          if(questionCounter < myBills.length){
            console.log(myBills.length);
              let nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
      
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



displayScore();
function displayScore() {
  let score = $('<p>',{id: 'question'});

  getSelectedValues();
  function getSelectedValues() {
      let sValues = Object.values(selected);
      console.log(sValues);

getAnswerValues(); 
function getAnswerValues() {
  for (let j = 0; j < myBills[j].correctAnswer.length; j++) {
   let aValues = Object.values(myBills[j].correctAnswer);
   
   console.log(aValues);

let score = [];   
  let numCorrect = 0;
  for (var i = 0; i < selected.length; i++) {
    if (sValues[i] === aValues[i]) {
      numCorrect++;
      score.push(25);
      console.log(score);
      // console.log (myBills[index].correctAnswer[i]);
      console.log(numCorrect);
      console.log('im here');
    }
      score.append('You got ' + numCorrect + ' questions out of ' + questionCounter + ' right!!!');
      return score;
        }
      }
    }
  }
}

};

startAlert();
billQuestions();
