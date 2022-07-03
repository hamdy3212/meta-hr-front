import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { apiURL } from "../../envvars";
import {
  swalShow,
  swalConfirm,
  swalToast,
  swalShowErrors,
} from "../../Utility/swal";
import Grid from '@mui/material/Grid';

import "./Notes.css";
const Notes = ({ applicationID }) => {
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState("");
  const [editNote, setEditNote] = useState("");
  const [errors, setErrors] = useState([]);
  const fetchNotes = async () => {
    const url = `${apiURL}/api/jobApplications/${applicationID}/notes`;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      });
  };

  const handleAddNote = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        jobApplicationId: applicationID,
        content: noteContent,
      }),
    };
    const response = await fetch(
      `${apiURL}/api/jobApplications/notes`,
      requestOptions
    );
    if (response.status === 200) {
      const data2 = await response.json();
      swalToast("Note Added Successfully.", "success");
      setNoteContent("");
      fetchNotes();
    } else {
      const respJson = await response.json();
      swalToast(respJson.errors.join(" "), "error");
    }
  };
  const handleEdit = (ID, content) => {
    setEditNote(ID);
    setNoteContent(content)
  };
  const handleUpdateNote = async (e) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        noteId: editNote,
        content: noteContent,
      }),
    };
    const response = await fetch(
      `${apiURL}/api/JobApplications/notes/update`,
      requestOptions
    );
    const respJson = await response.json();
    if (response.status === 200) {
      swalToast("Note Updated Successfully!", "success");
      
      setEditNote("");
      setNoteContent("");
      fetchNotes();
    } else if (response.status === 400 || response.status === 404) {
      setErrors(respJson.errors);
    } else {
      swalShowErrors("Error", respJson.errors);
    }

  };
  const handleDelete = async (ID) => {
    const confirmed = await swalConfirm(
      `Are you sure you want to delete this note?`,
      "",
      "warning"
    );
    if (!confirmed) {
      return;
    }
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const response = await fetch(
      `${apiURL}/api/jobApplications/notes/${ID}`,
      requestOptions
    );
    if (response.status === 200) {
      swalToast("Note deleted successfully.");
      setEditNote("");
      setNoteContent("");
      fetchNotes();
    } else {
      const respJson = await response.json();
      swalShowErrors("Error", respJson.errors);
    }
  };
  useEffect(async () => {
    fetchNotes();
  }, []);
  if (!notes) {
    return <h1>Loading...</h1>;
  }
  return (
    <Grid item xs={12} md={6} style={{padding:"0 20px"}}>
      <div style={{display:"flex", alignItems:"center"}}>
        <textarea
          className="note-text-area"
          rows="9"
          cols="70"
          value={noteContent}
          onChange={(e) => {
            setNoteContent(e.target.value);
          }}
        ></textarea>
        {!editNote ? (
          <Button variant="contained" onClick={(e) => handleAddNote(e)}>
            Add Note
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={(e) => handleUpdateNote(e)}
          >
            Update Note
          </Button>
        )}
      </div>
      <div style={{ transition: "0.5s" }}>
        {notes.map((note, index) => {
          return (
            <div key={index} className="note">
              <p type="text" className="note-content">
                {note.content}
              </p>
              <div>
                <i
                  class="fa-solid fa-pencil"
                  onClick={() => handleEdit(note.id, note.content)}
                ></i>
                <i
                  class="fa-solid fa-trash-can"
                  onClick={() => handleDelete(note.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </Grid>
  );
};

export default Notes;
