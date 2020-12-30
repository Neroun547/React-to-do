import React, { Component } from 'react';
import './style-Todo/style.css'

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            inputVal: {},
            input:''
        }
    }

    inputChange = (e) => {
        console.log(this.state.input);
        this.setState(state => ({
            input:e.target.value,
            inputVal: {
                id: state.list.length,
                text: e.target.value,
                check: false
            }
        }))
    }

    formSubmit = (e) => {
        e.preventDefault();
        if(this.state.input === ''){
            alert('Input must have 1 or more symbols');
            return;
        }
        this.setState(state => ({
            list: [...state.list, state.inputVal],
            inputVal: {},
            input:''
        }))
    }

    checkItem = (e) => {
        this.state.list.map((el) => {
            if(el.id === e){
                el.check = !el.check;
                return;
            }
        })
        this.setState(state => ({
            list: [...state.list]
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
                    <input id='input' value={this.state.input} onChange={this.inputChange} />
                    <button type="submit">Add item</button>
                </form>
                <ul>
                    {this.state.list.map((el) => {
                        if(el.check){
                            return (  
                            <li className="item-check" key={el.id} onClick={() => this.checkItem(el.id) } >
                                {el.text}
                            <span onClick={ () => this.deleteItem(el.id)} >X</span></li>
                            )
                        }else{
                            return (  
                                <li className="item-todo" key={el.id} onClick={() => this.checkItem(el.id) } >
                                    {el.text}
                                <span onClick={ () => this.deleteItem(el.id)} >X</span></li>
                                )
                        }
                    })}
                    
                </ul>
            </div>
        )
    }
}