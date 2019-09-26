import React, {Component} from 'react';
import './bootstrap.min.css';
import './style.css';
import LoginForm from './components/loginForm.js';
import RegistrationForm from './components/regForm.js';
import NoteForm from './components/noteForm.js';
import NoteList from './components/noteList.js';

class App extends Component {

    state = {users: [], currentUser: ""}

    callback = (childData) => this.setState(childData);

    render() {
        return (
            <>
		<div id="header">NOTES MANAGER</div>

                <br /><br />

		<RegistrationForm parentCallback = {this.callback} dataFromParent = {this.state}/>

		<br /><hr /><br />

		<LoginForm parentCallback = {this.callback} dataFromParent = {this.state}/>

		<br /><hr /><br />

                <NoteForm parentCallback = {this.callback} dataFromParent = {this.state}/>
    
                <br /><br />
    
		<NoteList />                

                <script src="js/script.js"></script>
            </>
        );
    }
}

function prepareNotes()
{
    let list = document.getElementsByClassName("myRow");
    let notes = [];

    for (let i = 0; i < list.length; i++)
    {
        let newNote = {
            id: list[i].childNodes[2].firstChild.value,
            title: list[i].childNodes[0].firstChild.textContent,
            content: list[i].childNodes[1].firstChild.textContent
        }

        notes.push(newNote);
    }

    return JSON.stringify(notes);
}

document.body.onunload = () => {
    let notesJson = prepareNotes();
    window.localStorage.setItem("notes", notesJson);
}

export default App;
