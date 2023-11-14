import React, { useState } from "react";
import "./Quiz.css";
const Quiz = () => {
     const quiz = {
        topic: 'Javascript',
        level: 'Beginner',
        totalQuestions: 4,
        perQuestionScore: 5,
        questions: [
          {
            question: 'Which function is used to serialize an object into a JSON string in Javascript?',
            choices: ['stringify()', 'parse()', 'convert()', 'None of the above'],
            type: 'MCQs',
            correctAnswer: 'stringify()',
          },
          {
            question: 'Which of the following keywords is used to define a variable in Javascript?',
            choices: ['var', 'let', 'var and let', 'None of the above'],
            type: 'MCQs',
            correctAnswer: 'var and let',
          },
          {
            question:
              'Which of the following methods can be used to display data in some form using Javascript?',
            choices: ['document.write()', 'console.log()', 'window.alert', 'All of the above'],
            type: 'MCQs',
            correctAnswer: 'All of the above',
          },
          {
            question: 'How can a datatype be declared to be a constant type?',
            choices: ['const', 'var', 'let', 'constant'],
            type: 'MCQs',
            correctAnswer: 'const',
          },
        ],
      }
      const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const { questions } = quiz
  const {correctAnswer} = questions[activeQuestion]

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const onNext =()=>{
    setSelectedAnswerIndex(null)
    
    setResult((prev)=>(
        selectedAnswer ? {...prev,score : prev.score+5,correctAnswers : prev.correctAnswers+1} : {...prev,wrongAnswers:prev.wrongAnswers+1}
    ))
    if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1)
      } else {
        setActiveQuestion(0)
        setShowResult(true)
        //console.log(result)
      }
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  {
    showResult && console.log(result)
  }
  
  return (
    <div className="center-class">
      <div className="quiz-container">
        <div className="wrapper">
            <h1>Question No : {activeQuestion > 9 ? activeQuestion+1 : `0${activeQuestion+1}`}</h1>
            <div className="question">
                <h1>{questions[activeQuestion].question}</h1>

            </div>
            {
                questions[activeQuestion].choices.map((option,i)=>(
                    <div onClick={()=>onAnswerSelected(option,i)} key={i} className={selectedAnswerIndex === i ? 'selected-answer' : 'option'}>
                <span className="optiontext" >{option}</span>

            </div>
                ))
            }
            
            <div className="btn">
                <button disabled={selectedAnswerIndex===null} className="next-btn" onClick={onNext}>{questions.length - 1 === activeQuestion ? 'Finish' : 'Next' }</button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Quiz;
