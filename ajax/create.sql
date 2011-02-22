<<<<<<< HEAD:ajax/create.sql
DROP TABLE IF EXISTS challenges;
CREATE TABLE challenges (
	"challenge_id" INTEGER (32) NOT NULL,
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

=======
DROP TABLE IF EXISTS users;
CREATE TABLE users (
	"user_id" TEXT(256) NOT NULL,
	"status" INTEGER(256),
	"first_name" TEXT(256) NOT NULL,
	"last_name" TEXT(256) NOT NULL,
	"location" TEXT(256),
	"time_stamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("user_id")
);
DROP TABLE IF EXISTS resolutions;
CREATE TABLE resolutions (
	"resolution_id" INTEGER PRIMARY KEY,
	"resolution" TEXT(256) NOT NULL,
	"num_attempting" INTEGER(256),
	"num_days" INTEGER (256),
	"creator" TEXT(256),
	"status" INTEGER(3),
	"time_stamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS user_resolutions;
CREATE TABLE user_resolutions (
	"user_id" TEXT(256) NOT NULL,
	"resolution_id" INTEGER(256) NOT NULL,
	"time_stamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("user_id","resolution_id")
);
DROP TABLE IF EXISTS completed_resolutions;
CREATE TABLE completed_resolutions (
	"user_id" TEXT(256) NOT NULL,
	"resolution_id" integer(256) NOT NULL,
	"location" TEXT(256) NOT NULL,
	"time_stamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("user_id","resolution_id")
);
DROP TABLE IF EXISTS achievements;
CREATE TABLE achievements (
	"user_id" TEXT(256) NOT NULL,
	"num_resolutions_completed" TEXT(256) NOT NULL,
	PRIMARY KEY("user_id")
);
>>>>>>> 2d0c781cc0efbf144565a6477d94973a21c8df3e:ajax/create.sql
