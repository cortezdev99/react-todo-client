import React, { Component } from 'react'

export default class TodoItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      done: props.item.done
    }
  }

  toggleDone = () => {
    fetch(`http://localhost:5000/todo/${this.props.item.id}`, {
      method: "PATCH",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        done: !this.state.done
      })
    }).then(response => {
      console.log("toggleDone", response)
      this.setState({
        done: !this.state.done
      })
    }).catch(error => {
      console.log("error in toggleDone", error)
    })
  }

  render() {
    const { done, title} = this.props.item
    return (
      <div className="todo-item">
        <input
          type="checkbox"
          defaultChecked={this.state.done}
          onClick={this.toggleDone}
        />
        <p className={done ? "done" : null}>{title}</p>
      </div>
    )
  }
}