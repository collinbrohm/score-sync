"""Module containing models for various objects."""

from datetime import datetime
from dataclasses import dataclass
from typing import Optional

@dataclass(frozen=True)
class User:
    """Model containing user data."""
    uid: str
    first_name: str
    last_name: str
    preferred_name: str
    email: str
    phone_num: str
    user_name: str
    user_class: str # Freshman, sophmore, ect
    birthday: datetime
    teams: Optional[list[str]] = None
    
# NOTE: Might need to add more data classes for the combined stats?
@dataclass(frozen=True)
class FootballDTO:
    """Model for tracking football stats."""
    sport: str
    pass_yds: int
    pass_tds: int
    rush_yds: int
    rush_tds: int
    rec_yds: int
    receptions: int
    interceptions: int
    number: int
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
    team_abbr: str
    roster_names: list[str]
    sport: str
    level: str # Such as competition, recreational
    date_of_creation: datetime
    semester: str # Fall or Spring
    year: int
    record: str
    wins: Optional[int] = None # To cleanly update the record
    losses: Optional[int] = None


@dataclass(frozen=True)
class GameDTO:
    """DTO for individual games."""
    pass

    