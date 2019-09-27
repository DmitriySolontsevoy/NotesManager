import React, {Component} from 'react';
import './bootstrap.min.css';
import './css/style.css';
import LoginForm from './components/loginForm.js';
import RegistrationForm from './components/regForm.js';
import NoteForm from './components/noteForm.js';

class App extends Component {

    state = {users: [], currentUser: "", page: 1}

    callback = (childData) => this.setState(childData);

    rightSwitch = () => {
	let currentPage = this.state.page;
	if (currentPage < 3) this.setState({page: currentPage + 1});
    }

    leftSwitch = () => {
	let currentPage = this.state.page;
	if (currentPage > 1) this.setState({page: currentPage - 1});
    }

    render() {
        return (
            <>
		<div id="header">
		    <div id="leftSwitch" onClick = {this.leftSwitch}>&lt;</div>
		    <div id="headerTitle">NOTES MANAGER</div>
		    <div id="rightSwitch" onClick = {this.rightSwitch}>&gt;</div>
		</div>

		{this.state.page === 1 ? <RegistrationForm parentCallback = {this.callback} dataFromParent = {this.state}/> : null}
		
		{this.state.page === 2 ? <LoginForm parentCallback = {this.callback} dataFromParent = {this.state}/> : null}
		
		{this.state.page === 3 ? <NoteForm parentCallback = {this.callback} dataFromParent = {this.state}/> : null}                
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
