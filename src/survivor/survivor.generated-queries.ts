/** Types generated for queries found in "src/survivor/survivor.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type gender_type = 'F' | 'M' | 'Other';

export type numberArray = (number)[];

/** 'CreateSurvivor' parameters type */
export interface ICreateSurvivorParams {
  birthday: Date | string;
  gender: gender_type;
  infected: boolean;
  lastLocation?: { x: number; y: number } | null | void;
  name: string;
}

/** 'CreateSurvivor' return type */
export interface ICreateSurvivorResult {
  birthday: Date;
  createdAt: Date;
  deletedAt: Date | null;
  gender: gender_type;
  id: number;
  infected: boolean;
  lastLocation: { x: number; y: number } | null;
  name: string;
  updatedAt: Date | null;
}

/** 'CreateSurvivor' query type */
export interface ICreateSurvivorQuery {
  params: ICreateSurvivorParams;
  result: ICreateSurvivorResult;
}

const createSurvivorIR: any = {"usedParamSet":{"name":true,"birthday":true,"gender":true,"lastLocation":true,"infected":true},"params":[{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":97,"b":103}]},{"name":"birthday","required":true,"transform":{"type":"scalar"},"locs":[{"a":114,"b":124}]},{"name":"gender","required":true,"transform":{"type":"scalar"},"locs":[{"a":135,"b":143}]},{"name":"lastLocation","required":false,"transform":{"type":"scalar"},"locs":[{"a":154,"b":166}]},{"name":"infected","required":true,"transform":{"type":"scalar"},"locs":[{"a":177,"b":187}]}],"statement":"INSERT INTO\n    survivors (NAME, birthday, gender, last_location, infected)\nVALUES\n    (\n        :name !,\n        :birthday !,\n        :gender !,\n        :lastLocation,\n        :infected !\n    ) RETURNING survivor_id AS \"id\",\n    NAME AS \"name\",\n    birthday AS \"birthday\",\n    gender AS \"gender\",\n    last_location AS \"lastLocation\",\n    infected AS \"infected\",\n    deleted_at AS \"deletedAt\",\n    created_at AS \"createdAt\",\n    updated_at AS \"updatedAt\""};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     survivors (NAME, birthday, gender, last_location, infected)
 * VALUES
 *     (
 *         :name !,
 *         :birthday !,
 *         :gender !,
 *         :lastLocation,
 *         :infected !
 *     ) RETURNING survivor_id AS "id",
 *     NAME AS "name",
 *     birthday AS "birthday",
 *     gender AS "gender",
 *     last_location AS "lastLocation",
 *     infected AS "infected",
 *     deleted_at AS "deletedAt",
 *     created_at AS "createdAt",
 *     updated_at AS "updatedAt"
 * ```
 */
export const createSurvivor = new PreparedQuery<ICreateSurvivorParams,ICreateSurvivorResult>(createSurvivorIR);


/** 'UpdateSurvivor' parameters type */
export interface IUpdateSurvivorParams {
  birthday?: Date | string | null | void;
  gender?: gender_type | null | void;
  infected?: boolean | null | void;
  lastLocation?: { x: number; y: number } | null | void;
  name?: string | null | void;
  survivorId: number;
}

/** 'UpdateSurvivor' return type */
export type IUpdateSurvivorResult = void;

/** 'UpdateSurvivor' query type */
export interface IUpdateSurvivorQuery {
  params: IUpdateSurvivorParams;
  result: IUpdateSurvivorResult;
}

const updateSurvivorIR: any = {"usedParamSet":{"name":true,"birthday":true,"gender":true,"lastLocation":true,"infected":true,"survivorId":true},"params":[{"name":"name","required":false,"transform":{"type":"scalar"},"locs":[{"a":45,"b":49}]},{"name":"birthday","required":false,"transform":{"type":"scalar"},"locs":[{"a":83,"b":91}]},{"name":"gender","required":false,"transform":{"type":"scalar"},"locs":[{"a":127,"b":133}]},{"name":"lastLocation","required":false,"transform":{"type":"scalar"},"locs":[{"a":174,"b":186}]},{"name":"infected","required":false,"transform":{"type":"scalar"},"locs":[{"a":229,"b":237}]},{"name":"survivorId","required":true,"transform":{"type":"scalar"},"locs":[{"a":298,"b":310}]}],"statement":"UPDATE\n    survivors\nSET\n    NAME = COALESCE(:name, NAME),\n    birthday = COALESCE(:birthday, birthday),\n    gender = COALESCE(:gender, gender),\n    last_location = COALESCE(:lastLocation, last_location),\n    infected = COALESCE(:infected, infected),\n    updated_at = now()\nWHERE\n    survivor_id = :survivorId !"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE
 *     survivors
 * SET
 *     NAME = COALESCE(:name, NAME),
 *     birthday = COALESCE(:birthday, birthday),
 *     gender = COALESCE(:gender, gender),
 *     last_location = COALESCE(:lastLocation, last_location),
 *     infected = COALESCE(:infected, infected),
 *     updated_at = now()
 * WHERE
 *     survivor_id = :survivorId !
 * ```
 */
export const updateSurvivor = new PreparedQuery<IUpdateSurvivorParams,IUpdateSurvivorResult>(updateSurvivorIR);


/** 'FindManySurvivors' parameters type */
export interface IFindManySurvivorsParams {
  cursorId: number;
  limit: number | string;
}

/** 'FindManySurvivors' return type */
export interface IFindManySurvivorsResult {
  birthday: Date;
  createdAt: Date;
  gender: gender_type;
  id: number;
  infected: boolean;
  lastLocation: { x: number; y: number } | null;
  name: string;
  total: number;
  updatedAt: Date | null;
}

/** 'FindManySurvivors' query type */
export interface IFindManySurvivorsQuery {
  params: IFindManySurvivorsParams;
  result: IFindManySurvivorsResult;
}

const findManySurvivorsIR: any = {"usedParamSet":{"cursorId":true,"limit":true},"params":[{"name":"cursorId","required":true,"transform":{"type":"scalar"},"locs":[{"a":367,"b":377}]},{"name":"limit","required":true,"transform":{"type":"scalar"},"locs":[{"a":419,"b":426}]}],"statement":"                        \nSELECT\n    (COUNT(*) OVER()) :: INT AS \"total!\",\n    survivor_id AS \"id\",\n    NAME AS \"name\",\n    birthday AS \"birthday\",\n    gender AS \"gender\",\n    last_location AS \"lastLocation\",\n    infected AS \"infected\",\n    created_at AS \"createdAt\",\n    updated_at AS \"updatedAt\"\nFROM\n    survivors\nWHERE\n    deleted_at IS NULL\n    AND survivor_id > :cursorId !\nORDER BY\n    survivor_id DESC\nLIMIT\n    :limit !"};

/**
 * Query generated from SQL:
 * ```
 *                         
 * SELECT
 *     (COUNT(*) OVER()) :: INT AS "total!",
 *     survivor_id AS "id",
 *     NAME AS "name",
 *     birthday AS "birthday",
 *     gender AS "gender",
 *     last_location AS "lastLocation",
 *     infected AS "infected",
 *     created_at AS "createdAt",
 *     updated_at AS "updatedAt"
 * FROM
 *     survivors
 * WHERE
 *     deleted_at IS NULL
 *     AND survivor_id > :cursorId !
 * ORDER BY
 *     survivor_id DESC
 * LIMIT
 *     :limit !
 * ```
 */
export const findManySurvivors = new PreparedQuery<IFindManySurvivorsParams,IFindManySurvivorsResult>(findManySurvivorsIR);


/** 'TradeItems' parameters type */
export interface ITradeItemsParams {
  fromSurvivorId: number;
  itemId: number;
  quantity: number;
  toSurvivorId: number;
}

/** 'TradeItems' return type */
export interface ITradeItemsResult {
  tradeId: string;
}

/** 'TradeItems' query type */
export interface ITradeItemsQuery {
  params: ITradeItemsParams;
  result: ITradeItemsResult;
}

const tradeItemsIR: any = {"usedParamSet":{"itemId":true,"quantity":true,"fromSurvivorId":true,"toSurvivorId":true},"params":[{"name":"itemId","required":true,"transform":{"type":"scalar"},"locs":[{"a":136,"b":144}]},{"name":"quantity","required":true,"transform":{"type":"scalar"},"locs":[{"a":155,"b":165}]},{"name":"fromSurvivorId","required":true,"transform":{"type":"scalar"},"locs":[{"a":176,"b":192}]},{"name":"toSurvivorId","required":true,"transform":{"type":"scalar"},"locs":[{"a":203,"b":217}]}],"statement":"INSERT INTO\n    trades (\n        item_id,\n        quantity,\n        from_survivor_id,\n        to_survivor_id\n    )\nVALUES\n    (\n        :itemId !,\n        :quantity !,\n        :fromSurvivorId !,\n        :toSurvivorId !\n    ) RETURNING trade_id AS \"tradeId\""};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     trades (
 *         item_id,
 *         quantity,
 *         from_survivor_id,
 *         to_survivor_id
 *     )
 * VALUES
 *     (
 *         :itemId !,
 *         :quantity !,
 *         :fromSurvivorId !,
 *         :toSurvivorId !
 *     ) RETURNING trade_id AS "tradeId"
 * ```
 */
export const tradeItems = new PreparedQuery<ITradeItemsParams,ITradeItemsResult>(tradeItemsIR);


/** 'UpdateItems' parameters type */
export interface IUpdateItemsParams {
  itemId: number;
  quantity: number;
  survivorId: number;
}

/** 'UpdateItems' return type */
export type IUpdateItemsResult = void;

/** 'UpdateItems' query type */
export interface IUpdateItemsQuery {
  params: IUpdateItemsParams;
  result: IUpdateItemsResult;
}

const updateItemsIR: any = {"usedParamSet":{"survivorId":true,"itemId":true,"quantity":true},"params":[{"name":"survivorId","required":true,"transform":{"type":"scalar"},"locs":[{"a":116,"b":128}]},{"name":"itemId","required":true,"transform":{"type":"scalar"},"locs":[{"a":139,"b":147}]},{"name":"quantity","required":true,"transform":{"type":"scalar"},"locs":[{"a":158,"b":168},{"a":267,"b":277}]}],"statement":"INSERT INTO\n    survivors_items (\n        survivor_id,\n        item_id,\n        quantity\n    )\nVALUES\n    (\n        :survivorId !,\n        :itemId !,\n        :quantity !\n    ) ON CONFLICT (survivor_id, item_id) DO\nUPDATE\nSET\n    quantity = survivors_items.quantity + :quantity !"};

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
 *     (
 *         :survivorId !,
 *         :itemId !,
 *         :quantity !
 *     ) ON CONFLICT (survivor_id, item_id) DO
 * UPDATE
 * SET
 *     quantity = survivors_items.quantity + :quantity !
 * ```
 */
export const updateItems = new PreparedQuery<IUpdateItemsParams,IUpdateItemsResult>(updateItemsIR);


/** 'LockSurvivorItems' parameters type */
export interface ILockSurvivorItemsParams {
  itemId: number;
  survivorIds: numberArray;
}

/** 'LockSurvivorItems' return type */
export interface ILockSurvivorItemsResult {
  quantity: number;
  survivor_id: number;
}

/** 'LockSurvivorItems' query type */
export interface ILockSurvivorItemsQuery {
  params: ILockSurvivorItemsParams;
  result: ILockSurvivorItemsResult;
}

const lockSurvivorItemsIR: any = {"usedParamSet":{"itemId":true,"survivorIds":true},"params":[{"name":"itemId","required":true,"transform":{"type":"scalar"},"locs":[{"a":82,"b":90}]},{"name":"survivorIds","required":true,"transform":{"type":"scalar"},"locs":[{"a":118,"b":131}]}],"statement":"SELECT\n    survivor_id,\n    quantity\nFROM\n    survivors_items\nWHERE\n    item_id = :itemId !\n    AND survivor_id = ANY(:survivorIds ! :: INTEGER [ ]) FOR\nUPDATE"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     survivor_id,
 *     quantity
 * FROM
 *     survivors_items
 * WHERE
 *     item_id = :itemId !
 *     AND survivor_id = ANY(:survivorIds ! :: INTEGER [ ]) FOR
 * UPDATE
 * ```
 */
export const lockSurvivorItems = new PreparedQuery<ILockSurvivorItemsParams,ILockSurvivorItemsResult>(lockSurvivorItemsIR);

