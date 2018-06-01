CREATE DATABASE IF NOT EXISTS nextdoor_ballin;

USE nextdoor_ballin;
DROP TABLE IF EXISTS players;

CREATE TABLE players (
    player_id int NOT NULL  AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,    
    team_id  int NOT NULL,    
    PRIMARY KEY (player_id)
    );

DROP TABLE IF EXISTS teams;

CREATE TABLE teams (
    team_id int NOT NULL  AUTO_INCREMENT,
    team_name varchar(255) NOT NULL,
    team_sport varchar(255) NOT NULL,
    wins int NOT NULL,
    losses int NOT NULL,
    PRIMARY KEY (team_id)
    
    );

