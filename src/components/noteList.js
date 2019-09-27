import React, {Component} from 'react';
import '../bootstrap.min.css';
import '../css/style.css';

class NoteList extends Component {

    render() {
	return (
	    <>
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
	    </>
	)
    }
}

export default NoteList;
