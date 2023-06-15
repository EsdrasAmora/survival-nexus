/* 
 @name CreateSurvivors
 @param newSurvivors -> ((name!, birthday!, gender!, lastLocation!, infected!, hashedPassword!, passwordSalt! )...) 
 */
INSERT INTO
    survivors (
        NAME,
        birthday,
        gender,
        last_location,
        infected,
        hashed_password,
        password_salt
    )
VALUES
    :newSurvivors RETURNING survivor_id AS "id";

/* 
 @name GiveItems
 @param itemSurvivorPair -> ((itemId!, survivorId!, quantity! )...) 
 */
INSERT INTO
    survivors_items (
        survivor_id,
        item_id,
        quantity
    )
VALUES
    :itemSurvivorPair ON CONFLICT (survivor_id, item_id) DO
UPDATE
SET
    quantity = survivors_items.quantity + EXCLUDED.quantity;

/* @name TruncateAllTables */
TRUNCATE survivors,
items,
survivors_items,
trades CASCADE;

/* @name ResetAllSequences */
SELECT
    'SELECT SETVAL(' || quote_literal(
        quote_ident(sequence_namespace.nspname) || '.' || quote_ident(class_sequence.relname)
    ) || ', COALESCE(MAX(' || quote_ident(pg_attribute.attname) || '), 1) ) FROM ' || quote_ident(table_namespace.nspname) || '.' || quote_ident(class_table.relname) || ';'
FROM
    pg_depend
    INNER JOIN pg_class AS class_sequence ON class_sequence.oid = pg_depend.objid
    AND class_sequence.relkind = 'S'
    INNER JOIN pg_class AS class_table ON class_table.oid = pg_depend.refobjid
    INNER JOIN pg_attribute ON pg_attribute.attrelid = class_table.oid
    AND pg_depend.refobjsubid = pg_attribute.attnum
    INNER JOIN pg_namespace AS table_namespace ON table_namespace.oid = class_table.relnamespace
    INNER JOIN pg_namespace AS sequence_namespace ON sequence_namespace.oid = class_sequence.relnamespace
ORDER BY
    sequence_namespace.nspname,
    class_sequence.relname;