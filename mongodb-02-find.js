"use strict";

// const mongoclint = require('mongodb').MongoClient;
// 객체 구조 할당 방식
const { MongoClient } = require("mongodb");
// const {
//   testInsertOneDoc,
//   testInsertManyDocs,
//   testDeleteAll,
// } = require("./mongodb-01-curd");

const url = "mongodb://127.0.0.1:27017"; // 접속 URL
const client = new MongoClient(url, { useNewUrlParser: true });

// 문서 한개 가져오기
function tsetFindOne() {
  client.connect().then((client) => {
    const db = client.db("mydb");
    db.collection("friends")
      .findOne()
      .then((result) => {
        console.log(result);
        client.close();
      })
      .catch((reason) => {
        console.error(reason);
        client.close();
      });
  });
}

// tsetFindOne();

// 문서 전체 가져오기
function testFindAll() {
  client.connect().then((client) => {
    const db = client.db("mydb");
    db.collection("friends")
      .find()
      .toArray()
      .then((result) => {
        // console.log(result);
        for (let i = 0; i < result.length; i++) {
          console.log(result[i]);
        }
        client.close();
      })
      .catch((reason) => {
        console.error(reason);
        client.close();
      });
  });
}

// testFindAll();

// 조건 검색
// select * from friends where name = ~~;
// 조건 객체 : {name : '값'}
function testtFindByName(name) {
  client.connect().then((client) => {
    const db = client.db("mydb");
    db.collection("friends")
      .find({ name: name })
      .toArray()
      .then((result) => {
        for (let name of result) {
          console.log(name);
        }
        client.close();
      })
      .catch((reason) => {
        console.error(reason);
      });
  });
}
// testtFindByName("정대만");

// 조건 조합 검색
// select * from where con1 AND(or) con2

function testFindCombinedWhere() {
  client.connect().then((client) => {
    const db = client.db("mydb");
    db.collection("friends")
      .find({
        //포지션이 forward이고, 번호가 11번
        // $and: [{ position: "forward" }, { num: 11 }]

        num: { $gte: 10 },
      })

      .toArray()
      .then((result) => {
        for (let name of result) {
          console.log(name);
        }
        client.close();
      })
      .catch((reason) => {
        console.error(reason);
      });
  });
}

// testFindCombinedWhere();

//projection
function testFindProduction() {
  client.connect().then((client) => {
    const db = client.db("mydb");
    db.collection("friends").find({})
    
      // .project({ name: 1, position: 1 }) // 표시할 필드 선택 1: 보이기, 0 안보이기
      .project({_id:0})
      .skip(1) // 1문서 건너뛰기
      .limit(2) // 2 문서 표시
      .toArray()
      .then((docs) => {
        for (let doc of docs) {
          console.log(doc);
        }
        client.close();
      })
      .catch((reason) => {
        console.error(reason);
      });
  });
}
testFindProduction();
