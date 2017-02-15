//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            done: false
        }
    }

    toggleDone(){
        if(this.state.done == false){
            this.setState({done: true});
        }
        else{
            this.setState({done:true});
        }
    }
    
    render() { return (                  
        <div>
            <li id={this.props.id}>
                <i className="check glyphicon glyphicon-check" onClick={()=>this.toggleDone()}></i>
                <span className={this.state.done ? "completed" : ""}>{typeof(this.props.text) === "string" ? this.props.text : ""}</span>
                <i className="destroy glyphicon glyphicon-remove" onClick={()=>this.props.remove()}></i>
            </li>
        </div>
    )}
}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item"},
                {id:1, text:"Another item" }
            ]
        }
    }

    addTodo() {
        // IMPLEMENT ME!
        const text = document.getElementById("newTODO").value;
        document.getElementById("newTODO").value="";
        this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text}
            ]
        })
    }

    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })
    }

    render() { return (
        // Hint: <input ... ref={ (node) => this.... = node } />
        /*
        h("div", { },
            h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
            h("button", { onClick: addItem }, "Add Item"),
            h("span", { className: "submit" }, [
                h("a", { href: "https://webdev-rice.herokuapp.com",
                     target: "_blank" }, "Submit your exercise"),
            ]),
            h("ul", { className: "todo" }, listItems)
        )
        */
         <div>
            <input id="newTODO" type= "text" placeholder="To Do"></input>
            <button onClick={()=>this.addTodo()}>Add Item</button><span className="submit">
                <a href="https://webdev-rice.herokuapp.com" target="_blank">Submit your exercise</a>
            </span>
            <ul className="todo">
                {this.state.todoItems.map((node) => <ToDoItem key={node.id} text={node.text} remove={()=>this.removeTodo(node.id)}/>)}
            </ul>
        </div>
                       
                       
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()
