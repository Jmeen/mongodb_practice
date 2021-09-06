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
    { "title": "first Post" },
    {
        $set: {
            createAt: new Date(),
            updatedAt: new Date()
        }
    }
);

// 객체의 삭제 : .remove
post = db.posts.findOne();
db.posts.remove(post);

// 검색 조건 객체를 이용한 삭제
db.posts.remove({
    title: /second/
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
    "title": "first Post", "by": "bit", "likes": "10"
}

db.posts.insert({
    title: "second Post", by: "hong", likes: 50
})

db.posts.insert({
    title: "third Post", by: "bit", likes: 30
})

db.posts.insert({
    title: "fourth Post", by: "hone", likes: 10
})

// 여러 문서를 insert
db.posts.insertMany([
    { title: "fifty Post", by: "bit", likes: 100 },
    { title: "sixth Post", by: "bit", likes: 200 }
])

// 문서의 검색
// findOne : 조건을 만족하는 문서 중 한개를 반환
// find() : 조건을 만족하는 문서의 커서를 반환한다
db.posts.findOne();
db.posts.find()
// .pretty() 메서드 : BSON을 보기 좋게 출력

//검색 조건 연산자
// 같다 : {key:value}
db.posts.find({
    by: "bit"
})

// 크다 : $gt{key:{$gt:value}}
db.posts.find({
    likes: { $gt: 50 }
}).pretty

// 크거나 같다 : $gte
// 작다 : $lt
// 작거나 같다 : $lte

// 조건의 조합
// // and 연산
// {$and:[
//     {조건객체 1},
//     {조건객체 2}
// ]}
// 
// by작성자가 hong이고, likes가 30 이하인 것

db.posts.find({
    $and:[
        {by:"hong"},
        {likes:{$lte:50}}
    ]
})

// or 연산
// {$or:[
//     {조건객체 1},
//     {조건객체 2}
// ]}
// by가 hong이거나 likes가 10보다 크거나
db.posts.find({
    $or:[
        {by:"hong"},
        {likes:{$gt:60}}
    ]
})

// projection 
// find나 findone의 두번째 인자 객체로 출력 필드를 명시
// 출력을 제어할 수 있다.
// 1: 출력함, 0: 출력하지 않음

// 모든 문서들 중에서, _id 출력하지 않고 title, likes 정보 출력
db.posts.find({},{title:1,likes:1,_id:0})

// 출력의 제한
// .limit : 받아올 갯수를 제한
// .skip : documents중에서 건너뛸 문서의 갯수.
db.posts.find().limit(2).skip(2)

// data의 정렬
// .sort : 정렬 기준 객체
// 1: 오름차순, -1: 내림차순

db.posts.find({},{title:1,likes:1,_id:0}).sort({likes:-1})

//정렬 조건 여러개 주고싶을떄
db.posts.find({},{title:1,likes:1,_id:0}).sort({likes:1, title:-1})