"""Module to send information to the database."""

import psycopg2

from models import User, TeamDTO, Player, LeagueDTO

class DatabaseClient:
    def __init__(self):
        self._client = psycopg2.connect(
            database = 'score_sync',
                user = 'postgres',
                host = '127.0.0.1',
                password = '',
                port = 5432)
        
    def get_users(self, email: str, password: str) -> bool:
        connection = self._client   
        cursor = connection.cursor()
        query = f'select email, password from where email={email} AND password={password}'
        cursor.execute(query)
        connection.commit()

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
            username, teams
        ) VALUES (%s, %s, %s, %s, %s)
        '''
        teams = ','.join(data.teams) if data.teams else None
        cursor.execute(query, (
            data.first_name,
            data.last_name,
            data.email,
            data.username,
            teams,
        ))
        connection.commit()
        return data

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
            birthday=data.get('birthday'),
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

    def transform_leagues(self, data: dict) -> LeagueDTO:
        return LeagueDTO(
            league_name=data["league_name"],
            location=data.get("location"),
            season=data.get("season"),
            start_date=data.get("start_date"),
            end_date=data.get("end_date"),
            quarter_length=data.get("quarter_length"),
            shot_clock=data.get("shot_clock"),
            ot_length=data.get("ot_length"),
            fouls_per_qt=data.get("fouls_per_qt"),
            admin_name=data.get("admin_name"),
            admin_email=data.get("admin_email"),
            admin_phone_num=data.get("admin_phone"),
            league_rules=data.get("league_rules")
        )
    
    
    def persist_leagues(self, league: LeagueDTO):
        connection = self._client
        cursor = connection.cursor()
        cursor.execute(
            '''
            INSERT INTO leagues (
                league_name,
                location,
                season,
                start_date,
                end_date,
                quarter_length,
                shot_clock,
                ot_length,
                fouls_per_qt,
                admin_name,
                admin_email,
                admin_phone_num,
                league_rules
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ''',
            (
                league.league_name,
                league.location,
                league.season,
                league.start_date,
                league.end_date,
                league.quarter_length,
                league.shot_clock,
                league.ot_length,
                league.fouls_per_qt,
                league.admin_name,
                league.admin_email,
                league.admin_phone_num,
                league.league_rules
            )
        )
        connection.commit()

    
    def persist_teams(self, data: TeamDTO):
        """Function to persist user data into the database.
        
        Args:
            data: A User object that contains needed user information.
            
        """

        connection = self._client
        cursor = connection.cursor()
        query = '''
        INSERT INTO teams (
            team_name, contact_email, contact_person, league_id
        ) VALUES (%s, %s, %s, %s)
        '''
        cursor.execute(query, )
        connection.commit()

    def transform_teams(self, data) -> TeamDTO:
         return TeamDTO(
            team_name=data["team_name"],
            contact_email=data["contact_email"],
            contact_peson=data["contact_person"],
            league_id=data["league_id"],
        )


        