"use strict";
// export object : 모듈을 내보내는 전역객체
exports.add = (num1, num2) => {
  return num1 + num2;
};
// add라는 이름으로 객체를 내보낸다.

exports.square = (length) => {
  return length ** 2;
};
// square라는 이름으로 객체를 내보냄
