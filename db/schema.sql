CREATE DATABASE IF NOT EXISTS nextdoor_ballin;

USE nextdoor_ballin;

DROP TABLE IF EXISTS teams;

CREATE TABLE teams (
    id int NOT NULL  AUTO_INCREMENT,
    team_name varchar(255) NOT NULL,
    wins int NOT NULL,
    losses int NOT NULL,
    PRIMARY KEY (id)
    );

