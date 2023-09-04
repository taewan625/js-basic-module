// 0. html 요소 땡겨오기
const leftSelect = document.getElementById("left");
const rightSelect = document.getElementById("right");

const right = document.getElementById("r");
const rightAll = document.getElementById("ra");
const left = document.getElementById("l");
const leftAll = document.getElementById("la");

// 해당 params는 tag를 target으로 한다고 생각하자
//--> java에서는 뭘까? java에서 인터페이스를 만들 때 어떤 것을 target을 하는지 생각해 보자

// 선택된 option을 왼쪽에서 오른쪽으로 옮긴다.
function moveSelectedLeftToRight() {
  moveSelected(leftSelect, rightSelect);
}
// 선택된 option을 오른쪽에서 왼쪽으로 옮긴다.
function moveSelectedRightToLeft() {
  moveSelected(rightSelect, leftSelect);
}

function moveAllRight() {
  moveAll(leftSelect, rightSelect);
}

function moveAllLeft() {
  moveAll(rightSelect, leftSelect);
}

// 모든 option을 옮긴다.
function moveAll(from, to) {
  // 1. 모든 option을 선택한다.
  selectAll(from);

  // 2. 선택된 option을 옮긴다.
  moveSelected(from, to);
}

// 선택된 option을 from에서 to로 옮긴다.
function moveSelected(from, to) {
  let fromOptions = from.options; // options 배열

  // array 빼기 문제 때문에 뒤에서부터 빼줌
  for (i = fromOptions.length - 1; i > 0; i--) {
    if (fromOptions[i].selected) {
      to.innerHTML += fromOptions[i].outerHTML; // 항상 다 된다고 생각하자
      fromOptions[i].remove();
    }
  }
}

// target의 모든 option을 selected 한다.
function selectAll(from) {
  for (i = 1; i < from.options.length; i++) from.options[i].selected = true;
}

right.addEventListener("click", moveSelectedLeftToRight);
rightAll.addEventListener("click", moveAllRight);
left.addEventListener("click", moveSelectedRightToLeft);
leftAll.addEventListener("click", moveAllLeft);
