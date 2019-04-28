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