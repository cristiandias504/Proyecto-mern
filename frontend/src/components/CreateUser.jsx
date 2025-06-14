import React, { Component, use } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        users:  [],
        username: ''
    }

    async componentDidMount(){
        const res = await axios.get('http://backend:4000/api/users');
        this.setState({users: res.data});
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async e => {
        await axios.post('http://backend:4000/api/users', {
            username: this.state.username
        })
        //e.preventDefault();
    }

    deleteUser = async (id) => {
        await axios.delete('http://backend:4000/api/users/' + id)
        const res = await axios.get('http://backend:4000/api/users');
        this.setState({users: res.data});
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-4'>
                    <div className='card card-body'>
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <input 
                                    type="text"
                                    className='form-control'
                                    onChange={this.onChangeUsername}/>
                            </div>
                            <button type="submit" className='btn btn-primary'>
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className='col-md-8'>
                    <ul className='list-group'>
                        {
                            this.state.users.map(user => (
                                <li 
                                    className='list-group-item list-group-item-action'
                                    key={user._id}
                                    onDoubleClick={() => this.deleteUser(user._id)}
                                    >
                                    {user.username}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
