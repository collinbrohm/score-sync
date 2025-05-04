"""Module that uses flask to middle-man between frontend and backend."""

import logging

from flask import  Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from database.client import DatabaseClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class User(Resource):
    def post(self):
        user_data = request.json
        print(user_data)
        db = DatabaseClient()

        if not user_data:
            logger.error('No user data provided.')
            return []
        
        user = db.transform_users(user_data)
        print('calling persiser users')
        data = db.persist_users(user)
        
        return {"message": "User data persisted successfully."}, 201

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
        data = db.persist_players(user)


    def get():
        """Function do display user data."""
        pass

class Team(Resource):
    def post(self):
        team_data = request.json
        db = DatabaseClient()

        if not team_data:
            logger.error('No team data provided.')
            return []
        
        team = db.transform_teams(team_data)
        db.persist_teams(team)
        return {"status": "Success!!"}, 201

class Player(Resource):
    def post(self):
        player_data = request.json
        db = DatabaseClient()
        
        if not player_data:
            logger.error('No player info provided.')
            return[]
        
        player = db.transform_players(player_data)
        db.persist_players(player)

        return {"status": "Player added!"}, 201

class Game(Resource):
    def post():
        pass
    
    def get():
        pass

class Login(Resource):
    def post(self):
        db = DatabaseClient()
        login_data = request.json
        email = login_data["email"]
        password = login_data["password"]
        if db.is_valid_account(email, password):
            return {"Status": "Sucess"}, 200

        return {"Status": "Login failed. Please register"}, 401
    
    def get():
        return 200
    
class League(Resource):
    def post(self):
        league_data = request.json
        db = DatabaseClient()
        league = db.transform_leagues(league_data)
        league_id = db.persist_leagues(league)
        return {"message": "User data persisted successfully.", 
                "id": league_id}, 201

class TeamUpdate(Resource):
    def post(self, league_id):
        stats = request.json
        print(stats)
        db = DatabaseClient()
        if db.update_team_stats(league_id, stats):
            return {"status": "OK"}, 201
        
        return {"stats": "FAILED"}, 500

    def get(self, league_id):
        db = DatabaseClient()
        result = db.get_teams(league_id)
        print(result)
        return jsonify({'responses': result})


def main():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)
    api.add_resource(User, '/user')
    api.add_resource(Team, '/team')
    api.add_resource(Game, '/game')
    api.add_resource(Player, '/player')
    api.add_resource(Login, '/login')
    api.add_resource(League, '/league')
    api.add_resource(TeamUpdate, '/team/<int:league_id>')
    app.run(host='127.0.0.1', port=5000)

if __name__ == '__main__':
    main()