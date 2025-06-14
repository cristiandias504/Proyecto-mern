import React, { Component } from 'react'
import axios from 'axios'
import DatePiker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'

import { withRouter } from './withRouter' // Ajusta la ruta según tu estructura

class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://backend:4000/api/users')
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        })

        const { id } = this.props.router.params

        if (id){
            this.setState({
                editing: true,
                _id:id
            })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        console.log("Estado de editing " + this.state.editing)
        console.log("ID: " + this.state._id)

        if (this.state.editing) {
            console.log("if " + this.state.editing)
            await axios.put('http://backend:4000/api/notes/' + this.state._id, newNote)
        } else {
            console.log("if " + this.state.editing)
            await axios.post('http://backend:4000/api/notes', newNote);
        }
        window.location.href = '/';
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date });
    }

    render() {
        return (
            <div className='col-md-6 offset-md-3'>
                <div className='card card-body'>
                    <h4>Create a Note</h4>

                    <div className='form-group'>
                        <select
                            className='form-control'
                            name="userSelected"
                            onChange={this.onInputChange}
                        >
                            {
                                this.state.users.map(user =>
                                    <option key={user} value={user}>
                                        {user}
                                    </option>
                                )
                            }
                        </select>
                    </div>

                    <div className='form-group'>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Title'
                            name='title'
                            onChange={this.onInputChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <textarea
                            name="content"
                            className='form-control'
                            placeholder='Content'
                            onChange={this.onInputChange}
                            required
                        >
                        </textarea>
                    </div>

                    <div className='form-group'>
                        <DatePicker
                            className='form-control'
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>

                    <form onSubmit={this.onSubmit}>

                        <button type="submit" className='btn btn-primary'>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(CreateNote)