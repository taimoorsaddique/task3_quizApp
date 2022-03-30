const data = [
    {
      "id": 1,
      "type": "short_answer",
      "question": "Why is the sky blue?",
      "answers": [],
      "correct_answer": 0    
    },
    {
      "id": 2,
      "type": "multiple_choice",
      "question": "Why is the sky blue?",
      "answers": [
        { "id": 1, "answer": "Because of physics"},
        { "id": 2, "answer": "Because that the way it always was"},      
        { "id": 3, "answer": "I don't know"},      
      ],
      "correct_answer": 1
    },
    {
      "id": 3,
      "type": "multiple_selection_choice",
      "question": "What programming languages are you familiar with?",
      "answers": [
        { "id": 1, "answer": "C++"},
        { "id": 2, "answer": "Python"},      
        { "id": 3, "answer": "Java"},      
      ],
      "correct_answer": 1
    },
    {
      "id": 4,
      "type": "long_text",
      "question": "Why is the sky blue?",
      "answers": [],
      "correct_answer": 0
    },
    {
      "id": 5,
      "type": "description",
      "question": "random text to show to the user",
      "answers": [],
      "correct_answer": 0
    },
    {
      "id": 6,
      "type": "true_false",
      "question": "Is the sky blue",
      "answers": [],
      "correct_answer": 2
    }
  ];


 let answersList = [];

const removePreviouslyActive = (elemRef)=>{
    elemRef.forEach((elem)=>{
        elem.classList.remove("choice-selected");
    });
}
let multipleSelectionAnswers = [];
let answer;



// displaying question statement and options in the DOM
let quizContent = document.getElementById("quizContent"); // parentElement for new added questions
let questionIndex = 0;

const displayQuizItem = (questionIndex)=>{
    quizContent.innerHTML = "";

    const statement = document.createElement("h3"); // element to display the question statement
    statement.innerText = data[questionIndex].question;
    quizContent.appendChild(statement);

    const choicesContainer = document.createElement("div"); // Container to hold multiple choices or text field
    choicesContainer.className = "answer-container";
    choicesContainer.classList.add(data[questionIndex].type);

    quizContent.appendChild(choicesContainer);
   
        const message = document.createElement("p");
        message.className = "message";
        if(data[questionIndex].type == "long_text"){
            message.innerText = "Please enter your answer in less than 100 words";
        }else if(data[questionIndex].type == "short_answer"){
            message.innerText = "Write a short answer";
        }else if(data[questionIndex].type == "multiple_choice" || data[questionIndex].type == "true_false"){
            message.innerText = "Please select one";
        }else if(data[questionIndex].type == "multiple_selection_choice"){
            message.innerText = "You can select multiple choices";
        }else{
            message.innerText = "Briefly Describe";
        }

        choicesContainer.appendChild(message);


    if(data[questionIndex].type == "multiple_choice" || data[questionIndex].type == "multiple_selection_choice"){
        data[questionIndex].answers.forEach((answerObj)=>{
        const choice = document.createElement("div");
        choice.className = "my-4 p-4 bg-light rounded bg-light choice";

        const optionId = document.createElement("span");
        optionId.className = "choice-index bg-dark rounded  p-2 mr-3 text-light";
        optionId.innerText = answerObj.id;

        const optionValue = document.createElement("span");
        optionValue.className = "ml-3 choice-value";
        optionValue.innerText = answerObj.answer;

        choice.appendChild(optionId);
        choice.appendChild(optionValue);
        choicesContainer.appendChild(choice);
        });
        bindClickEvents(data[questionIndex].type);
    }else if(data[questionIndex].type == "true_false"){

        for(let i = 1; i <= 2; i++){
            const choice = document.createElement("div");
            choice.className = "my-4 p-4 bg-light rounded bg-light choice";

            const optionId = document.createElement("span");
            optionId.innerText = i;
            optionId.className = "choice-index bg-dark rounded  p-2 mr-3 text-light";

            const optionValue = document.createElement("span");
            optionValue.className = "ml-3 choice-value";
            if(i == 2){
                optionValue.innerText = "False";
            }else{
                optionValue.innerText = "True";
            }
            choice.appendChild(optionId);
            choice.appendChild(optionValue);
            choicesContainer.appendChild(choice);
        }
        bindClickEvents(data[questionIndex].type);
    }else{
        const inputField = document.createElement("textarea");
        inputField.id = "textInput";
        choicesContainer.appendChild(inputField);
        // adding Event listener to store answers
        inputField.addEventListener("keyup", (e)=>{
            addToAnswer(data[questionIndex].type, "", e.target.value);
        });
    }
    
}

displayQuizItem(questionIndex);



const storeCurrentAnswer = (answer, Id)=>{
    const tempObj = {};
    tempObj["id"] = Id+1;
    tempObj["type"] = data[Id].type;
    if(data[Id].type == "multiple_selection_choice"){
        tempObj["answer"] = multipleSelectionAnswers; 

    }else{
    tempObj["answer"] = answer; 

    }
    answersList.push(tempObj);
    console.log(answersList);
}


const addToAnswer = (type, selector, elem)=>{
    if(type == "multiple_selection_choice"){
        multipleSelectionAnswers.push(selector.indexOf(elem) + 1);
        console.log(multipleSelectionAnswers);
    }else if(type == "multiple_choice" || type == "true_false"){
        answer = selector[selector.indexOf(elem)].innerText;
        console.log(answer);
    }else{
        answer = elem;
    }
    
}
const removeAnswer = (selector, elem) => {
        multipleSelectionAnswers.splice(selector.indexOf(elem), 1);
        console.log(multipleSelectionAnswers);
};

function bindClickEvents(type){
    let selector = `.${type} .choice`; 
    let selection = document.querySelectorAll(selector);
    selection = Array.from(selection);
    selection.forEach((choice)=>{
        choice.addEventListener("click", ()=>{
            addToAnswer(type, selection, choice);
            if(type != "multiple_selection_choice"){
                removePreviouslyActive(selection);
                choice.classList.add("choice-selected");
            }else{
                if(!choice.classList.contains("choice-selected")){
                    choice.classList.add("choice-selected");
                    
                }else{
                    choice.classList.remove("choice-selected");
                    removeAnswer(selection, choice);
                }
            }
        });
    });
}


const moveToNext = () =>{
    if(questionIndex == data.length){
        nextBtn.style.display = "none";
    }else if(questionIndex < data.length){
        storeCurrentAnswer(answer, questionIndex);
        questionIndex++;
        answer = "";
        multipleSelectionAnswers = [];
        displayQuizItem(questionIndex);
    }
}

const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", moveToNext);




