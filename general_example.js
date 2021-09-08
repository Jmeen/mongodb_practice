"use strict";
const Ticker = require("./modules/ticket");

let count = 0; // 카운트 변수

// tick 카운트를 받으면 처리할 리스너
process.on("tick", () => {
  count++;
  console.log(count, "초가 흘렸습니다.");

  if (count > 10) {
    ticker.emit("stop");
  }
});

// ticker 생성
let ticker = new Ticker(process);
ticker.start();
