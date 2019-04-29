# Unclebae React - Next

## Chapter 06. using axios post and delete

이번에는 axios POST를 수행해볼 차례이다. 

### 서버 변경하기. 

이번에는 변경사항이 쩜 있으므로 서버 코드 전체를 아래와 같이 기술한다. 

```
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

```

내용을 보면 포스트 userList 를 전역으로 빼고, post 메소드와 최대 키를 받는 메소드를 추가했다. 

### 클라이언트 메인 컴포넌트 변경하기. 

react 에서 서버에 전송하여 변경된 데이터를 모든 하위 컴포넌트에 변경하기 위해서 메인 컴포넌트에
users 배열을 전역으로 옮겼다. 

그리고 태그로 객체와 메소드를 전달하도록 수정하였다. 

server/index.js

```
import React from 'react';
import Navigation from '../components/navigation';
import UserList from './userList';
import UserInsert from './userInsert';

// 메인 컴포넌트를 클래스로 선언하고, userList 에 있던 항목을 여기로 옮긴다. 
export default class Main extends React.Component {

    // userList 에 있던 state 
    state = {
        users: []
    }

    // users 를 변경하기 위해서 변경 메소드를 만들어 준다. 
    // 이 메소드는 UserList 컴포넌트에 전달할 것이다. 
    updateUserLists = (userList) => {
        this.setState({users: userList});
    }

    // 사용자 등록을 한 결과를 users 에 추가해주는 메소드를 선언한다. 
    // 이 메소드는 UserInput 컴포넌트에 전달할 것이다. 
    appendUser = (user) => {
        let users = this.state.users
        console.log(users)
        users.push(user);

        this.setState({users: users});
    }

    // 아래 UserInsert, UserList 가 변경된 것을 볼 수 있다. 
    // 태그로 컴포넌트에 객체, 메소드를 전달할 수 있으며, 해당 컴포넌트에서는 props 로 받는다. 
    render() {
        return (
            <div>
                <Navigation/>
                <h1>Hello React Next</h1>
                <UserInsert appendUser={this.appendUser.bind(this)}/>
                <UserList users={this.state.users} updateUserLists={this.updateUserLists.bind(this)}/>
            </div>
        )
    }
}
```

updateUserLists, appendUser 가 UserInsert, UserList 에 각각 태그값으로 전달됨을 확인하자. 

이는 각 컴포넌트에서 props 로 받게 된다. 

### UserList 수정하기. 

이제는 UserList 를 수정하자. UserList 는 처음 컴포넌트가 마운트되면 axios 를 이용하여 서버에서 사용자 정보를 받아온다. 

정상으로 받아온경우 Main 컴포넌트의 users 스테이트를 변경할 것이다 .

pages/userList.js

```
import React from 'react';
import axios from 'axios';

// 사용자 리스트를 노출하는 컴포넌트이다. 
// 처음 있던 state 가 없어진 것을 확인하자. 
export default class UserList extends React.Component {

    // 컴포넌트가 처음 마운트 되면 axios 를 이용하여 사용자 정보를 서버로 부터 가져온다. 
    componentDidMount() {
        axios.get('http://localhost:9000/api/users')
            .then((res) => {
                console.log(res);
                // 서버에서 가져온 유저 정보를 부모 메소드에 반영하도록 한다. 
                this.props.updateUserLists(res.data)
            })
            .catch((err) => console.log(err));
    }   

    // 키를 리스트에 설정해준 것을 확인하자. 리스트에서는 키를 꼭 설정해주어야한다. 
    render() {
        return (
            <div>
                <ul>
                    {this.props.users.map(user => <li key={user.id}>{user.name}</li>)}
                </ul>
            </div>
        )
    }
}
```

### UserInsert 컴포넌트로 사용자 등록하기. 

이번에는 사용자를 등록해 볼 것이다. 

사용자 등록의 경우 axios의 post 메소드를 이용하며, 결과가 전달이 되면, 사용자를 addUser 를 통해서 추가하도록 한다. 

그리고 모든 작업이 완료되면 폼을 초기화 한다. 이때 setState 를 이용한다. 

pages/userInset.js

```
import React from 'react';
import axios from 'axios';

// 사용자 정보를 입력 받도록 컴포넌트를 만들었다. 
export default class UserInsert extends React.Component {

    // 사용자 정보는 이름, 이메일이다. 상태를 여기서 설정해준다. 
    state = {
        name:'',
        email:''
    }

    // 추가 버튼을 클릭한경우 해당 메소드가 실행된다. 
    handleSubmit = event => {
        event.preventDefault();

        const user = {
            name: event.target.name.value,
            email: event.target.email.value,
        };

        // axios post 를 사용하여 전달한다. 
        axios.post('http://localhost:9000/api/users', user)
            .then(res => {
                // 결과가 정상으로 오면 부모 컴포넌트인 Main 컴포넌트의 메소드를 호출하여 데이터 갱신함 
                this.props.appendUser(res.data);

                // 결과가 정상으로 오면 해당 폼 정보를 클리어 해준다. 
                this.setState({name:'', email:''});
            })
            .catch(err => console.log(err));
    }

    // 이름 폼 필드가 변경이 된경우 상태값을 변경해준다. 
    handleNameChane = event => {
        this.setState({name: event.target.value});
    }
    
    // 이메일 필드가 변경되면 상태값을 변경해준다. 
    handleEmailChange = event => {
        this.setState({email: event.target.value});
    }

    // 입력 필드가 변경이 된경우 처리를 위해서 onChange 태그로 메소드와 함께 연결한 것을 확인하자. 
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <label>
                    Person Name:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleNameChane}/>,
                    User Email:
                    <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange}/>,
                </label>
                <button type="submit">Add</button>
                </form>
            </div>
        )
    }


}
```

지금까지 사용자를 추기하는 작업을 하공, 리스트에 반영하는 작업을 해봤다.
