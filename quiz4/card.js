// 소람, 내인생을 바꾼 노션 플래너
// window.onload : dom load 완전히 실행 후 js가 수행되도록 하는 함수
// ----------------------- document 땡겨오기 -----------------------

// card document
const board = document.querySelector("#board"); // card event check용
let cards = document.querySelectorAll("#board > img"); // board에 img넣기 위한 공간, board에 들어간 카드 element 배열형태

// btn document
const showBtn = document.getElementById("showBtn");
const hideBtn = document.getElementById("hideBtn");
const suffleBtn = document.getElementById("shuffleBtn");
const stopBtn = document.getElementById("stopBtn");

// 추가 기능
const timerBtn = document.getElementById("timer");
const scoreBtn = document.getElementById("score");
const showScore = document.getElementById("showScore");
const wrong = document.getElementById("wrong");

// ----------------------- 객체 및 전역 변수 -----------------------

// 실제 앞면 카드 번호
let myCards = [];

// 카드 뒤집힐 때 count 및 뒤집힌 2개의 카드 비교
let count = 0;
let checkCards = [];

// 카드 객체 생성
function MyCard(num, color, imgSrc) {
  this.num = num; // 숫자는 숫자
  this.color = color % 2 === 0; // 색깔은 짝(true) / 흑백은 홀(false)
  this.imgSrc = imgSrc; // setAttribute에 사용할 것
}

// timer 재료
let time = 180000; //1000ms = 1s
let min = 3;
let sec = 60;

// score
let score = 0;

// ----------------------- function -----------------------

alert(
  "game을 시작합니다. 총 게임 시간은 3분이고 3분 후 게임이 종료 됩니다. 힌트는 총 3번 제공됩니다."
);

// 1. 게임 시작
initGame();

// 타이머 시작
timer();

// 7. 게임 시작할 때 타이머 시작
function timer() {
  // 1초마다 countdown
  startTimer = setInterval(countDown, 1000);
}

// 7.1. countDown하는 function
function countDown() {
  time = time - 1000; //1초씩 줄어듦
  min = time / (60 * 1000); //초를 분으로 나눠준다.

  if (time === 0) {
    // startTime function에게 clearInterval 전달
    clearInterval(startTimer);

    // 시간 종료시 멈춤 - 모든 이벤트 멈춤
    allStopEvent();
  } else if (sec > 0) {
    //sec=60 에서 1씩 빼서 출력해준다.
    sec = sec - 1;
    timerBtn.value = Math.floor(min) + ":" + sec; //실수로 계산되기 때문에 소숫점 아래를 버리고 출력해준다.
  }
  if (sec === 0) {
    sec = 60;
    timerBtn.value = Math.floor(min) + ":" + "00";
  }
}

// 9. handleStopGame - stop button 누룰시 다 stop 시키기
function handleStopGame() {
  let currentTime = time;
  let min = currentTime / (60 * 1000);
  let msSec = currentTime % (60 * 1000);
  let sec = msSec / 1000;
  time = 1000;
  timerBtn.value = Math.floor(min) + ":" + sec;
}

// 8. stop event
function allStopEvent() {
  // button disabled 시켜버리기
  showBtn.setAttribute("disabled", "disabled");
  hideBtn.setAttribute("disabled", "disabled");
  suffleBtn.setAttribute("disabled", "disabled");
  stopBtn.setAttribute("disabled", "disabled");

  for (let card of cards) card.removeEventListener("click", cardClick);
  showBtn.removeEventListener("click", handleShowBtn);
  hideBtn.removeEventListener("click", handleHideBtn);
  suffleBtn.removeEventListener("click", handleSuffleBtn);

  window.alert("게임이 종료되었습니다.");
}

// 1. game 초기화
function initGame() {
  // 1.2. 배열을 초기화
  for (let card of cards) card.outerHTML = ""; // board 내부 tag 제거
  myCards = []; // myCards 초기화

  // back 카드를 담는 array
  let tmpBack = [];
  for (i = 0; i < 52; i++) {
    tmpBack.push(`<img src="img/back.png" id=${i}>`);
    board.innerHTML = tmpBack.join("");
    myCards.push(new MyCard(i % 13, Math.floor(i / 13), `img/${i}.png`)); // index 번호를 array에 담는다.
  }

  // 1.3. 배열을 섞는다
  myCards.sort(() => {
    return Math.random() - 0.5;
  });

  //6.추가 - myCards에 인덱스 번호 넣어줌
  let index = 0;
  for (myCard of myCards) {
    myCard.index = index++;
  }

  // 1.5. document 갱신
  cards = document.querySelectorAll("#board > img"); // board에 img넣기 위한 공간
}

// 2. card 뒤집기 - 조건
function cardClick() {
  let card = this;
  // 앞면이면 작동없이 돌아가고 뒷면이면 뒤집는다.
  if (isFront(card)) {
    return;
  } else {
    // 뒤집는 함수
    flip(card);
    // 2장 check 함수
    handleCheckTwoTime(card);
  }
}

// 2.1. card가 앞면이면 true 아니면 false 반환
function isFront(card) {
  // 2.1.1. src 속성 가져오기
  let src = card.getAttribute("src");
  // 2.1.2. src 속성 중 숫자만 추출
  // const srcNum = src.replace(/[^0-9]/g, "");
  // 2.1.2. src 속성 중 / 이후 값 가져오기. back.png만 가져오기
  let cardNameIndex = src.lastIndexOf("/") + 1;
  cardName = src.substr(cardNameIndex);

  // 2.1.3. card가 52번이면 false 다른 번호면 true
  return cardName != "back.png";
}

//2.2. card 뒤집기
function flip(card) {
  // card는 event가 발생한 뒷면 카드 의미
  // - 실제 카드 id는 0,1,2,3이지만 id를 해당 index라고 생각해서 myCard는 섞여있다.

  let myCard = myCards[card.id];
  card.setAttribute("src", myCard.imgSrc);
}

//3. show event 함수
function handleShowBtn() {
  for (let card of cards) flip(card);
}

//4. hide event function
function handleHideBtn() {
  for (let card of cards) {
    card.setAttribute("src", "img/back.png");
  }
}

// 5. shuffle event function
function handleSuffleBtn() {
  initGame();
  // event가 다시 실행되야함
  for (let card of cards) card.addEventListener("click", cardClick);
}

// 6. 비교할 2개의 card 배열에 담고 비교
function handleCheckTwoTime(card) {
  // 6.1. 뒤집힌 카드 실제 앞면 card obj 찾기
  let selectedCard = myCards[card.id];
  // 6.2. array에 담기
  checkCards.push(selectedCard);
  count++;
  // 6.2. 이미지 뛰우기 위한 좌표
  let top = [];
  let left = [];
  let leftPosition = 0;
  let topPosition = 0;

  // 6.3. 카드가 2장 뒤집힐 때 count와 array 다시 reset
  if (count == 2) {
    // 비교할 재료 준비 - cardNum, color
    // cards[checkCard.index] : 이게 outHtml
    let card0 = checkCards[0];
    let card1 = checkCards[1];

    let boolean = card0.num === card1.num && card0.color === card1.color;
    // 틀렸을 경우 if문으로 들어감
    if (!boolean) {
      // for문으로 비교
      for (let checkCard of checkCards) {
        top.push(cards[checkCard.index].offsetTop);
        left.push(cards[checkCard.index].offsetLeft);
        topPosition = (top[0] + top[1]) / 2;
        leftPosition = (left[0] + left[1]) / 2;
        setTimeout(function () {
          cards[checkCard.index].setAttribute("src", "img/back.png");
        }, 1000);
      }
      // style 적용하기
      wrong.className = "showScoreClass";
      wrong.style.visibility = "visible";
      wrong.style.top = topPosition + "px";
      wrong.style.left = leftPosition + "px";

      // 점수 감점
      score += -100;
      // 메롱 이미지 좌표 찍기
    }
    // 성공할 경우 - 회전 시키고 점수 보여주기 및 카드 제거
    else {
      for (let checkCard of checkCards) {
        cards[checkCard.index].setAttribute("class", "shaking");
        // 2장 카드의 2개의 offSet을 이용한 좌표 측정
        top.push(cards[checkCard.index].offsetTop);
        left.push(cards[checkCard.index].offsetLeft);
        topPosition = (top[0] + top[1]) / 2;
        leftPosition = (left[0] + left[1]) / 2;
      }
      // 클래스 이름이 있는 경우 제거하고 없는 경우 추가
      // html class 추가
      showScore.className = "showScoreClass";
      showScore.style.visibility = "visible";
      showScore.style.top = topPosition + "px";
      showScore.style.left = leftPosition + "px";
      wrong.removeAttribute("style");

      // 점수 제거
      score += 1000;
    }
    // 값 초기화
    count = 0;
    checkCards = [];
    // html class 제거

    // style 더럽게 꾸민거 다시 원복하기
    setTimeout(function () {
      // js로 수정한 style code는 js로 다시 원복
      showScore.classList.remove("showScoreClass");
      // 해당 showScore의 style 제거
      showScore.removeAttribute("style");
      // wrong.removeAttribute("style");
    }, 2500);

    // score 추가
    scoreBtn.value = score;
  }
}

//----------------------- event 발생  -----------------------

for (let card of cards) card.addEventListener("click", cardClick);

showBtn.addEventListener("click", handleShowBtn);
hideBtn.addEventListener("click", handleHideBtn);
suffleBtn.addEventListener("click", handleSuffleBtn);
stopBtn.addEventListener("click", handleStopGame);
