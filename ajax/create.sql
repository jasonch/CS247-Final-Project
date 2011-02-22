DROP TABLE IF EXISTS challenges;
CREATE TABLE challenges (
	"challenge_id" INTEGER (32),
	"from_user" INTEGER (32) NOT NULL,
	"to_user" INTEGER (32) NOT NULL,
	"challenge" TEXT (256) NOT NULL,
	"num_days" INTEGER (3) NOT NULL,
	"stake" INTEGER (256) NOT NULL,
	"time_created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"time_ended" TIMESTAMP,
	"status" INTEGER (3) NOT NULL DEFAULT 1,
	PRIMARY KEY ("challenge_id")
);
DROP TABLE IF EXISTS friends;
CREATE TABLE friends (
	"user_id" TEXT(256) NOT NULL,
	"friend_id" TEXT(256) NOT NULL,
	"time_stamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("user_id","friend_id")
);
DROP TABLE IF EXISTS users;
CREATE TABLE users (
	"user_id" TEXT(256) NOT NULL,
	"name" TEXT(256) NOT NULL,
	"points" INTEGER (256) DEFAULT 100,
	"message" INTEGER(256),
	"location" TEXT(256),
	"created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"status" INTEGER(3) DEFAULT 1,
	PRIMARY KEY("user_id")
);


