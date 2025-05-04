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
    
    def get_teams(self, league_id: int) -> list:
        connection = self._client   
        cursor = connection.cursor()
        try: 
            query = '''SELECT * FROM teams WHERE league_id = %s'''
            cursor.execute(query, (league_id,))
            rows = cursor.fetchall()

            teams = []
            for team in rows:
                print(team)
                teams.append({
                    "id": team[0],
                    "team_name": team[1],
                    "wins": team[6] or 0,
                    "losses": team[7] or 0,
                    "ties": team[8] or 0,
                    "roster_names": []
                })
                
        finally:
            print('Teams', teams)
            cursor.close()

        return {"teams": teams}
    
    def update_team_stats(self, league_id: int, team_data: dict) -> bool:
        connection = self._client   
        cursor = connection.cursor()
        team_id = team_data.get("team_id")
        wins = team_data.get("wins")
        ties = team_data.get("ties")
        losses = team_data.get("losses")
        print('DATA', team_data, team_id, wins, ties, losses, league_id)
        try:
            cursor.execute(
                """
                UPDATE teams
                SET wins = %s,
                    ties = %s,
                    losses = %s
                WHERE team_id = %s
                AND league_id = %s
                """,
                (wins, ties, losses, team_id, league_id)
            )
        except Exception as e:
            print(f'Error persisting data with error {e}')
            return False
        finally:
            connection.commit()
            return True
    
    def is_valid_account(self, email: str, password: str) -> bool:
        connection = self._client   
        cursor = connection.cursor()
        try:
            query = f'''select 1 from users where email= %s AND password = %s
            '''
            cursor.execute(query, (email, password))
            result = cursor.fetchone()
            if result is not None:
                return True
        finally:
            cursor.close()
        return False

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
            username, password, teams
        ) VALUES (%s, %s, %s, %s, %s, %s)
        '''
        teams = ','.join(data.teams) if data.teams else None
        cursor.execute(query, (
            data.first_name,
            data.last_name,
            data.email,
            data.username,
            data.password,
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
            password=data.get('password'),
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
            team_id, jersey_num
        ) VALUES (%s, %s, %s, %s, %s)
        '''
        cursor.execute(query, (
            data.first_name,
            data.last_name,
            data.email,
            data.team_id,
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
        print(data)
        return Player(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            team_id=data['team_id'],
            jersey_num=data.get('jersey_num')
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
    
    
    def persist_leagues(self, league: LeagueDTO) -> int:
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
            RETURNING league_id
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
        league_id = cursor.fetchone()[0]  
        connection.commit()
        return league_id
       

    def persist_teams(self, data: list[TeamDTO]):
        """Function to persist user data into the database.
        
        Args:
            data: A User object that contains needed user information.
            
        """
        
        connection = self._client
        cursor = connection.cursor()
        for team in data:    
            query = '''
            INSERT INTO teams (
                team_name, contact_email, contact_person, league_id
            ) VALUES (%s, %s, %s, %s)
            '''
            cursor.execute(query, (team.team_name, team.contact_email, team.contact_person, team.league_id))
            connection.commit()


    def transform_teams(self, data) -> list[TeamDTO]:
        result = []
        print(data)
        for team in data["teams"]:
            result.append(
                TeamDTO(
                    team_name=team["team_name"],
                    contact_email=team["contact_email"],
                    contact_person=team["contact_person"],
                    league_id=team["league_id"]
                )
            )
        return result
            


        