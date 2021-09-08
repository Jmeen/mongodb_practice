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

// view 엔진 설정
app.set("view engine", "ejs"); // 뷰엔진으로 ejs 선언
app.set("views", __dirname + "/views");


// GET메서드 요청의 처리
// app.get(url, callback함수)
app.get("/", (req, resp) => {
  resp.status(200)
  .contentType("text/html;charset=utf-8")
  .render('home');
  // console.log("[GET] / ");
  // resp.writeHead(200, { 'content-type': 'text/html;charset=UTF-8' });
  // resp.write("Express Welcomes you!");
  // resp.end();
})

app.get('/welcome', (req, resp) => {
  // express의 추가 응답처리 mothod
  console.log("[get]/welcome");
  resp.writeHead(200, { 'content-type': 'text/html;charset=UTF-8' });
  resp.write("Welcome!");
  resp.end();

  // resp.status(200)  // express 모듈을 이용하면 304 코드가 뜸.
  //   .header({ 'content-type': 'text/html', 'charset': 'utf-8' })
  //   .send('welcome!');
})

// GET요청 파라미터의 처리
app.get("/request", (req, resp) => {
  console.log("[GET]/request");
  console.log(req.query);  // request query -> url 파라매터 객체
  console.log("[QUERY] name:" + req.query.name);

  let paramName = req.query.name;
  let paramAge = req.query.age;
  if (paramName === undefined || paramName.length == 0) {
    // 파라메터 값이 없을 경우.
    resp.status(404)
      .contentType("text/html;charset=utf-8")
      .send("name 정보를 확인할 수 없습니다.");
  } else {
    // 파라메터 정상 전달.
    resp.writeHead(200, { 'content-type': 'text/html;charset=UTF-8' });
    resp.write(`Welcome ${paramName}(${paramAge})!`);
    resp.end();
    // resp.status(200)
    //   .contentType("text/html;charset=utf-8")
    //   .send("name : " + paramName);
  }
})

// URL 파라미터 처리 (fancy url / pretty url)
// url의 경로 일부로 데이터를 전송하는 방식
app.get("/urlparam/:name", (req, resp) => {
  //url parameter는 params객체로 얻어온다.
  let userName = req.params.name;

  resp.writeHead(200, { 'content-type': 'text/html;charset=UTF-8' });
  resp.write(`<h1>Welcome ${userName}!</h1>`);
  resp.write("<p>URL파라미터를 전달받았습니다.</p>");
  resp.end();


  // resp.status(200)
  // .contentType("text/html;charset=utf-8")
  // .send("<h1>name:"+userName+"</h1>")
  // .send("<p>URL파라미터를 전달받았습니다.</p>")
})

// 뷰 엔진 활용
app.get("/render", (req, resp) => {
  // 응답 객체의 render 메서드 활용
  resp.contentType("text/html;charset=utf-8")
    .render("render");
})
// 서버 스타트
http.createServer(app).listen(app.get('port'), () => {
  console.log("test")
  console.log('Web Server is running');
});

