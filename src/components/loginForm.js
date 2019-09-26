import React, {Component} from 'react';
import '../bootstrap.min.css';
import '../style.css';

const md5 = require('js-md5');

class LoginForm extends Component {
    
    sendData = () => this.props.parentCallback(this.props.dataFromParent);

    login = () => {
	document.getElementById("logLogin").style.borderColor = "lightgrey";
        document.getElementById("logPassword").style.borderColor = "lightgrey";

	let login = document.getElementById("logLogin").value.trim();
	let password = document.getElementById("logPassword").value.trim();

	if (login !== "" && password !== "")
        {
	    this.selectUser(login, password);
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

    selectUser = (login, password) => {
	let user = this.props.dataFromParent.users.filter(data => (data.login === login));    

	if (user.length > 0 && user[0].password === md5(password))
	{
	    this.props.dataFromParent.currentUser = user[0].id;
	    document.getElementById("header").innerText = login;
	    document.getElementById("header").appendChild(document.createTextNode("	logout"));
	    document.getElementById("header").onclick = this.logout;
	}
	else
	{
	    document.getElementById("logLogin").style.borderColor = "red";
	}

	this.sendData();
    }

    logout = () => {
	this.props.dataFromParent.currentUser = "";
	document.getElementById("header").innerText = "NOTES MANAGER";
	this.sendData();
    }

    render() 
    {
        return (
	    <>
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
	    </>
        )
    }
}

export default LoginForm;
