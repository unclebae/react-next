const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var userList = [
	{
		id: 1,
		name: "kido",
		email: "kido@kido.com"
	},
	{
		id: 2,
		name: "skt",
		email: "skt@skt.com"
	},
	{
		id: 3,
		name: "skb",
		email: "skb@skb.com"
	},
	{
		id: 4,
		name: "IronMan",
		email: "ironMan@marvel.com"
	}
];

// 사용자 정보를 밖으로 빼고, 단지 사용자 리스트를 반환하는 역할만 한다. 
app.get("/api/users", (req, res, next) => {
	res.send(userList);
});

// 사용자를 추가히기 위해서 포스트 메소드를 만들었다. 
app.post("/api/users", (req, res, next) => {
	userInfo = req.body;

	if (userInfo && userInfo.name && userInfo.email) {
		const newId = getNewId();
		userInfo.id = newId;
        userList.push(userInfo);
		res.status(200).json(userInfo);
	} else {
		res.status(400).json({ message: "Invalid request" });
	}
});

// 신규 아이디를 찾아온다. 가장 높은 아이디를 가져오도록 한다. 
function getNewId() {
	var max = userList.reduce(function(prev, current) {
        const maxObj = prev.id > current.id ? prev : current;
        return maxObj
    });

    
    return max.id + 1;
}

const port = process.env.NODE_ENV === "production" ? 80 : 9000;

const server = app.listen(port, function() {
	console.log("Server listening on port " + port);
});
