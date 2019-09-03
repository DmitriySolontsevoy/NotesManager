document.getElementById("send").onclick = () => {
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

document.body.onload = () => {
    let notes = JSON.parse(window.localStorage.getItem("notes"));
    fillNotesList(notes);
}

document.body.onunload = () => {
    let notesJson = prepareNotes();
    window.localStorage.setItem("notes", notesJson);
}

function prepareNotes()
{
    let list = document.getElementsByClassName("myRow");
    let notes = [];

    for (i = 0; i < list.length; i++)
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
    for (i = 0; i < notes.length; i++)
    {
        appendNewRow(notes[i].title, notes[i].content);
    }
}

function appendNewRow(title, content)
{
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