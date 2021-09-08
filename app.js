'use strict'
const { resolvePtr } = require("dns");
const { response } = require("express");
// express 모듈 불러오기
const express = require("express");

const http = require('http'); // 노드 기본 http 모듈

// express 생성
const app = express();

// 설정, 속성을 집어넣을 때
// set(key, value)
// get(key)

// 환경변수에 pORT가 설정되어있으면, 그 값을 사용,
// 설정이 안되어있으면 3000 사용
app.set('port', process.env.PORT || 3000);

// 로거 추가
// npm install logger
// 로거 불러오기
const logger = require("morgan"); // 로거 불러오기
// 로거 express에 추가 : 미들웨어 추가
app.use(logger('dev'));

// 정적 웹의 제공
// 미들웨어 express.static 미들웨어 함수를 등록
app.use(express.static(__dirname + "/public"))

// GET메서드 요청의 처리
// app.get(url, callback함수)
app.get("/", (req, resp) => {
  console.log("[GET] / ");
  resp.writeHead(200, { 'content-type': 'text/heml', 'charset': 'utf-8' });
  resp.write("Express Welcomes you!");
  resp.end();
})

app.get('/welcome', (req, resp) => {
  // express의 추가 응답처리 mothod
  console.log("[get]/welcome");
  resp.status(200)
    .header({ 'content-type': 'text/html', 'charset': 'utf-8' })
    .send('welcome!');
})

// GET요청 파라미터의 처리
app.get("/request", (req, resp) => {
  console.log("[GET]/request");
  console.log(req.query);  // request query -> url 파라매터 객체
  console.log("[QUERY] name:" + req.query.name);

  let paramName = req.query.name;
  if (paramName === undefined || paramName.length == 0) {
    // 파라메터 값이 없을 경우.
    resp.status(404)
      .contentType("text/html;charset=utf-8")
      .send("name 정보를 확인할 수 없습니다.");
  } else {
    // 파라메터 정상 전달.
    resp.status(200)
      .contentType("text/html;charset=utf-8")
      .send("name : " + paramName);
  }

  let paramAge = req.query.Age;

})

// 서버 스타트
http.createServer(app).listen(app.get('port'), () => {
  console.log("test")
  console.log('Web Server is running');
});

