import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newBook, setNewBook] = useState('');
  const [libraryBooks, setLibraryBooks] = useState([]); // State for storing book details

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  const handleCreateUser = () => {
    const entryDate = new Date();
    axios.post('http://localhost:5000/api/users', { name: newName, book: newBook, entryDate })
      .then(() => {
        alert(`Welcome ${newName}, you accessed ${newBook} book`);
        setNewName('');
        setNewBook('');
        fetchUsers();
      })
      .catch(err => console.log(err));
  };

  const handleViewLibrary = () => {
    
    const bookDetails = [
      { title: 'Book 1', author: 'Author 1', row: '1' },
      { title: 'Book 2', author: 'Author 2', row: '2' },
      { title: 'Book 3', author: 'Author 3', row: '3' },
      { title: 'Book 4', author: 'Author 4', row: '3' },
      { title: 'Book 5', author: 'Author 5', row: '4' },
      { title: 'Book 6', author: 'Author 6', row: '5' },
     
     
    ];

    setLibraryBooks(bookDetails);
  };

  return (
    <div style={{ border: "2px solid black", textAlign: "center" }}>
      <h1 style={{ color: "red" }}>Library Management - Book Users</h1>
      <div>
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter book user's name" style={{ padding: "10px" }} />
      </div>
      <div>
        <input type="text" value={newBook} onChange={(e) => setNewBook(e.target.value)} placeholder="Enter book name" style={{ padding: "10px" }} /><br></br>
        <button onClick={handleCreateUser} style={{ backgroundColor: "coral", color: "white", padding: "10px" }}>Add</button>
      </div>
      <div>
        <button onClick={fetchUsers} style={{ backgroundColor: "red", color: "white" }}>View All Book Users</button>
      </div>
      <div>
        <button onClick={handleViewLibrary} style={{ backgroundColor: "red", color: "white" }}>View All Books in My Library</button>
      </div>
      <div>
        <h2>All Book Users</h2>
        <table style={{ width: '70%', border: "2px solid black", marginLeft: "15%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Book</th>
              <th>Entry Date</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.book}</td>
                <td>{new Date(user.entryDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>All Books in My Library</h2>
        <table style={{ width: '70%', border: "2px solid black", marginLeft: "15%" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Row</th>
            </tr>
          </thead>
          <tbody>
            {libraryBooks.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.row}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
