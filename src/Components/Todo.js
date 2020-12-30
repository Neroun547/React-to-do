import React, { Component } from 'react';
import './style-Todo/style.css'

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            inputVal: {}
        }
    }

    inputChange = (e) => {
        this.setState(state => ({
            inputVal: {
                id: state.list.length,
                text: e.target.value,
                check: false
            }
        }))
    }

    formSubmit = (e) => {
        e.preventDefault();
        if(document.getElementById('input').value === ''){
            alert('Write text in input!');
            return false;
        }
        document.getElementById('input').value = '';
        this.setState(state => ({
            list: [...state.list, state.inputVal],
            inputVal: {}
        }))
    }

    checkItem = (e, checked) => {
        this.setState(state => ({
            list: state.list.filter((el) => {
                if (el.id === e) {
                    el.check = checked;
                    return el;
                }
            }
            )
        }))
    }

    deleteItem = (item) => {
        this.setState(state => ({
            list: state.list.filter((el) => el.id !== item)
        }))
    }

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.formSubmit} >
                    <input id='input' onChange={this.inputChange} />
                    <button type="submit">Add item</button>
                </form>
                <ul>
                    {this.state.list.map((el) => {
                        if (el.check) {
                            return <li key={el.id} onClick={() => this.checkItem(el.id, false)}
                                className="item-check">{el.text}<span onClick={() => this.deleteItem(el.id)} >X</span></li>
                        } else {
                            return <li key={el.id} onClick={() => this.checkItem(el.id, true)}
                                className="item-todo">{el.text}<span onClick={() => this.deleteItem(el.id)} >X</span></li>
                        }
                    })}
                </ul>
            </div>
        )
    }
}