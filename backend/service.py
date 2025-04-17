"""Module that uses flask to middle-man between frontend and backend."""

from flask import  Flask, request, jsonify
from flask_restful import Api, Resource

# The post methods are to send to the datbase
# The get methods are to retrieve from the database and display on the frontend.
class User(Resource):
    def post():
        pass

    def get():
        pass

class Team(Resource):
    def post():
        pass

    def get():
        pass

class Game(Resource):
    def post():
        pass
    
    def get():
        pass



def main():
    app = Flask(__name__)
    api = Api(app)
    api.add_resource(User, '/user')
    api.add_resource(Team, '/team')
    api.add_resource(Game, '/game')
    app.run(host='127.0.0.1')

