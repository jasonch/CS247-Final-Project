DROP TABLE IF EXISTS challenges;
CREATE TABLE challenges (
	"challenge_id" INTEGER PRIMARY KEY AUTOINCREMENT,
	"from_user" INTEGER (32) NOT NULL REFERENCES users (`user_id`),
	"to_user" INTEGER (32) NOT NULL, -- can be not CEL user
	"challenge" TEXT (256) NOT NULL,
	"num_days" INTEGER (3) DEFAULT 3,
	"stake" INTEGER (256) NOT NULL CHECK (`stake` >= 0),
	"time_created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"time_started" TIMESTAMP,
	"time_ended" TIMESTAMP,
	"status" INTEGER (5) NOT NULL DEFAULT 0 -- "0=>pending, 1=>active, 2=>completed,3=>failed,4=>cancelled, "
);
DROP TABLE IF EXISTS friends;
CREATE TABLE friends (
	"user_id" TEXT(256) NOT NULL REFERENCES users (`user_id`),
	"friend_id" TEXT(256) NOT NULL REFERENCES users (`user_id`),
	"time_stamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("user_id","friend_id")
);
DROP TABLE IF EXISTS users;
CREATE TABLE users (
	"user_id" TEXT(256) NOT NULL,
	"name" TEXT(256) NOT NULL,
	"points" INTEGER (256) DEFAULT 100 CHECK (`points` >=0),
	"message" INTEGER(256),
	"location" TEXT(256),
	"created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"status" INTEGER(3) DEFAULT 1,
	PRIMARY KEY("user_id")
);
