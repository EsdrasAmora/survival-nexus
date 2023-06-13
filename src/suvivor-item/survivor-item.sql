/* @name CreateItem */
INSERT INTO
    items (NAME, description)
VALUES
    (:name !, :description !) RETURNING item_id AS "itemId";

/* @name FindAllItems */
SELECT
    item_id AS "id",
    NAME AS "name",
    DESCRIPTION AS "description",
    created_at AS "createdAt"
FROM
    items;