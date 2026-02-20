from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
PORT = int(os.environ.get('PORT', 5000))

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://titanic:titanic@0.0.0.0:5432/titanic'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Passenger(db.Model):
    __tablename__ = 'passenger'

    passengerid = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    ticket = db.Column(db.String, nullable=False)
    hometown = db.Column(db.String, nullable=False)
    destination = db.Column(db.String, nullable=False)
    boarded = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'passengerid': self.passengerid,
            'name': self.name,
            'ticket': self.ticket,
            'hometown': self.hometown,
            'destination': self.destination,
            'boarded': self.boarded,
        }


@app.route('/api/passengers')
def get_passengers():
    try:
        passengers = Passenger.query.all()
        result = [p.to_dict() for p in passengers]
        response = jsonify(result)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except Exception as err:
        print(f'Error executing query: {err}')
        return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    try:
        with app.app_context():
            db.engine.connect()
            print('Connection has been established successfully.')
    except Exception as error:
        print(f'Unable to connect to the database: {error}')

    print(f'Server is running on port {PORT}')
    app.run(port=PORT)
