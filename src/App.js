import React, {Component} from 'react';
import './bootstrap.min.css';
import './style.css';

let users = [];
let currentUser = "";

class App extends Component {

    addButton() {
        document.getElementById("title").style.borderColor = "lightgrey";
        document.getElementById("content").style.borderColor = "lightgrey";

        let title = document.getElementById("title").value.trim();
        let content = document.getElementById("content").value.trim();

        if (title !== "" && content !== "")
        {
            appendNewRow(title, content);
            document.getElementById("title").value = "";
            document.getElementById("content").value = "";
        }
        else
        {
            if (title === "")
            {
                document.getElementById("title").style.borderColor = "red";
            }
        
            if (content === "")
            {
                document.getElementById("content").style.borderColor = "red";
            }
        }
    }

    register() {
        document.getElementById("regLogin").style.borderColor = "lightgrey";
        document.getElementById("regPassword").style.borderColor = "lightgrey";
        document.getElementById("regRepeatPassword").style.borderColor = "lightgrey";

	let login = document.getElementById("regLogin").value.trim();
	let password = document.getElementById("regPassword").value.trim();
	let repeatPassword = document.getElementById("regRepeatPassword").value.trim();

	if (login !== "" && password !== "" && repeatPassword !== "")
        {
	    if (password === repeatPassword) 
	    {
		addUser(login, password);
		document.getElementById("regLogin").value = "";
                document.getElementById("regPassword").value = "";
	        document.getElementById("regRepeatPassword").value = "";
	    }
	    else
	    {
		document.getElementById("regPassword").style.borderColor = "red";
		document.getElementById("regRepeatPassword").style.borderColor = "red";
	    }
        }
        else
        {
            if (login === "")
            {
                document.getElementById("regLogin").style.borderColor = "red";
            }
        
            if (password === "")
            {
                document.getElementById("regPassword").style.borderColor = "red";
            }

	    if (repeatPassword === "")
	    {
		document.getElementById("regRepeatPassword").style.borderColor = "red";
	    }
        }
    }



    login() {
	document.getElementById("logLogin").style.borderColor = "lightgrey";
        document.getElementById("logPassword").style.borderColor = "lightgrey";

	let login = document.getElementById("logLogin").value.trim();
	let password = document.getElementById("logPassword").value.trim();

	if (login !== "" && password !== "")
        {
	    selectUser(login, password);
	    document.getElementById("logLogin").value = "";
	    document.getElementById("logPassword").value = "";
        }
        else
        {
            if (login === "")
            {
                document.getElementById("logLogin").style.borderColor = "red";
            }
        
            if (password === "")
            {
                document.getElementById("logPassword").style.borderColor = "red";
            }
        }
    }

    componentDidMount() {	
        let notes = JSON.parse(window.localStorage.getItem("notes"));
        fillNotesList(notes);
    }

    render() {
        return (
            <>
		<div id="header">NOTES MANAGER</div>

                <br /><br />

		<div className="myBox">
                    <form>
                        <div className="form-group">
                            <label>Login</label>
                            <input maxLength="40" type="text" className="form-control" id="regLogin" placeholder="Enter login" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input maxLength="80" type="password" className="form-control" id="regPassword" placeholder="Enter desirable password" />
                        </div>
			<div className="form-group">
                            <label>Repeat password</label>
                            <input maxLength="80" type="password" className="form-control" id="regRepeatPassword" placeholder="Repeat password" />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.register}>Register</button>
                    </form>
                </div>

		<br /><hr /><br />

		<div className="myBox">
                    <form>
                        <div className="form-group">
                            <label>Login</label>
                            <input maxLength="30" type="text" className="form-control" id="logLogin" placeholder="Enter your login" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input maxLength="400" type="password" className="form-control" id="logPassword" placeholder="Enter your password" />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
                    </form>
                </div>

		<br /><hr /><br />

                <div className="myBox">
                    <form>
                        <div className="form-group">
                            <label>Title</label>
                            <input maxLength="30" type="text" className="form-control" id="title" placeholder="Enter note title" />
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <input maxLength="400" type="text" className="form-control" id="content" placeholder="Enter note content" />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.addButton}>Add</button>
                    </form>
                </div>
    
                <br /><br />
    
                <h1>NOTES LIST</h1>
    
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
    
    	            </tbody>
                </table>
    
                <script src="js/script.js"></script>
            </>
        );
    }
}

document.body.onunload = () => {
    let notesJson = prepareNotes();
    window.localStorage.setItem("notes", notesJson);
}

function appendNewRow(title, content) {
    let count = document.getElementsByTagName("tr").length;

    let newRow = document.getElementsByTagName("tbody")[0].insertRow();
    newRow.id = "row_" + (count - 1);
    newRow.className = "myRow";
    newRow.insertCell(0).appendChild(document.createTextNode(title));
    newRow.insertCell(1).appendChild(document.createTextNode(content));

    let removalCell = newRow.insertCell(2);
    removalCell.appendChild(document.createTextNode("X"));
    removalCell.className = "remove";
    removalCell.onclick = function() {
        document.getElementById("row_" + (count - 1)).remove();
    };
}

function prepareNotes()
{
    let list = document.getElementsByClassName("myRow");
    let notes = [];

    for (let i = 0; i < list.length; i++)
    {
        let newNote = {
            title: list[i].childNodes[0].firstChild.textContent,
            content: list[i].childNodes[1].firstChild.textContent
        }

        notes.push(newNote);
    }

    return JSON.stringify(notes);
}

function fillNotesList(notes) 
{
    for (let i = 0; i < notes.length; i++)
    {
        appendNewRow(notes[i].title, notes[i].content);
    }
}

function addUser(login, password)
{
    users.push({"login": login, "password": password});
    console.log(users);
}

function selectUser(login, password)
{
    let user = users.filter(data => (data.login === login));    

    if (user.length > 0 && user[0].password === password)
    {
	currentUser = login;
        document.getElementById("header").innerText = currentUser;
    }
    else
    {
	document.getElementById("logLogin").style.borderColor = "red";
    }
}

export default App;
