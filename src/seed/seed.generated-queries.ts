/** Types generated for queries found in "src/seed/seed.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type gender_type = 'F' | 'M' | 'Other';

/** 'CreateSurvivors' parameters type */
export interface ICreateSurvivorsParams {
  newSurvivors: readonly ({
    name: string,
    birthday: Date | string,
    gender: gender_type,
    email: string,
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

const createSurvivorsIR: any = {"usedParamSet":{"newSurvivors":true},"params":[{"name":"newSurvivors","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"name","required":true},{"name":"birthday","required":true},{"name":"gender","required":true},{"name":"email","required":true},{"name":"lastLocation","required":true},{"name":"infected","required":true},{"name":"hashedPassword","required":true},{"name":"passwordSalt","required":true}]},"locs":[{"a":196,"b":208}]}],"statement":"INSERT INTO\n    survivors (\n        NAME,\n        birthday,\n        gender,\n        email,\n        last_location,\n        infected,\n        hashed_password,\n        password_salt\n    )\nVALUES\n    :newSurvivors RETURNING survivor_id AS \"id\""};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     survivors (
 *         NAME,
 *         birthday,
 *         gender,
 *         email,
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
    survivorId: number,
    itemId: number,
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

const giveItemsIR: any = {"usedParamSet":{"itemSurvivorPair":true},"params":[{"name":"itemSurvivorPair","required":false,"transform":{"type":"pick_array_spread","keys":[{"name":"survivorId","required":true},{"name":"itemId","required":true},{"name":"quantity","required":true}]},"locs":[{"a":106,"b":122}]}],"statement":"INSERT INTO\n    survivors_items (\n        survivor_id,\n        item_id,\n        quantity\n    )\nVALUES\n    :itemSurvivorPair"};

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
 *     :itemSurvivorPair
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


/** 'ResetSurvivorsSeq' parameters type */
export type IResetSurvivorsSeqParams = void;

/** 'ResetSurvivorsSeq' return type */
export type IResetSurvivorsSeqResult = void;

/** 'ResetSurvivorsSeq' query type */
export interface IResetSurvivorsSeqQuery {
  params: IResetSurvivorsSeqParams;
  result: IResetSurvivorsSeqResult;
}

const resetSurvivorsSeqIR: any = {"usedParamSet":{},"params":[],"statement":"ALTER SEQUENCE survivors_survivor_id_seq RESTART WITH 1"};

/**
 * Query generated from SQL:
 * ```
 * ALTER SEQUENCE survivors_survivor_id_seq RESTART WITH 1
 * ```
 */
export const resetSurvivorsSeq = new PreparedQuery<IResetSurvivorsSeqParams,IResetSurvivorsSeqResult>(resetSurvivorsSeqIR);


/** 'ResetItemsSeq' parameters type */
export type IResetItemsSeqParams = void;

/** 'ResetItemsSeq' return type */
export type IResetItemsSeqResult = void;

/** 'ResetItemsSeq' query type */
export interface IResetItemsSeqQuery {
  params: IResetItemsSeqParams;
  result: IResetItemsSeqResult;
}

const resetItemsSeqIR: any = {"usedParamSet":{},"params":[],"statement":"ALTER SEQUENCE items_item_id_seq RESTART WITH 1"};

/**
 * Query generated from SQL:
 * ```
 * ALTER SEQUENCE items_item_id_seq RESTART WITH 1
 * ```
 */
export const resetItemsSeq = new PreparedQuery<IResetItemsSeqParams,IResetItemsSeqResult>(resetItemsSeqIR);


