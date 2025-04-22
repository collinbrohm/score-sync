"""Module to send information to the database."""

import psycopg2

from models import User, TeamDTO, Player

class DatabaseClient:
    def __init__(self):
        self._client = psycopg2.connect(
            database = 'score_sync',
                user = 'postgres',
                host = '127.0.0.1',
                password = '',
                port = 5432)
        

    def persist_users(self, data: User):
        """Function to persist user data into the database.
        
        Args:
            data: A User object that contains needed user information.
            
        """

        connection = self._client
        cursor = connection.cursor()
        query = '''
        INSERT INTO users (
            first_name, last_name, email,
            user_name, user_class, birthday, teams
        ) VALUES (%s, %s, %s, %s, %s, %s, %s)
        '''
        teams = ','.join(data.teams) if data.teams else None
        cursor.execute(query, (
            data.first_name,
            data.last_name,
            data.email,
            data.username,
            data.user_class,
            data.birthday,
            teams,
        ))
        connection.commit()

    def transform_users(self, data: dict) -> User:
        """Returns a user object.
        
        Args:
            data: A dict containing user data.
        """
        return User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['username'],
            email=data['email'],
            phone_num=data['phone_num'],
            username=data['username'],
            user_class=data['user_class'],
            birthday=data['birthday'],
            teams=data.get('teams')  
        )
    
    def persist_players(self, data: Player): 
        """Function to persist player data into the database.
        
        Args:
            data: A Player object that contains needed user information.
            
        """

        connection = self._client
        cursor = connection.cursor()
        query = '''
        INSERT INTO players (
            first_name, last_name, email,
            team_name, jersey_num
        ) VALUES (%s, %s, %s, %s, %s)
        '''
        cursor.execute(query, (
            data.first_name,
            data.last_name,
            data.email,
            data.team_name,
            data.jersey_num
        ))
        connection.commit()
        
    
    def transform_players(self, data: dict) -> Player:
        """Returns a Player object.
        
        Args:
            data: A dict containing player data.
        """

        """Returns a user object.
        
        Args:
            data: A dict containing user data.
        """
        return Player(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            team_name=['team_name'],
            jersey_num=['jersey_num']  
        )



    
    def persist_teams(self, data: TeamDTO):
        """Function to persist user data into the database.
        
        Args:
            data: A User object that contains needed user information.
            
        """

        connection = self._client
        cursor = connection.cursor()
        query = '''
        INSERT INTO teams (
            team_name, team_abbr, team_id, roster_names, sport, level,
            semester, year, record, wins, losses, ties, game_ids
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        cursor.execute(query, )
        connection.commit()

    def transform_teams(self, data) -> TeamDTO:
        # TODO: To be implemented. 
        pass


        