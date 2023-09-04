//-------
// window.onload : dom load 완전히 실행 후 js가 수행되도록 하는 함수
window.onload = function () {
  // ----------------------- document 땡겨오기 -----------------------

  // card document
  const board = document.querySelector("#board"); // card event check용
  let cards = document.querySelectorAll("#board > img"); // board에 img넣기 위한 공간, board에 들어간 카드 element 배열형태

  // btn document
  const showBtn = document.getElementById("showBtn");
  const hideBtn = document.getElementById("hideBtn");
  const suffleBtn = document.getElementById("shuffleBtn");

  // ----------------------- 객체 및 전역 변수 -----------------------

  // 실제 앞면 카드 번호
  let myCards = [];

  // 카드 뒤집힐 때 count 및 뒤집힌 2개의 카드 비교
  let count = 0;
  let checkCards = [];

  // 카드 객체 생성
  function MyCard(id, num, color, imgSrc) {
    this.id = id;
    this.num = num; // 숫자는 숫자
    this.color = color % 2 === 0; // 색깔은 짝(true) / 흑백은 홀(false)
    this.imgSrc = imgSrc; // setAttribute에 사용할 것
  }

  // ----------------------- function -----------------------

  // 1. game 초기화
  function initGame() {
    // 1.1. card 담을 배열을 만든다.
    let cardArr = []; // innerHTML은 inner 할 때 마다 내부 초기화 시키기 때문

    // 1.2. 배열을 초기화
    for (let card of cards) card.outerHTML = ""; // board 내부 tag 제거
    myCards = []; // myCards 초기화

    for (i = 0; i < 52; i++) {
      cardArr.push(`<img src="img/52.png" id=${i}>`);
      myCards.push(new MyCard(i, i % 13, Math.floor(i / 13), `img/${i}.png`)); // index 번호를 array에 담는다.
    }
    // 1.3. 배열을 섞는다
    myCards.sort(() => {
      return Math.random() - 0.5;
    });
    // 1.4. 카드를 div board 보여준다.
    board.innerHTML = cardArr.join("");

    // 1.5. document 갱신
    cards = document.querySelectorAll("#board > img"); // board에 img넣기 위한 공간
    // console.log(cards);
    // console.log(myCards);
  }

  // 2. card 뒤집기 - 조건
  function cardClick() {
    let card = this;
    // 앞면이면 작동없이 돌아가고 뒷면이면 뒤집는다.
    if (isFront(card)) {
      return;
    } else {
      flip(card);
    }
  }

  // 2.1. card가 앞면이면 true 아니면 false 반환
  function isFront(card) {
    // 2.1.1. src 속성 가져오기
    let src = card.getAttribute("src");
    // 2.1.2. src 속성 중 숫자만 추출
    const srcNum = src.replace(/[^0-9]/g, "");
    // 2.1.3. card가 52번이면 false 다른 번호면 true
    return srcNum != 52;
  }

  //2.2. card 뒤집기
  function flip(card) {
    // card는 event가 발생한 뒷면 카드 의미
    // - 실제 카드 id는 0,1,2,3이지만 id를 해당 index라고 생각해서 myCard는 섞여있다.
    let myCard = myCards[card.id];
    console.log(myCard.imgSrc);
    card.setAttribute("src", myCard.imgSrc);
  }

  //3. show event 함수
  function handleShowBtn() {
    for (let card of cards) flip(card);
  }

  //4. hide event function
  function handleHideBtn() {
    for (let card of cards) {
      card.setAttribute("src", "img/52.png");
    }
  }

  // 5. shuffle event function
  function handleSuffleBtn() {
    initGame();
    // event가 다시 실행되야함
    for (let card of cards) card.addEventListener("click", cardClick);
  }

  // 6. 비교할 2개의 card 배열에 담고 비교
  function handleCheckTwoTime() {
    // 6.1. 뒤집힌 카드 실제 앞면 card obj 찾기
    // ----------- 문제점 : myCards의
    let card = myCards[this.id];
    // 6.2. array에 담기
    checkCards.push(card);
    count++;

    // 6.3. 카드가 2장 뒤집힐 때 count와 array 다시 reset
    if (count == 2) {
      // 비교할 재료 준비 - cardNum, color
      let cardNum1 = checkCards[0].num;
      let cardColor1 = checkCards[0].color;
      let cardNum2 = checkCards[1].num;
      let cardColor2 = checkCards[0].color;
      // console.log(`num1 ${cardNum1} , num2 ${cardNum2}, color1 ${cardColor1}, color2 ${cardColor2}`);

      if (cardNum1 != cardNum2 || cardColor1 != cardColor2) {
        for (let checkCard of checkCards) {
          console.log(checkCard.id);
          console.log(cards[checkCard.id]); // checkCards의 인덱스를 가진 cards의 card 가져옴
          cards[checkCard.id].setAttribute("src", "img/52.png");
        }
      }
      count = 0;
      checkCards = [];
    }
  }

  //----------------------- event 발생  -----------------------
  initGame();

  for (let card of cards) card.addEventListener("click", cardClick);
  for (let card of cards) card.addEventListener("click", handleCheckTwoTime);

  showBtn.addEventListener("click", handleShowBtn);
  hideBtn.addEventListener("click", handleHideBtn);
  suffleBtn.addEventListener("click", handleSuffleBtn);
};
