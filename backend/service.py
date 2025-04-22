"""Module that uses flask to middle-man between frontend and backend."""

import logging

from flask import  Flask, request, jsonify
from flask_restful import Api, Resource

from database.client import DatabaseClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class User(Resource):
    def post():
        user_data = request.json
        db = DatabaseClient()

        if not user_data:
            logger.error('No user data provided.')
            return []
        
        user = db.transform_users(user_data)
        db.persist_users(user)

    def get():
        """Function do display user data."""
        pass

class Player(Resource):
    def post():
        player_data = request.json
        db = DatabaseClient()

        if not player_data:
            logger.error('No user data provided.')
            return []
        
        user = db.transform_players(player_data)
        db.persist_players(user)

    def get():
        """Function do display user data."""
        pass

class Team(Resource):
    def post():
        team_data = request.json
        db = DatabaseClient()

        if not team_data:
            logger.error('No team data provided.')
            return []
        
        team = db.transform_teams(team_data)
        db.persist_teams(team)

    def get():
        pass

class Player(Resource):
    def post():
        player_data = request.json
        db = DatabaseClient()
        
        if not player_data:
            logger.error('No player info provided.')
            return[]
        
        player = db.transform_players(player_data)
        db.persist_players(player)
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
    api.add_resource(Player, '/player')
    app.run(host='127.0.0.1')

if __name__ == '__main__':
    main()