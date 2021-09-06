//현재 몽고 DB에 있는 DB의 목록 확인
show dbs

// 데이터 베이스의 사용
use local

// 확인
db

// 현재 collection 확인
show collections

// 삭제를 위한 절차는 필요없고
// 삭제를 위해서는 db.dropDatabase

// check DB status
db.stats();

// cehck specific collection
db.startup_log.stats();

// select "mydb" database
use mydb

// check select database
db

// insert title : First Post
db.posts.insert({ "title:": "First Post" });

// search Document
// 1 document search
db.posts.findOne(

    {
        "_id": ObjectId("6135987f112aaded93cd473b"),
        "title:": "First Post"
    })

// JSON 객체를 만들기
// Save : document에 _id필드가 없으면 Insert(삽입)
let post = {
    "title": "second Post"
}
db.posts.save(post);


// 문서 한개를 선택
post = db.posts.findOne();
post
// _id가 설정되어 있다.
// 스키마가 정해져 있지 않다.
post.createAt = new Date();
db.posts.save(post);


// 기존 문서의 갱신(update)
// db.컬렉션명.update(
//     {변경문서의 조건},
//     {$set: {업데이트할 내용}}
// );

db.posts.update(
    { "title": "First Post" },
    {
        $set: {
            createAt: new Date(),
            updatedAt: new Date()}
    }
);

// 객체의 삭제 : .remove
post = db.posts.findOne();
db.posts.remove(post);

// 검색 조건 객체를 이용한 삭제
db.posts.remove({
    title:/second/
})
// second는 정규 표현식
// 문자열이 포함된 패턴을 찾아라.


// db.posts 컬랙션에
// title: "first Post", by:"bit", likes:10
// title: "second Post", by:"hong", likes:50
// title: "third Post", by:"bit", likes:30
// title: "fourth Post", by:"hone", likes:10
// insert 연습

post = {
    "title": "first Post", "by":"bit", "likes":"10"
}

db.posts.insert({
    title: "second Post", by:"hong", likes:50
})

db.posts.insert({
    title: "third Post", by:"bit", likes:30
})

db.posts.insert({
    title: "fourth Post", by:"hone", likes:10
})

// 여러 문서를 insert
db.posts.insertMany([
    {title:"fifty Post", by:"bit",likes:100},
    {title:"sixth Post", by:"bit",likes:200}
])

// 문서의 검색
// findOne : 조건을 만족하는 문서 중 한개를 반환
// find() : 조건을 만족하는 문서의 커서를 반환한다
db.posts.findOne();
db.post.find()