DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id INTEGER(32) NOT NULL,
    name TEXT(256) NOT NULL,
    status TEXT(256),
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("user_id")
);

DROP TABLE IF EXISTS goals;
CREATE TABLE goals (
    goal_id INTEGER(32) NOT NULL,
    goal TEXT(256) NOT NULL,
    num_days INTEGER(32) NOT NULL,
    num_following INTEGER(32) NOT NULL DEFAULT 0,
    status INTEGER(32) NOT NULL,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("goal_id")
);

DROP TABLE IF EXISTS pools; 
CREATE TABLE pools (
    pool_id TEXT(256) NOT NULL,
    goal_id TEXT(256) NOT NULL,
    status INTEGER(32) NOT NULL DEFAULT 0,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY("pool_id")
);

DROP TABLE IF EXISTS participants;
CREATE TABLE participants (
    pool_id TEXT(256) NOT NULL,
    user_id TEXT(256) NOT NULL,
    status INTEGER(32) NOT NULL DEFAULT 0,
    time_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY("pool_id", "user_id")
);