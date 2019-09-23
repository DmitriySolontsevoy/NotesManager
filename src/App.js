import React, {Component} from 'react';
import './bootstrap.min.css';
import './style.css';

class App extends Component {

    helpMe() {
        document.getElementById("title").style.borderColor = "black";
        document.getElementById("content").style.borderColor = "black";

        let title = document.getElementById("title").value;
        let content = document.getElementById("content").value;

        if (title != "" && content != "")
        {
            appendNewRow(title, content);
            document.getElementById("title").value = "";
            document.getElementById("content").value = "";
        }
        else
        {
            if (title == "")
            {
                document.getElementById("title").style.borderColor = "red";
            }
        
            if (content == "")
            {
                document.getElementById("content").style.borderColor = "red";
            }
        }
    }

    
    
    componentDidMount() {
        let notes = JSON.parse(window.localStorage.getItem("notes"));
        fillNotesList(notes);
    }

    componentWillUnmount() {
        let notesJson = prepareNotes();
        window.localStorage.setItem("notes", notesJson);
    }

    render() {
        return (
            <>
                <br />
                <div className="myBox">
                    <form>
                        <div className="form-group">
                            <label>Note title</label>
                            <input type="text" className="form-control" id="title" placeholder="Enter note title" />
                        </div>
                        <div className="form-group">
                            <label>Note content</label>
                            <input type="text" className="form-control" id="content" placeholder="Enter note content" />
                        </div>
                        <br />
                        <button type="button" className="btn btn-primary" onClick={this.helpMe}>Add</button>
                    </form>
                </div>
    
                <br />
    
                <h1>ALL NOTES</h1>
    
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

export default App;