import React from 'react';
class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            done: props.todo.done
        }
    }
    toggleDone = () => {
        fetch(`http://localhost:5000/todo/${this.props.todo.id}`, {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                done: !this.state.done
            })
        })
        .then(
            this.setState({
                done: !this.state.done
            })
        )
        .catch((error) => {
            console.log('Error in toggleDone: ', error)
        })
    }
    render() {
        console.log(this.props.todo)
        return (
            <div className="todo-item">
                <input
                    type="checkbox"
                    defaultChecked={this.state.done}
                    onClick={this.toggleDone}
                />
                <p className={this.state.done ? "done" : null}>{this.props.todo.title}</p>
                <button onClick={() => this.props.deleteItem(this.props.todo.id)}>X</button>
            </div>
        )
    }
}
export default TodoItem;