const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const PORT = process.env.PORT || 5000;

const sequelize = new Sequelize('postgres://titanic:titanic@0.0.0.0:5432/titanic');

const Passenger = sequelize.define('Passenger', {
  passengerid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ticket: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hometown: {
    type: DataTypes.STRING,
    allowNull: false
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false
  },
  boarded: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: false, tableName: 'passenger' });

app.use(bodyParser.json());

app.get('/api/passengers', async (req, res) => {
  try {
    const passengers = await Passenger.findAll();
    const result = passengers; /* [
        // Duplicate the data to simulate larger data sets.
        ...passengers,
        ...passengers,
        ...passengers,
        ...passengers,
        ...passengers,
        ...passengers,
        ...passengers,
        ...passengers,
    ] */
    res.set('Access-Control-Allow-Origin', '*');
    res.json(result);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`Server is running on port ${PORT}`);
});
