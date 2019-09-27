import React, {Component} from 'react';
import '../bootstrap.min.css';
import '../css/style.css';
import NoteList from './noteList.js';

class NoteForm extends Component {

    sendData = () => this.props.parentCallback(this.props.dataFromParent);

    fillNotesList = (notes) => 
    {
	for (let i = 0; i < notes.length; i++)
	{
	    this.appendNewRow(notes[i].title, notes[i].content, true);
	}
    }

    addNote = () => {
        document.getElementById("title").style.borderColor = "lightgrey";
        document.getElementById("content").style.borderColor = "lightgrey";

        let title = document.getElementById("title").value.trim();
        let content = document.getElementById("content").value.trim();

        if (title !== "" && content !== "")
        {
            this.appendNewRow(title, content, false);

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

    componentDidMount = () => {	
        let notes = JSON.parse(window.localStorage.getItem("notes"));
        this.fillNotesList(notes);
    }

    appendNewRow(title, content, freshLoad) {
	if (this.props.dataFromParent.currentUser !== "" || freshLoad === true)
	{
	    let count = document.getElementsByTagName("tr").length;

	    let newRow = document.getElementsByTagName("tbody")[0].insertRow();
	    newRow.id = "row_" + (count - 1);
	    newRow.className = "myRow";
	    newRow.insertCell(0).appendChild(document.createTextNode(title));
	    newRow.insertCell(1).appendChild(document.createTextNode(content));

	    let input = document.createElement("input");
	    input.setAttribute("type", "hidden");
	    input.setAttribute("value", this.props.dataFromParent.currentUser);

	    let removalCell = newRow.insertCell(2);
	    removalCell.appendChild(input);
	    removalCell.appendChild(document.createTextNode("X"));
	    removalCell.className = "remove";
	    removalCell.onclick = function() {
	        document.getElementById("row_" + (count - 1)).remove();
	    };
	}
    }

    render() {
	return (
	    <>
		<br /><br />
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
                        <button type="button" className="btn btn-primary" onClick={this.addNote}>Add</button>
                    </form>
                </div>

		<NoteList />
	    </>
	)
    }
}

export default NoteForm;
