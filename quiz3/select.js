// 0. html 요소 땡겨오기

// 가지고 오는 element가 헷갈림
let selectLefts = document.querySelectorAll("#left > option"); // 왼쪽 index
let selectRights = document.querySelectorAll("#right > option"); // 오른쪽 index

// 집어넣을 공간
const leftPut = document.getElementById("left");
const rightPut = document.getElementById("right");

const right = document.getElementById("r");
const rightAll = document.getElementById("ra");
const left = document.getElementById("l");
const leftAll = document.getElementById("la");

//----------------------------------------------------------------------------------

// 5.1. 중복코드 따로 function 만들기 - move()
function move(from, tos, putTag) {
  let tmpArr = [];
  // 5.1.1. tos의 요소들 먼저 tmpArr에 담기
  for (let to of tos) {
    tmpArr.push(to.outerHTML);
  }

  // 5.1.2. selected true인 것 tmpArr에 요소 담기
  for (let i = 1; i < from.length; i++) {
    // 5.1.3. selected true 인 것 배열로 가져오기
    if (from[i].selected) {
      tmpArr.push(from[i].outerHTML);
      from[i].remove();
    }
  }
  putTag.innerHTML = tmpArr.toString();

  // 6. 변경된 document tag들 다시 저장
  selectLefts = document.querySelectorAll("#left > option");
  selectRights = document.querySelectorAll("#right > option");
}

//-----------------------------------------------------------------------------------

// 2.1. 오른쪽으로 보낼 것. leftArr 상관 없다. rightArr 중요

function handlemoveRight() {
  move(selectLefts, selectRights, rightPut);
}

//2.2. 좌측으로 보낼 것. rightArr 상관 없다. leftArr 중요
function handlemoveLeft() {
  move(selectRights, selectLefts, leftPut);
}

//2.3. 오른쪽으로 전부 보낼 것. leftArr 상관 없다. rightArr 중요
function handlemoveRightAll() {
  // >> 이 event를 할 때 모두 selected true로 변형
  for (let selectLeft of selectLefts) selectLeft.selected = true;
  move(selectLefts, selectRights, rightPut);
}

//2.4. 좌측으로 전부 보낼 것. rightArr 상관 없다. leftArr 중요
function handlemoveLeftAll() {
  // >> 이 event를 할 때 모두 selected true로 변형
  for (let selectRight of selectRights) selectRight.selected = true;
  move(selectRights, selectLefts, leftPut);
}

// -------------------------------- event 코드 --------------------------------

right.addEventListener("click", handlemoveRight);
rightAll.addEventListener("click", handlemoveRightAll);
left.addEventListener("click", handlemoveLeft);
leftAll.addEventListener("click", handlemoveLeftAll);

// -------------------------------- 망한 코드 --------------------------------

/* switch 문 
function handleClickButton(e) {
  // if 문을 통해서 하나로 합칠 것 -> switch-case로 가도 될듯한데 -> if else가 더 축약될 것 같다.
  const button = e.target.innerText;

  let rightArr = []; // right 추가할 공간
  let leftArr = []; // left 추가할 공간

  selectLefts = document.querySelectorAll("#left > option");
  selectRights = document.querySelectorAll("#right > option");

  switch (button) {
    case ">":
      // 2.1.1. right select 내부 요소 rightArr 담기 - innerHTML 의 덮어쓰기 문제 방지
      for (let selectRight of selectRights) {
        rightArr.push(selectRight.outerHTML);
      }
      // 2.1.2. rightArr에 요소 담기 - selected true인 것
      for (let i = 1; i < selectLefts.length; i++) {
        // 2.1.3. (selected === true)요소  1) rightArr에 추가 및 2) left select block에서 제거
        if (selectLefts[i].selected) {
          rightArr.push(selectLefts[i].outerHTML);
          selectLefts[i].remove(); // 2) left select block에서 selected 요소 제거
        }
      }
      rightPut.innerHTML = rightArr.toString(); // 1) right select block에 rightArr 담기
      break;

    case "<":
      // 2.2.1. 좌측의 요소들 먼저 leftArr에 담기
      for (let selectLeft of selectLefts) {
        leftArr.push(selectLeft.outerHTML);
      }
      // 2.2.2. leftArr에 요소 담기 - selected true인 것
      for (let i = 1; i < selectRights.length; i++) {
        // 2.2.3. selected true 인 것 배열로 가져오기
        if (selectRights[i].selected) {
          leftArr.push(selectRights[i].outerHTML);
          selectRights[i].remove();
        }
      }
      leftPut.innerHTML = leftArr.join();
      break;

    case ">>":
      // 2.3.1. right select 내부 요소 rightArr 담기 - innerHTML 의 덮어쓰기 문제 방지
      for (let selectRight of selectRights) {
        rightArr.push(selectRight.outerHTML);
      }
      // 2.3.2. rightArr에 요소 담기 - 모든 것
      for (let i = 1; i < selectLefts.length; i++) {
        // 2.3.3.  모든 요소 1) rightArr에 추가 및 2) left select block에서 제거
        rightArr.push(selectLefts[i].outerHTML);
        selectLefts[i].remove();
      }
      rightPut.innerHTML = rightArr.toString();
      break;

    case "<<":
      // 2.4.1. 좌측의 요소들 먼저 leftArr에 담기
      for (let selectLeft of selectLefts) {
        leftArr.push(selectLeft.outerHTML);
      }
      // 2.4.2. leftArr에 요소 담기 - selected true인 것
      for (let i = 1; i < selectRights.length; i++) {
        // 2.4.3. selected true 인 것 배열로 가져오기
        leftArr.push(selectRights[i].outerHTML);
        selectRights[i].remove();
      }
      leftPut.innerHTML = leftArr.join();
      break;

    default:
      window.alert("have problem");
  }
}
*/

// 3.1. 배열형식으로는 event를 인식하는 것이 아니여서 낱개 요소를 각각 인식하도록 해야한다.
// for (let i = 1; i < selectLefts.length; i++) {
//   selectLefts[i].addEventListener("click", handleSelectLeft);
// }
// for (let i = 1; i < selectRights.length; i++) {
//   selectRights[1].addEventListener("click", handleSelectRight);
// }

// ------ 이전 code ----------

// // 0. html 요소 땡겨오기
// // 가지고 오는 element가 헷갈림
// const selectLeft = document.querySelectorAll("#left > option"); // 왼쪽 index
// const selectRight = document.querySelector("#right > option"); // 오른쪽 index

// const right = document.getElementById("right");
// const rightAll = document.getElementById("rightall");
// const left = document.getElementById("left");
// const leftAll = document.getElementById("leftall");

// // selected 된 배열 저장 공간
// // 해당 outerHTML string 저장
// const commonArr = []; // selected 된 것 배열로 나오도록
// selectLeft;

// // 1. select click: 뭐가 click됬는지 확인용
// function handleSelect() {
//   // select의 모든 option 선택
//   selectedOptionsLeft = Array.from(selectElementLeft.options)
//     .filter((option) => option.selected) // option들 중 selected true 필터
//     .map((option) => option.outerHTML); // 해당 option의 outerHTML 출력
//   console.log(selectedOptionsLeft);

//   selectedOptionsRight = Array.from(selectElementRight.options)
//     .filter((option) => option.selected)
//     .map((option) => option.outerHTML);
//   console.log(selectedOptionsRight);
// }

// // innerHTML을 하면 할때마다 내부가 초기화 되니깐 배열을 하나 더 만들어서 여기에 추가 후 toString으로 옮기기
// // 2. click button: click된 정보를 유지하고 button 누를시, 작동하도록

// let selectedOptionsRight = []; // selected 된 것 배열로 나오도록
// function handlemoveRight() {
//   // select 내부에 <option value="농구">농구</option> 이런 string 넣기
//   // 배열 값을 통해서 해당 outerHTML 가져오기 - 그리고 현 outerHTML 지우기
//   selectElementRight.innerHTML = selectedOptionsLeft.toString();
// }

// // 3. event 동작 확인
// selectElementLeft.addEventListener("change", handleSelect);
// selectElementRight.addEventListener("change", handleSelect);

// right.addEventListener("click", handlemoveRight);
// // rightAll.addEventListener("click");
// // left.addEventListener("click");
// // leftAll.addEventListener("click");

// ---  2차 시도  실패 ----
// 1. selected 된 배열 저장 공간
// 1. 해당 outerHTML string 저장

// const commonArr = []; // 공통 공간
// let leftArr = []; // left 공간
// let rightArr = []; // right 공간

// // 1.1. selectLefts의 요소를 commonArr에 넣을 것이다.
// for (let i = 1; i < selectLefts.length; i++) commonArr.push(selectLefts[i]);

// // 2.selected된 배열 저장
// //2.1. leftArr
// function handlemoveRight() {
//   for (let i = 1; i < selectLefts.length; i++) {
//     if (selectLefts[i].selected) {
//       leftArr.push(selectLefts[i]);
//       rightPut.innerHTML = selectLefts[i].outerHTML;
//       selectLefts[i].remove();
//     }
//   }
// }

// // 2.2. rightArr
// function handleSelectRight() {
//   for (let i = 1; i < selectRights.length; i++) {
//     rightArr.push(selectRights[i]);
//   }
//   console.log(rightArr);
// }

// 3. event 동작 확인
//---------------------------바로 >로 해야될 것 같다 -----------------------

/** if-else
// 0. html 요소 땡겨오기
let selectLefts; // 왼쪽 index
let selectRights; // 오른쪽 index

// 집어넣을 공간
const leftPut = document.getElementById("left"); // 왼쪽 select bock공간
const rightPut = document.getElementById("right"); // 오른쪽 select block 공간

// event 수행할 button
const buttons = document.querySelectorAll(".box > div > button"); // click 할 button들

// 2.selected된 배열 저장
// 헤맷던 부분 : innerHTML - 기존 내용 덮어버린다.

function handleClickButton(e) {
  // if 문을 통해서 하나로 합칠 것 -> switch-case로 가도 될듯한데 -> if else가 더 축약될 것 같다.
  const button = e.target.innerText;

  let rightArr = []; // right 추가할 공간
  let leftArr = []; // left 추가할 공간

  selectLefts = document.querySelectorAll("#left > option");
  selectRights = document.querySelectorAll("#right > option");

  // 2.1. 오른쪽으로 보낼 것. leftArr 상관 없다. rightArr 중요하다.
  if (button === ">") {
    // 2.1.1. right select 내부 요소 rightArr 담기 - innerHTML 의 덮어쓰기 문제 방지
    for (let selectRight of selectRights) {
      rightArr.push(selectRight.outerHTML);
    }
    // 2.1.2. rightArr에 요소 담기 - selected true인 것
    for (let i = 1; i < selectLefts.length; i++) {
      // 2.1.3. (selected === true)요소  1) rightArr에 추가 및 2) left select block에서 제거
      if (selectLefts[i].selected) {
        rightArr.push(selectLefts[i].outerHTML);
        selectLefts[i].remove(); // 2) left select block에서 selected 요소 제거
      }
    }
    rightPut.innerHTML = rightArr.toString(); // 1) right select block에 rightArr 담기
  }
  // 2.2. 왼쪽으로 보낼 것. rigthArr 상관 없다. leftArr 중요하다.
  else if (button === "<") {
    // 2.2.1. 좌측의 요소들 먼저 leftArr에 담기
    for (let selectLeft of selectLefts) {
      leftArr.push(selectLeft.outerHTML);
    }
    // 2.2.2. leftArr에 요소 담기 - selected true인 것
    for (let i = 1; i < selectRights.length; i++) {
      // 2.2.3. selected true 인 것 배열로 가져오기
      if (selectRights[i].selected) {
        leftArr.push(selectRights[i].outerHTML);
        selectRights[i].remove();
      }
    }
    leftPut.innerHTML = leftArr.toString();
  }
  // 2.3. 모든 요소 우측으로 보냄
  else if (button === ">>") {
    // 2.3.1. right select 내부 요소 rightArr 담기 - innerHTML 의 덮어쓰기 문제 방지
    for (let selectRight of selectRights) {
      rightArr.push(selectRight.outerHTML);
    }
    // 2.3.2. rightArr에 요소 담기 - 모든 것
    for (let i = 1; i < selectLefts.length; i++) {
      // 2.3.3.  모든 요소 1) rightArr에 추가 및 2) left select block에서 제거
      rightArr.push(selectLefts[i].outerHTML);
      selectLefts[i].remove();
    }
    rightPut.innerHTML = rightArr.toString();
  }
  // 2.4. 모든 요소 좌측으로 보냄
  else if (button === "<<") {
    // 2.4.1. 좌측의 요소들 먼저 leftArr에 담기
    for (let selectLeft of selectLefts) {
      leftArr.push(selectLeft.outerHTML);
    }
    // 2.4.2. leftArr에 요소 담기 - selected true인 것
    for (let i = 1; i < selectRights.length; i++) {
      // 2.4.3. selected true 인 것 배열로 가져오기
      leftArr.push(selectRights[i].outerHTML);
      selectRights[i].remove();
    }
    leftPut.innerHTML = leftArr.toString();
  }
}

// event 발생 - 모든 버튼을 인식한다.
for (let button of buttons) {
  button.addEventListener("click", handleClickButton);
}
 */

// // 5.2. 중복코드 따로 function 만들기 - moveAll()
// function moveAll(from, tos, tmpArr, putTag) {
//   // 5.2.1. 우측의 요소들 먼저 rightArr에 담기
//   for (let to of tos) {
//     tmpArr.push(to.outerHTML);
//   }

//   // 5.2.2. rightArr에 요소 담기 - 모든 것
//   for (let i = 1; i < from.length; i++) {
//     // 5.2.3. selected true 인 것 배열로 가져오기
//     if (from[i].selected) {
//       tmpArr.push(from[i].outerHTML);
//       from[i].remove();
//     }
//   }
//   putTag.innerHTML = tmpArr.toString();
// }
