import React, {Component} from 'react';
import '../bootstrap.min.css';
import '../css/style.css';

const uuid = require('uuid/v1');
const md5 = require('js-md5');

class RegistrationForm extends Component {

    sendData = () => this.props.parentCallback(this.props.dataFromParent);

    register = () => {
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
		this.addUser(login, password);
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

    addUser = (login, password) => {
	let user = this.props.dataFromParent.users.filter(data => (data.login === login));    

	if (user.length === 0)
	{
	    this.props.dataFromParent.users.push({"id": uuid(), "login": login, "password": md5(password)});
	    this.sendData();
	}
    }

    render() {
	return (
	    <>
		<br /><br />
	        <div className="myBox">
		    <form>
		    <div className="form-group">
		        <label>Login</label>
		        <input maxLength="30" type="text" className="form-control" id="regLogin" placeholder="Enter login" />
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
	    </>
	)
    }
}

export default RegistrationForm;
