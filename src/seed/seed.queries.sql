/* 
 @name CreateSurvivors
 @param newSurvivors -> ((name!, birthday!, gender!, email!, lastLocation!, infected!, hashedPassword!, passwordSalt! )...) 
 */
INSERT INTO
    survivors (
        NAME,
        birthday,
        gender,
        email,
        last_location,
        infected,
        hashed_password,
        password_salt
    )
VALUES
    :newSurvivors RETURNING survivor_id AS "id";

/* 
 @name GiveItems
 @param itemSurvivorPair -> ((survivorId !, itemId!, quantity! )...) 
 */
INSERT INTO
    survivors_items (
        survivor_id,
        item_id,
        quantity
    )
VALUES
    :itemSurvivorPair;

/* @name TruncateAllTables */
TRUNCATE survivors,
items,
survivors_items,
trades CASCADE;

/* @name ResetSurvivorsSeq */
ALTER SEQUENCE survivors_survivor_id_seq RESTART WITH 1;

/* @name ResetItemsSeq */
ALTER SEQUENCE items_item_id_seq RESTART WITH 1;