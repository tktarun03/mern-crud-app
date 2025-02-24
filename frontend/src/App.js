import React, { useState, useEffect } from 'react';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        fetch('http://localhost:5000/items')
            .then(res => res.json())
            .then(data => setItems(data));
    }, []);

    const addItem = () => {
        fetch('http://localhost:5000/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newItem })
        })
        .then(res => res.json())
        .then(data => setItems([...items, data]));
    };

    return (
        <div>
            <h1>MERN CRUD App</h1>
            <input value={newItem} onChange={e => setNewItem(e.target.value)} />
            <button onClick={addItem}>Add</button>
            <ul>
                {items.map(item => <li key={item._id}>{item.name}</li>)}
            </ul>
        </div>
    );
}

export default App;