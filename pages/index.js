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