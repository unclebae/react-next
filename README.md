# Unclebae React - Next

## Chapter 05. using axios

axios 는 HTTP Request 를 처리하는 라이브러리이다. Axios 는 기본적으로 Promise 기반의 API 를 제공한다. 

설치를 하기 위해서 다음과 같이 axios 패키지 라이브러리를 설치한다. 

```
npm install axios --save
```

사용자 정보를 받아와서 화면에 출력하는 예제를 알아볼 것이다. 

### 사용자 목록을 내려주는 서버 만들기. 

우선 우리에게 필요한 것은 서버를 먼저 만들어 주는 것이다.

우리는 여기서 express, body-parser, cors 를 설치하고 간단한 사용자 정보를 처리하는 서버를 만들것이다. 

```
mkdir node_server
cd node_server
npm init -y
```

기본적으로 node_server 를 초기화 한다. 

```
npm install express body-parser cors --save
```

를 수행하여 express, body-parser, cors 를 설치해준다. 

### 간단한 유저 서비스 api 만들기 

node_server/server.js 를 만들어준다.  그리고 다음 내용을 추가한다. 

```
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

app.get('/api/users', (req, res, next) => {
    userList = [
        {
            "id":1,
            "name":"kido",
            "email":"kido@kido.com"
        },
        {
            "id":2,
            "name":"skt",
            "email":"skt@skt.com"
        },
        {
            "id":3,
            "name":"skb",
            "email":"skb@skb.com"
        },
        {
            "id":4,
            "name":"IronMan",
            "email":"ironMan@marvel.com"
        },
    ]

    res.send(userList);
});


const port = process.env.NODE_ENV === 'production' ? 80 : 9000

const server = app.listen(port, function() {
    console.log('Server listening on port ' + port)
})
```

보는바와 같이 매우 간단한 코드이다. 

```
curl http://localhost:9000/api/users
```

결과는 다음과 같아 나타난다. 

```
[  
   {  
      "id":1,
      "name":"kido",
      "email":"kido@kido.com"
   },
   {  
      "id":2,
      "name":"skt",
      "email":"skt@skt.com"
   },
   {  
      "id":3,
      "name":"skb",
      "email":"skb@skb.com"
   },
   {  
      "id":4,
      "name":"IronMan",
      "email":"ironMan@marvel.com"
   }
]
```

이제 서버는 준비 되었다. 

클라이언트에서 axios 를 사용해보자. 

### 사용자 리스트 컴포넌트 생성하기. 

pages/userList.js 파일을 만들고 컴포넌트를 하나 생성한다. 

```
import React from 'react';
import axios from 'axios';

export default class UserList extends React.Component {

    state = {
        users: []
    };

    componentDidMount() {
        axios.get('http://localhost:9000/api/users')
            .then((res) => {
                console.log(res);
                this.setState({users: res.data})
            })
            .catch((err) => console.log(err));
    }   

    render() {
        return (
            <div>
                <ul>
                    {this.state.users.map(user => <li>{user.name}</li>)}
                </ul>
            </div>
        )
    }
}
```

### 컴포넌트 사용하기. 

pages/index.js 파일을 다음과 같이 수정하고 데브 모드로 실행해보자. 

```
import Navigation from '../components/navigation';
import UserList from './userList';

export default() => (
    <div>
        <Navigation/>
        <h1>Hello React Next</h1>
        <UserList />
    </div>

)
```

결과를 살펴보면 사용자 목록을 리스트로 나열된 것을 확인할 수 있을 것이다. 

--------------


## Chapter 04. add Style sheet with JSX

next 에서는 JSX 로 스타일 시트도 함께 컴파일 되도록 지원을 해주고 있습니다. 

pages/navigations.js 파일을 열어 다음과 같이 추가해 줍니다. 

div 태그에 className="navbar" 라고 지정해 준 부분과 

```style jsx>``` 로 된 부분을 주의깊게 살펴보세요. 

```
import Link from 'next/link';

const Navigation = () => (
    <div className="navbar">
        <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about"><a>About</a></Link></li>
        </ul>

        <style jsx>{'  // 이부분은 따옴표가 아니라. 멀티라인 표시를 위한 역 따옴표임
            div.navbar {
                background-color: #f7cba3;
                margin: 10 0;
                padding: 1px;
            }

            ul {
                list-style: none;
                display: flex;
            }

            ul li {
                font-size: 20px;
                margin-right: 20px;
            }

            ul li a {
                text-decoration: none;
                padding: 10px;
                border-radius: 5px;
            }

            ul li a:hover {
                background-color:#f2c43a;
            }
        '  // 이부분은 따옴표가 아니라. 멀티라인 표시를 위한 역 따옴표임
        }</style>
    </div>
)

export default Navigation;
```

----


## Chapter 03. Add Component for DRY

이번에는 반복되는 링크 페이지를 하나의 컴포넌트로 만들어서 추가해보도록 하겠습니다. 

mkdir components 를 통해서 컴포넌트를 하나 만듭니다. 

그리고 components/navigation.js 를 만들겠습니다. 

----

## Chapter 02. Page Routing

이번에는 여러개의 파일을 만들고, 라우팅을 해보는 예제를 살펴 보겠습니다. 

### About 페이지 만들기. 

pages/about.js 파일을 만들어 줍니다. 그리고 아래와 같이 코드를 넣어줍니다 .

```
const About = () => (
    <div>
        <h1>About me</h1>
        <h2>Name: Kido</h2>
        <h2>Job: Developer</h2>
    </div>
)

export default About;
```

#### 내용 확인하기. 

http://localhost:3000/about 

위와 같이 해주면 about 페이지가 열립니다. 

보시는 바와 같이 pages 가 기본 디렉토리 입니다. 

### Link 로 페이지 이동하기. 

Link 를 연결하고 이제는 페이지 이동하기를 해보겠습니다. 

pages/index.js 파일을 열고 다음과 같이 바꿔주세요. 

```
import Link from 'next/link';

export default() => (
    <div>
        <h1>Hello React Next</h1>

        <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about"><a>About</a></Link></li>
        </ul>
    </div>

)
```

보시는 바와 같이 우리는 Link 모듈을 추가했습니다. 

그리고 사용은 단순히 <Link href="/about"> 와 같이 페이지 이름을 지정해 주었습니다. 

```
import Link from 'next/link';
...
<Link href="/about"><a>About</a></Link>
```

그리고 pages/about.js 파일도 다음과 같이 변경해주면 됩니다. (동일하죠?)

```
import Link from 'next/link';

const About = () => (
    <div>
        <h1>About me</h1>
        <h2>Name: Kido</h2>
        <h2>Job: Developer</h2>

        <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about"><a>About</a></Link></li>
        </ul>
    </div>
)

export default About;
```

방법은 똑같습니다. 다시 실행 결과를 http://localhost:3000 으로 확인해보세요. 

매우 쉽게 페이지 라우팅을 구현했습니다. 


----

## Chapter 01. Install & Setup

### install

react-next 를 이용하기 위해서 다음 패키지를 설치해 줍니다. 

```
$ npm init
$ npm install next react react-dom
```

### setup

이제는 실행 스크립트를 작성해 줍니다. 실행하고 나서는 아래와 같이 실행해 주면 됩니다. 

```
npm run dev
npm run build
npm run start
```

open package.json

```
{
    "scripts": {
        "dev": "next",
        "build": "next build",
        "start": "next start"
    }
}
```

### make a directory that name is pages.

next 에서는 반드시 pages 디렉토리가 있어야합니다. 

이 디렉토리에서 모든 라우팅, 서버사이드 렌더링의 기본 위치가 됩니다. 

우리의 첫번째 튜토리얼에서는 pages/index.js 파일이 존재합니다. 

mkdir pages

### 실행하고 결과 확인하기. 

npm run dev

브라우저에서 다음경로로 열어서 내용을 확인합니다. 

http://localhost:3000 