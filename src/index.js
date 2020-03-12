import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

import './styles.css'
import TodoItem from './todo-item'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      todo: "",
      todos: []
    }
  }

  renderTodoItems = () => {
    return this.state.todos.map(item => {
      return <TodoItem key={item.id} item={item}/>
    })
  }

  componentDidMount() {
    fetch("http://localhost:5000/todos")
      .then(response => response.json())
      .then(data => {
        this.setState({
          todos: data
        })
      })
  }

  handleSubmit = (event) => {
    axios({
      method: "post",
      url: 'http://localhost:5000/todo',
      headers: { "content-type": "application/json" },
      data: {
        title: this.state.todo,
        done: false
      }
    }).then(response => {
      // console.log("Response from post", response)
      this.setState({
        todos: [...this.state.todos, response.data],
        todo: ""
      })
    }).catch(error => {
      console.log("error in handleSubmit", error)
    })
    event.preventDefault()
  }

  handleChange = (event) => {
    this.setState({
      todo: event.target.value
    })
  }

  render() {
    return (
      <div className="app">
        <h1>Todo List</h1>
        <form className="add-todo" onSubmit={this.handleSubmit}>
          <input 
            type="text"
            placeholder="Add Todo"
            value={this.state.todo}
            onChange={this.handleChange}
          />

          <button
            type="submit"
          >Submit</button>
        </form>

        {this.renderTodoItems()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
