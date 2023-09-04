// 반복되는 수 - 빙고판 만들기

let arr = [];
let arr2d = [];

let num1;
for (num1 = 1; num1 <= 25; num1++) {
  // 불명확하게 하지 말기
  arr.push(num1);
}

// shuffle
arr.sort((a, b) => Math.random() - 0.5);
console.log(arr);

// 행렬 생성
for (let i = 0; i < 5; i++) {
  arr2d.push(arr.splice(0, 5)); // splice
  // arr2d.push(arr.splice(i * 5, (i + 1) * 5)); // slice
}
console.log(arr2d);

const tableBody = document.querySelector(".table");
console.log(tableBody);

// // innerHTML 반복문
let table = "";

for (let i = 0; i < arr2d.length; i++) {
  table += "<tr>";
  for (let j = 0; j < arr2d[i].length; j++)
    table += "<td>" + arr2d[i][j] + "</td>";
  table += "</tr>";
}
// console.log(table);

tableBody.innerHTML = table;

// for (let i = 0; i < arr2d.length; i++) {
//   let row = document.createElement("tr");
//   for (let j = 0; j < arr2d[i].length; j++) {
//     let cell = document.createElement("td");
//     cell.textContent = arr2d[i][j];
//     row.appendChild(cell);
//   }
//   tableBody.appendChild(row);
// }

// html에 넣기
// let b;
// for (index = 0; index < 25; index++) {
//   b = document.getElementById(index);
//   b.innerHTML = arr[index];
// }

// console.log(document.getElementById(8));
