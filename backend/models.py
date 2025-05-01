"""Module containing models for various objects."""

from datetime import datetime
from dataclasses import dataclass
from typing import Optional

@dataclass(frozen=True)
class User:
    """Model containing user data."""
    first_name: str
    last_name: str
    email: str
    password: str
    username: str
    birthday: Optional[str] = None
    teams: Optional[list[str]] = None
    
@dataclass(frozen=True)
class Player:
    first_name: str
    last_name: str
    email: str
    team_name: str
    jersey_num: int

@dataclass(frozen=True)
class FootballDTO:
    """Model for tracking football stats."""
    sport: str
    pass_yds: int
    pass_tds: int
    rush_yds: int
    rush_tds: int
    rec_yds: int
    rec_tds: int
    receptions: int
    interceptions: int
    deflections: int
    sacks: float
    jersey_number: int
    player_id: int # The uid


@dataclass(frozen=True)
class BasketballDTO:
    sport: str
    points: int
    assists: int
    rebounds: int
    steals: int
    fouls: int
    number: int
    fgm: int
    fga: int
    ftm: int
    fta: int
    player_id: int # The uid

@dataclass(frozen=True)
class TeamDTO:
    """Used to store data when a team is created."""
    team_name: str
    contact_email: str
    contact_peson: str
    league_id: int
    record: Optional[str]
    wins: Optional[int] = None # To cleanly update the record
    losses: Optional[int] = None
    ties: Optional[int] = None
    roster_names: Optional[list[str]] = None

@dataclass(frozen=True)
class LeagueDTO:
    """Used to store newly created leagues."""
    league_name: str
    league_id: Optional[int] = None  
    location: Optional[str] = None
    season: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    quarter_length: Optional[str] = None
    shot_clock: Optional[str] = None
    ot_length: Optional[str] = None
    fouls_per_qt: Optional[str] = None
    admin_name: Optional[str] = None
    admin_email: Optional[str] = None
    admin_phone_num: Optional[str] = None
    league_rules: Optional[str] = None

@dataclass(frozen=True)
class GameDTO:
    """DTO for individual games."""
    game_id: int
    home_team: str
    home_team_id: int
    away_team: str
    away_team_id: int
    home_points_scored: int
    away_points_scored: int
    commence_time: datetime
    sport: str
    location: str
    is_playoff: bool
    winning_team: str

    
    

    