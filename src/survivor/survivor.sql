/* @name CreateSurvivor */
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
    (
        :name !,
        :birthday !,
        :hashedPassword !,
        :passwordSalt !,
        :gender !,
        :lastLocation,
        :infected !
    ) RETURNING survivor_id AS "id";

/* @name FindSurvivorById */
SELECT
    survivor_id AS "id",
    NAME AS "name",
    email,
    birthday,
    gender,
    infected,
    last_location AS "lastLocation",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
FROM
    survivors
WHERE
    survivor_id = :survivorId !;

/* @name FindSurvivorByEmail */
SELECT
    survivor_id AS "id",
    NAME AS "name",
    email,
    birthday,
    gender,
    infected,
    password_salt AS "passwordSalt",
    hashed_password AS "hashedPassword",
    last_location AS "lastLocation",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
FROM
    survivors
WHERE
    email = :email !;

/* @name UpdateSurvivor */
UPDATE
    survivors
SET
    NAME = COALESCE(:name, NAME),
    birthday = COALESCE(:birthday, birthday),
    gender = COALESCE(:gender, gender),
    last_location = COALESCE(:lastLocation, last_location),
    infected = COALESCE(:infected, infected),
    updated_at = now()
WHERE
    survivor_id = :survivorId !;

/* @name FindManySurvivors */
SELECT
    (COUNT(*) OVER()) :: INT AS "total!",
    survivor_id AS "id",
    NAME AS "name",
    birthday AS "birthday",
    gender AS "gender",
    last_location AS "lastLocation",
    infected AS "infected",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
FROM
    survivors
WHERE
    deleted_at IS NULL
    AND survivor_id > :cursorId !
ORDER BY
    survivor_id DESC
LIMIT
    :limit !;

/* @name TradeSurvivorItems */
INSERT INTO
    trades (
        item_id,
        quantity,
        from_survivor_id,
        to_survivor_id
    )
VALUES
    (
        :itemId !,
        :quantity !,
        :fromSurvivorId !,
        :toSurvivorId !
    ) RETURNING trade_id AS "tradeId";

/* @name DeleteSurvivalItem */
DELETE FROM
    survivors_items
WHERE
    survivor_id = :survivorId !
    AND item_id = :itemId !;

/* @name UpsertSurvivorItems */
INSERT INTO
    survivors_items (
        survivor_id,
        item_id,
        quantity
    )
VALUES
    (
        :survivorId !,
        :itemId !,
        :quantity !
    ) ON CONFLICT (survivor_id, item_id) DO
UPDATE
SET
    quantity = survivors_items.quantity + :quantity !;

/* @name LockSurvivorItems */
SELECT
    survivor_id AS "survivorId",
    quantity
FROM
    survivors_items
WHERE
    item_id = :itemId !
    AND survivor_id = ANY(:survivorIds ! :: INTEGER [ ]) FOR
UPDATE
;