'use strict'
const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();

module.exports = (app) => {
  router.get(["/friends/list", "/friends"], (req, resp) => {
    // express에서 DB객체 꺼내고 query 수행
    // 결과를 template에 반영

    let db = app.get('db');
    // 쿼리 수행
    db.collection('friends').find().toArray()
      .then(result => {
        // console.log(result);
        //결과를 템플릿에 반영
        resp.render("friends_list", { friends: result });

      })
      .catch(reason => {
        console.error(reason)
      })

    // resp.status(200)
    //   .contentType("text/html;charset=utf-8")
    //   .send("<p>Web Router 응답</p>");
  })

  router.get("/friends/new", (req, resp) => {
    resp.render("friend_insert_form");
  })

  // 새 친구 등록 액션
  router.post("/friends/save", (req, resp) => {
    //폼 정보는 req.body로 불러온다.
    console.log(req.body)
    let document = req.body;
    document.num = parseInt(document.num);

    let db = app.get('db');

    db.collection('friends')
      .insertOne(document)
      .then(result => {
        console.log(result);
        resp.status(200)
          .send("SUCCESS: 친구를 추가했습니다.");
      })
      .catch(reason => {
        console.error(reason);
        resp.status(500)
          .send("ERR: 등록실패");
      })

  })
  return router;
}