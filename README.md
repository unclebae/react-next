# Unclebae React - Next

## Chapter 04. add Style sheet with JSX

next 에서는 JSX 로 스타일 시트도 함께 컴파일 되도록 지원을 해주고 있습니다. 

pages/navigations.js 파일을 열어 다음과 같이 추가해 줍니다. 

div 태그에 className="navbar" 라고 지정해 준 부분과 

<style jsx> 로 된 부분을 주의깊게 살펴보세요. 

```
import Link from 'next/link';

const Navigation = () => (
    <div className="navbar">
        <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about"><a>About</a></Link></li>
        </ul>

        <style jsx>{`
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
        `
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