"use strict";
const MongoClient = require("mongodb").MongoClient; //로드
const url = "mongodb://127.0.0.1:27017"; //접속 url
const dbname = "mydb";

// 클라이언트 생성
const client = new MongoClient(url, { useNewUrlParser: true });

// 접속 테스트
function testConnect() {
  client.connect((err, client) => {
    // 콜백 함수
    // if (err) {
    //   console.log(err);
    // } else {
    //   console.log(client);
    //   client.close;
    // }

    client
      .connect()
      .then((client) => {
        console.log(client);
        client.close();
      })
      .catch((reson) => {
        Console.error(reson);
      });
  });
}

// testConnect();

// 한개 문서 insert
// INSERT INTO mydb.friends value(...);
// db.friends.insert({문서})

function testInsertOne(name) {
  client
    .connect()
    .then((clinet) => {
      //DB선택
      const db = client.db("mydb");
      //컬렉션 선택 후 쿼리 수행
      // console.log(db.collection("mydb"))
      db.collection("mydb")
        .insertOne({ name: name })
        .then((result) => {
          console.log(result);
          console.log("새로 삽입된 문서의 ID :", result.insertedId);
          console.log(result.insertedCOunt, "row inserted");
          client.close();
        });
    })
    .catch((reason) => {
      console.log(reason);
    });
}
// testInsertOne("강백호")

// 다수 문서 삽입
// insert into freiends value(...),(...),(...)
// db.friends.insertMany([{doc},{doc},...])

function testInsertMany(names) {
  console.log(names, "는 배열인가?", Array.isArray(names));
  if (Array.isArray(names)) {
    // name가 배열이면 실행
    client.connect().then((client) => {
      const db = client.db("mydb");

      // 문서의 배열 생성
      let data = names.map((item) => {
        return { name: item };
      });
      console.log(data);
      db.collection("friends")
        .insertMany(data)
        .then((result) => {
          console.log(result.insertedCOunt, "개 삽입완료");
          client.close();
        });
    });
  } else {
    testInsertOne(names);
  }
}

// testInsertMany(["서태웅", "송태섭", "채치수", "정대만"]);
// testInsertMany("장길산")