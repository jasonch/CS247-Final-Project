SQLite format 3   @                                                                             �    �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   � �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             seanw4SeanWoolfolk
   � �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
seanw4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  �  ����'                                                                                                                                                                                                        �o	�=tableusersusersCREATE TABLE users (
	"user_id" TEXT(256) NOT NULL,
	"status" INTEGER(256),
	"first_name" TEXT(256) NOT NULL,
	"last_name" TEXT(256) NOT NULL,
	"location" TEXT(256),
	"time_stamp" TIMESTAMP,
	PRIMARY KEY("user_id")
))
= indexsqlite_autoindex_users_1users�v##�3tableresolutionsresolutionsCREATE TABLE resolutions (
	"resolution_id" INTEGER(256) NOT NULL,
	"resolution" TEXT(256) NOT NULL,
	"num_attempting" INTEGER(256),
	"creator" TEXT(256),
	"time_stamp" TIMESTAMP,
	PRIMARY KEY("resolution_id")
)5I# indexsqlite_autoindex_resolutions_1resolutions�V--�_tableuser_resolutionsuser_resolutionsCREATE TABLE user_resolutions (
	"user_id" TEXT(256) NOT NULL,
	"resolution_id" INTEGER(256) NOT NULL,
	"time_stamp" TIMESTAMP,
	PRIMARY KEY("user_id","resolution_id")
)   c c��                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ?S- indexsqlite_autoindex_user_resolutions_1user_resolutions�77�;tablecompleted_resolutionscompleted_resolutionsCREATE TABLE completed_resolutions (
	"user_id" text(256) NOT NULL,
	"resolution_id" integer(256) NOT NULL,
	"location" TEXT(256) NOT NULL,
	"time_stamp" TIMESTAMP NOT NULL,
	PRIMARY KEY("user_id","resolution_id")
)I]7 indexsqlite_autoindex_completed_resolutions_1completed_resolutions	