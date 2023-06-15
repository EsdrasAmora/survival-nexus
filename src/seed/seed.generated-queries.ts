/** Types generated for queries found in "src/seed/seed.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type gender_type = 'F' | 'M' | 'Other';

/** 'CreateSurvivors' parameters type */
export interface ICreateSurvivorsParams {
  newSurvivors: readonly ({
    name: string,
    birthday: Date | string,
    gender: gender_type,
    lastLocation: string /*(x,y)*/ ,
    infected: boolean,
    hashedPassword: string,
    passwordSalt: string
  })[];
}

/** 'CreateSurvivors' return type */
export interface ICreateSurvivorsResult {
  id: number;
}

/** 'CreateSurvivors' query type */
export interface ICreateSurvivorsQuery {
  params: ICreateSurvivorsParams;
  result: ICreateSurvivorsResult;
}

const createSurvivorsIR: any = {"usedParamSet":{"newSurvivors":true},"params":[{"name":"newSurvivors","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"name","required":true},{"name":"birthday","required":true},{"name":"gender","required":true},{"name":"lastLocation","required":true},{"name":"infected","required":true},{"name":"hashedPassword","required":true},{"name":"passwordSalt","required":true}]},"locs":[{"a":181,"b":193}]}],"statement":"INSERT INTO\n    survivors (\n        NAME,\n        birthday,\n        gender,\n        last_location,\n        infected,\n        hashed_password,\n        password_salt\n    )\nVALUES\n    :newSurvivors RETURNING survivor_id AS \"id\""};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     survivors (
 *         NAME,
 *         birthday,
 *         gender,
 *         last_location,
 *         infected,
 *         hashed_password,
 *         password_salt
 *     )
 * VALUES
 *     :newSurvivors RETURNING survivor_id AS "id"
 * ```
 */
export const createSurvivors = new PreparedQuery<ICreateSurvivorsParams,ICreateSurvivorsResult>(createSurvivorsIR);


/** 'GiveItems' parameters type */
export interface IGiveItemsParams {
  itemSurvivorPair: readonly ({
    itemId: number,
    survivorId: number,
    quantity: number
  })[];
}

/** 'GiveItems' return type */
export type IGiveItemsResult = void;

/** 'GiveItems' query type */
export interface IGiveItemsQuery {
  params: IGiveItemsParams;
  result: IGiveItemsResult;
}

const giveItemsIR: any = {"usedParamSet":{"itemSurvivorPair":true},"params":[{"name":"itemSurvivorPair","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"itemId","required":true},{"name":"survivorId","required":true},{"name":"quantity","required":true}]},"locs":[{"a":106,"b":122}]}],"statement":"INSERT INTO\n    survivors_items (\n        survivor_id,\n        item_id,\n        quantity\n    )\nVALUES\n    :itemSurvivorPair ON CONFLICT (survivor_id, item_id) DO\nUPDATE\nSET\n    quantity = survivors_items.quantity + EXCLUDED.quantity"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     survivors_items (
 *         survivor_id,
 *         item_id,
 *         quantity
 *     )
 * VALUES
 *     :itemSurvivorPair ON CONFLICT (survivor_id, item_id) DO
 * UPDATE
 * SET
 *     quantity = survivors_items.quantity + EXCLUDED.quantity
 * ```
 */
export const giveItems = new PreparedQuery<IGiveItemsParams,IGiveItemsResult>(giveItemsIR);


/** 'TruncateAllTables' parameters type */
export type ITruncateAllTablesParams = void;

/** 'TruncateAllTables' return type */
export type ITruncateAllTablesResult = void;

/** 'TruncateAllTables' query type */
export interface ITruncateAllTablesQuery {
  params: ITruncateAllTablesParams;
  result: ITruncateAllTablesResult;
}

const truncateAllTablesIR: any = {"usedParamSet":{},"params":[],"statement":"TRUNCATE survivors,\nitems,\nsurvivors_items,\ntrades CASCADE"};

/**
 * Query generated from SQL:
 * ```
 * TRUNCATE survivors,
 * items,
 * survivors_items,
 * trades CASCADE
 * ```
 */
export const truncateAllTables = new PreparedQuery<ITruncateAllTablesParams,ITruncateAllTablesResult>(truncateAllTablesIR);


/** Query 'ResetAllSequences' is invalid, so its result is assigned type 'never'.
 * Query contains an anonymous column. Consider giving the column an explicit name. */
export type IResetAllSequencesResult = never;

/** Query 'ResetAllSequences' is invalid, so its parameters are assigned type 'never'.
 * Query contains an anonymous column. Consider giving the column an explicit name. */
export type IResetAllSequencesParams = never;

const resetAllSequencesIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    'SELECT SETVAL(' || quote_literal(\n        quote_ident(sequence_namespace.nspname) || '.' || quote_ident(class_sequence.relname)\n    ) || ', COALESCE(MAX(' || quote_ident(pg_attribute.attname) || '), 1) ) FROM ' || quote_ident(table_namespace.nspname) || '.' || quote_ident(class_table.relname) || ';'\nFROM\n    pg_depend\n    INNER JOIN pg_class AS class_sequence ON class_sequence.oid = pg_depend.objid\n    AND class_sequence.relkind = 'S'\n    INNER JOIN pg_class AS class_table ON class_table.oid = pg_depend.refobjid\n    INNER JOIN pg_attribute ON pg_attribute.attrelid = class_table.oid\n    AND pg_depend.refobjsubid = pg_attribute.attnum\n    INNER JOIN pg_namespace AS table_namespace ON table_namespace.oid = class_table.relnamespace\n    INNER JOIN pg_namespace AS sequence_namespace ON sequence_namespace.oid = class_sequence.relnamespace\nORDER BY\n    sequence_namespace.nspname,\n    class_sequence.relname"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     'SELECT SETVAL(' || quote_literal(
 *         quote_ident(sequence_namespace.nspname) || '.' || quote_ident(class_sequence.relname)
 *     ) || ', COALESCE(MAX(' || quote_ident(pg_attribute.attname) || '), 1) ) FROM ' || quote_ident(table_namespace.nspname) || '.' || quote_ident(class_table.relname) || ';'
 * FROM
 *     pg_depend
 *     INNER JOIN pg_class AS class_sequence ON class_sequence.oid = pg_depend.objid
 *     AND class_sequence.relkind = 'S'
 *     INNER JOIN pg_class AS class_table ON class_table.oid = pg_depend.refobjid
 *     INNER JOIN pg_attribute ON pg_attribute.attrelid = class_table.oid
 *     AND pg_depend.refobjsubid = pg_attribute.attnum
 *     INNER JOIN pg_namespace AS table_namespace ON table_namespace.oid = class_table.relnamespace
 *     INNER JOIN pg_namespace AS sequence_namespace ON sequence_namespace.oid = class_sequence.relnamespace
 * ORDER BY
 *     sequence_namespace.nspname,
 *     class_sequence.relname
 * ```
 */
export const resetAllSequences = new PreparedQuery<IResetAllSequencesParams,IResetAllSequencesResult>(resetAllSequencesIR);


