import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const Row = (props) => {
  return <div style={{display: "flex", flexDirection: "row", width: "3000px"}} className="row">
    <span>{props.index}</span>
    <span>{props.name}</span>
    <span>{props.ticket}</span>
    <span>{props.hometown}</span>
    <span>{props.destination}</span>
    <span>{props.boarded}</span>
    <span>{props.name}</span>
    <span>{props.ticket}</span>
    <span>{props.hometown}</span>
    <span>{props.destination}</span>
    <span>{props.boarded}</span>
    <span>{props.name}</span>
    <span>{props.ticket}</span>
    <span>{props.hometown}</span>
    <span>{props.destination}</span>
    <span>{props.boarded}</span>
  </div>
}

const Rows = (props) => {
  return <div>
    {props.rows.map((person, index) => (
      <Row
        index={index}
        key={`id${index}`}
        name={person.name}
        ticket={person.ticket}
        hometown={person.hometown}
        destination={person.destination}
        boarded={person.boarded}
      />
    ))}
  </div>
}

function App() {
  const [passengers, setPassengers] = useState([]);
  const [updateCmd, setUpdateCmd] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/passengers')
      .then(response => response.json())
      .then(data => setPassengers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFilterChange = (event) => {
    const cmd = updateCmd.split("=");
    setPassengers(passengers.map(p => {
      if (p.name === cmd[0]) {
        p.name = cmd[1];
      }
      return p;
    }));
  };

  const handleAdd = (event) => {
    setPassengers([
      { name: updateCmd, ticket: '', hometown: '', destination: '', boarded: '' },
      ...passengers
    ]);
  };

  const filteredPeople = useMemo(() => passengers.filter(person => person.name.startsWith(filter)), [passengers, filter]);

  return (
    <div className="App">
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <input
        type="text"
        value={updateCmd}
        onChange={(event) => setUpdateCmd(event.target.value)}
      />
      <button onClick={handleFilterChange}>Update</button>
      <button onClick={handleAdd}>Add</button>
      <Row name="name" ticket="ticket" hometown="hometown" destination="destination" boarded="boarded" />
      {useMemo(() => (<Rows rows={filteredPeople} />), [filteredPeople])}
    </div>
  );
}

export default App;
