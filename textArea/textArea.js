// 1. elements 가져오기
const totals = document.getElementsByTagName("input"); // 모든 input
const sports = document.getElementsByClassName("sports"); // 전체 제외한 input
const textArea = document.getElementById("textarea"); // textarea

// 2. 전체 체크, 전체 체크 취소
// value 넣을 배열 등록
let text = [];
totals[0].onclick = function () {
  for (let sport of sports) {
    // 2.1. 전체 체크 시키기
    sport.checked = totals[0].checked;
    // 4.1. 체크된 요소 value 배열에 넣기
    // 4.1. 전체 check true일 때, 전부 push , 전체 check false일 때, 초기화
    totals[0].checked ? text.push(sport.value) : (text = []);
  }
  // 5. 배열값 string으로 textArea에 넣기
  textArea.value = text.toString();
};

// 3. 부분체크, 부분체크 취소
// 3.1. text를 작성하기 위해서 숫자로 체크
for (const total of totals) {
  // 3.2. 모든 input 중 onchange가 발생시 function 수행
  total.onchange = function () {
    // 3.3. sports input 중 checked true 이면 num++
    let num = 0;
    for (const sport of sports) {
      // sports.checked가 true일 때 +1
      if (sport.checked) {
        num++;
        // 4.3. 개별 요소 추가 - push
        text.push(sport.value);
      }
      // 4.4. else 해줘야지 checked false인거에 한해서 적용이 된다.
      else {
        // 4.4. 개별 요소 제거 - filter
        // 4.4. checked false인거 filter 제거
        text = text.filter((item) => item !== sport.value);
      }
    }
    // 3.4. num = 4 이면 전체 checked true 아니면 false
    totals[0].checked = num == 4 ? true : false;

    // 5.1 중복 요소 제거
    text = text.filter((value, index) => text.indexOf(value) == index);
    // 5. 배열값 string으로 textArea에 넣기
    textArea.value = text.toString();
  };
}

// // 4. text창에 checked된 것만 넣기
// for (const total of totals) {
//   total.onchange = function () {
//     // 4.2. 개별 check 일 때
//     if (total.checked && total != totals[0]) {
//       for (const label of labels) {
//         if (total.id == label.getAttribute("for")) {
//           text.push(label.textContent);
//         }
//       }
//       textArea.innerHTML = text.toString(); //text.toString()
//     }
//     // 4.4. 개별 check 취소 일 때
//     else if (!total.checked && total != totals[0]) {
//       for (const label of labels) {
//         if (total.id == label.getAttribute("for")) {
//           text = text.filter((item) => item !== label.textContent);
//         }
//       }
//       textArea.innerHTML = text.toString(); //text.toString()
//     }
//   };
// }

// // 4. text창에 checked된 것만 넣기
// // input == label 비교 -> label.textContent -> textarea 넣기
// let text = [];
// for (const total of totals) {
//   total.onchange = function () {
//     // 4.1 전체 check 일 때
//     if (total == totals[0] && total.checked) {
//       text = ["농구", "축구", "야구", "배구"];
//       textArea.innerHTML = text.toString();
//     }
//     // 4.2. 개별 check 일 때
//     else if (total.checked && total != totals[0]) {
//       for (const label of labels) {
//         if (total.id == label.getAttribute("for")) {
//           text.push(label.textContent);
//         }
//       }
//       textArea.innerHTML = text.toString(); //text.toString()
//     }
//     // 4.3. 전체 check 취소 일 때
//     else if (total == totals[0] && !total.checked) {
//       text = [];
//       textArea.innerHTML = text.toString();
//     }
//     // 4.4. 개별 check 취소 일 때
//     else if (!total.checked && total != totals[0]) {
//       for (const label of labels) {
//         if (total.id == label.getAttribute("for")) {
//           text = text.filter((item) => item !== label.textContent);
//         }
//       }
//       textArea.innerHTML = text.toString(); //text.toString()
//     }
//   };
// }

// 2. 전체 체크, 전체 체크 취소
// totals[0].onclick = function totalClick() {
//   if (totals[0].checked == true) {
//     for (let check of checks) {
//       check.checked = true;
//     }
//   } else {
//     for (let check of checks) {
//       check.checked = false;
//     }
//   }
// };
