"use strict";

const { prependListener } = require("process");

// 내장객체
// console
// process
// exports

// process 객체
console.log(
  process.version, // node 버전
  process.platform, // 운영체제 종류
  process.arch // 프로세서 아키텍쳐
);

console.log(process.versions); // 종속된 프로그램의 버전들
console.log(process.env); // 환경 정보

// global 변수
console.log(__dirname); // 현재 모듈의 디렉터리
console.log(__filename);    // 현재 모듈의 file명
