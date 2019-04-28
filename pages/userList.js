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