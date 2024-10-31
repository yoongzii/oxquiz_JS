//quiz.js
import quizData from "./quizData.js";

//DOM
const intro = document.getElementById('intro')
const quizWrap = document.getElementById('quiz_wrap')
const quizStart = document.querySelector('#intro .quiz_start')
const answerBtn = document.querySelectorAll('#answer_btns button')
const question = document.getElementById('question')
const resultWrap = document.getElementById('result_wrap')
const wrongWrap = document.getElementById('wrong_wrap')
const wrongList = document.getElementById('wrong_answer_list')
const wrongAnswer = document.querySelector('.wrong_answer')
const restart = document.querySelector('.restart')
const timerCount = document.querySelector('.timer')
const allCount = document.querySelector('.alltimer')
const finish = document.getElementById('finish')


//variable
let questionIndex = 0;
let score = 0;
let wrong = []
let timer;
let counter;
let sec = 3;
let countNum = sec;
let allTimer;
let allNumer = sec * quizData.length;

timerCount.textContent = countNum; //초기값
allCount.textContent = allNumer;


quizStart.addEventListener('click', function() {
   quizShow()
   })

answerBtn.forEach(function(btn) {
   btn.addEventListener('click',function() {
      checkAnswer(this.classList.value)
   })
})

wrongAnswer.addEventListener('click', function() {
   wrongShow()
   })

restart.addEventListener('click', function() {
   wrongWrap.style.display = 'none';

   wrong = [];
   score = 0;
   questionIndex = 0;
   wrongList.innerHTML = '';

   quizShow()
   timerCount.style.display = 'block';
   allCount.textContent = sec * quizData.length;
   // console.log(questionIndex)
})

function quizShow() {
   intro.style.display = 'none'
   quizWrap.style.display = 'block'

   const quizNo = document.getElementById('quiz_no')

   if(questionIndex > quizData.length - 1) {
      resultShow() //문제풀이 완료
      clearTimeout(timer)//마지막 타이머 삭제
      clearInterval(counter)
      clearInterval(allTimer)

      return //resultShow()함수와 타이머 삭제 후 quizShow 함수를 빠져 나감
   }
   else {questionIndex++}

   quizNo.innerHTML = `문제 ${questionIndex}`
   question.innerHTML = quizData[questionIndex - 1].question

   //이전 타이머 삭제
   clearTimeout(timer)
   clearInterval(counter)
   clearInterval(allTimer)

   //quizShow() 호출 => 다음 문제 실행, 설정 초기화
   countNum = sec;
   timerCount.textContent = countNum;

   console.log(allNumer);

   allTimer = setInterval(function() {
      allNumer--;
      allCount.textContent = allNumer;
   }, 1000)

   counter = setInterval(function(){
      countNum--;
      timerCount.textContent = countNum;
   }, 1000)

   timer = setTimeout(function(){
      //오답처리
      wrong.push(quizData[questionIndex - 1].id)
      //다음문제
      quizShow()
   }, sec*1000)
}

function checkAnswer(answer) {// o, x 버튼
  //정답확인
   if(answer === quizData[questionIndex - 1].answer) {
      score++;
   }
   else {
      wrong.push(quizData[questionIndex - 1].id)
   }
   quizShow()
}

function resultShow() {
   resultWrap.style.display = 'block';
   quizWrap.style.display = 'none';

   const resultScore = document.querySelector('#result_wrap .score')
   resultScore.innerHTML = `<span>${score}</span> / <span>${quizData.length}</span>`


   if(score == quizData.length){
      wrongAnswer.remove();
      resultScore.innerHTML = `축하합니다. <span>${score}</span> 점으로 만점입니다.`
   }
   timerCount.style.display = 'none';

   }

function wrongShow() {
      resultWrap.style.display = 'none'
      wrongWrap.style.display = 'block'
   //오답 노트
   // wrong  배열 : 순회 (배열의 갯수만큼 li 생성)
   // wrongList.appendChild(wrongItem)
   wrong.forEach(function(wrongId) {
      const wrongItem = document.createElement('li');
      const wrongQuiz = quizData.find(item => item.id === wrongId);

      wrongItem.innerHTML = `문제${wrongQuiz.id}. ${wrongQuiz.question} (${wrongQuiz.answer})`
      wrongList.appendChild(wrongItem)

   })
   timerCount.style.display = 'none';
   }