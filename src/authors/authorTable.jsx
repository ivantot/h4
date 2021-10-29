import React, { useState, Fragment } from "react";
import { ReadOnlyRow } from "./authorTableFuncs";
import { EditableRow } from "./authorTableFuncs";
import { nanoid } from "nanoid";
import { useAuth } from "../components/useAuth";
import { useBook } from "../components/accessHooks";
import { CircularProgress } from "@mui/material";

export const AuthorTable = () => {
  const [authors, setAuthors] = useState("");
  const [addFormData, setAddFormData] = useState({
    author: "",
    id: "",
  });
  const [editFormData, setEditFormData] = useState({
    author: "",
  });
  const [editAuthorId, setEditAuthorId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newAuthor = {
      author: addFormData.author,
      id: nanoid(),
    };

    const newAuthors = [...authors, newAuthor];
    setAuthors(newAuthors);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedAuthor = {
      author: editFormData.author,
      id: editAuthorId,
    };

    const newAuthors = [...authors];

    const index = authors.findIndex((author) => author.id === editAuthorId);

    newAuthors[index] = editedAuthor;

    setAuthors(newAuthors);
    setEditAuthorId(null);
  };

  const handleEditClick = (event, author) => {
    event.preventDefault();
    setEditAuthorId(author.author);

    const formValues = {
      author: author.author,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditAuthorId(null);
  };

  const handleDeleteClick = (authorId) => {
    const newAuthors = [...authors];

    const index = authors.findIndex((author) => author.id === authorId);

    newAuthors.splice(index, 1);

    setAuthors(newAuthors);
  };
  const id = 3;
  const [book, loading] = useBook(id);
  setAuthors(book.authors);
  const [login] = useAuth();
  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div className="app-container">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {book.authors.map((author) => {
                console.log(author);
                return (
                  <Fragment>
                    {/* {editContactId === book.authors.name ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : ( */}
                    <ReadOnlyRow
                      contact={author}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                    {/* )} */}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </form>

        <h2>Add a Contact</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="fullName"
            required="required"
            placeholder="Enter a name..."
            onChange={handleAddFormChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
};
