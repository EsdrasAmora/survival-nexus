/** Types generated for queries found in "src/survivor/survivor.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type gender_type = 'F' | 'M' | 'Other';

export type numberArray = (number)[];

/** 'CreateSurvivor' parameters type */
export interface ICreateSurvivorParams {
  birthday: Date | string;
  gender: gender_type;
  hashedPassword: string;
  infected: boolean;
  lastLocation?: string /*(x,y)*/  | null | void;
  name: string;
  passwordSalt: string;
}

/** 'CreateSurvivor' return type */
export interface ICreateSurvivorResult {
  id: number;
}

/** 'CreateSurvivor' query type */
export interface ICreateSurvivorQuery {
  params: ICreateSurvivorParams;
  result: ICreateSurvivorResult;
}

const createSurvivorIR: any = {"usedParamSet":{"name":true,"birthday":true,"gender":true,"lastLocation":true,"infected":true,"hashedPassword":true,"passwordSalt":true},"params":[{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":191,"b":197}]},{"name":"birthday","required":true,"transform":{"type":"scalar"},"locs":[{"a":208,"b":218}]},{"name":"gender","required":true,"transform":{"type":"scalar"},"locs":[{"a":229,"b":237}]},{"name":"lastLocation","required":false,"transform":{"type":"scalar"},"locs":[{"a":248,"b":260}]},{"name":"infected","required":true,"transform":{"type":"scalar"},"locs":[{"a":271,"b":281}]},{"name":"hashedPassword","required":true,"transform":{"type":"scalar"},"locs":[{"a":292,"b":308}]},{"name":"passwordSalt","required":true,"transform":{"type":"scalar"},"locs":[{"a":319,"b":333}]}],"statement":"INSERT INTO\n    survivors (\n        NAME,\n        birthday,\n        gender,\n        last_location,\n        infected,\n        hashed_password,\n        password_salt\n    )\nVALUES\n    (\n        :name !,\n        :birthday !,\n        :gender !,\n        :lastLocation,\n        :infected !,\n        :hashedPassword !,\n        :passwordSalt !\n    ) RETURNING survivor_id AS \"id\""};

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
 *     (
 *         :name !,
 *         :birthday !,
 *         :gender !,
 *         :lastLocation,
 *         :infected !,
 *         :hashedPassword !,
 *         :passwordSalt !
 *     ) RETURNING survivor_id AS "id"
 * ```
 */
export const createSurvivor = new PreparedQuery<ICreateSurvivorParams,ICreateSurvivorResult>(createSurvivorIR);


/** 'FindSurvivorById' parameters type */
export interface IFindSurvivorByIdParams {
  survivorId: number;
}

/** 'FindSurvivorById' return type */
export interface IFindSurvivorByIdResult {
  birthday: Date;
  createdAt: Date;
  email: string;
  gender: gender_type;
  id: number;
  infected: boolean;
  lastLocation: { x: number; y: number } | null;
  name: string;
  updatedAt: Date | null;
}

/** 'FindSurvivorById' query type */
export interface IFindSurvivorByIdQuery {
  params: IFindSurvivorByIdParams;
  result: IFindSurvivorByIdResult;
}

const findSurvivorByIdIR: any = {"usedParamSet":{"survivorId":true},"params":[{"name":"survivorId","required":true,"transform":{"type":"scalar"},"locs":[{"a":244,"b":256}]}],"statement":"SELECT\n    survivor_id AS \"id\",\n    NAME AS \"name\",\n    email,\n    birthday,\n    gender,\n    infected,\n    last_location AS \"lastLocation\",\n    created_at AS \"createdAt\",\n    updated_at AS \"updatedAt\"\nFROM\n    survivors\nWHERE\n    survivor_id = :survivorId !"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     survivor_id AS "id",
 *     NAME AS "name",
 *     email,
 *     birthday,
 *     gender,
 *     infected,
 *     last_location AS "lastLocation",
 *     created_at AS "createdAt",
 *     updated_at AS "updatedAt"
 * FROM
 *     survivors
 * WHERE
 *     survivor_id = :survivorId !
 * ```
 */
export const findSurvivorById = new PreparedQuery<IFindSurvivorByIdParams,IFindSurvivorByIdResult>(findSurvivorByIdIR);


/** 'FindSurvivorByEmail' parameters type */
export interface IFindSurvivorByEmailParams {
  email: string;
}

/** 'FindSurvivorByEmail' return type */
export interface IFindSurvivorByEmailResult {
  birthday: Date;
  createdAt: Date;
  email: string;
  gender: gender_type;
  hashedPassword: string;
  id: number;
  infected: boolean;
  lastLocation: { x: number; y: number } | null;
  name: string;
  passwordSalt: string;
  updatedAt: Date | null;
}

/** 'FindSurvivorByEmail' query type */
export interface IFindSurvivorByEmailQuery {
  params: IFindSurvivorByEmailParams;
  result: IFindSurvivorByEmailResult;
}

const findSurvivorByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":true,"transform":{"type":"scalar"},"locs":[{"a":316,"b":323}]}],"statement":"SELECT\n    survivor_id AS \"id\",\n    NAME AS \"name\",\n    email,\n    birthday,\n    gender,\n    infected,\n    password_salt AS \"passwordSalt\",\n    hashed_password AS \"hashedPassword\",\n    last_location AS \"lastLocation\",\n    created_at AS \"createdAt\",\n    updated_at AS \"updatedAt\"\nFROM\n    survivors\nWHERE\n    email = :email !"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     survivor_id AS "id",
 *     NAME AS "name",
 *     email,
 *     birthday,
 *     gender,
 *     infected,
 *     password_salt AS "passwordSalt",
 *     hashed_password AS "hashedPassword",
 *     last_location AS "lastLocation",
 *     created_at AS "createdAt",
 *     updated_at AS "updatedAt"
 * FROM
 *     survivors
 * WHERE
 *     email = :email !
 * ```
 */
export const findSurvivorByEmail = new PreparedQuery<IFindSurvivorByEmailParams,IFindSurvivorByEmailResult>(findSurvivorByEmailIR);


/** 'UpdateSurvivor' parameters type */
export interface IUpdateSurvivorParams {
  birthday?: Date | string | null | void;
  gender?: gender_type | null | void;
  infected?: boolean | null | void;
  lastLocation?: string /*(x,y)*/  | null | void;
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

const findManySurvivorsIR: any = {"usedParamSet":{"cursorId":true,"limit":true},"params":[{"name":"cursorId","required":true,"transform":{"type":"scalar"},"locs":[{"a":342,"b":352}]},{"name":"limit","required":true,"transform":{"type":"scalar"},"locs":[{"a":394,"b":401}]}],"statement":"SELECT\n    (COUNT(*) OVER()) :: INT AS \"total!\",\n    survivor_id AS \"id\",\n    NAME AS \"name\",\n    birthday AS \"birthday\",\n    gender AS \"gender\",\n    last_location AS \"lastLocation\",\n    infected AS \"infected\",\n    created_at AS \"createdAt\",\n    updated_at AS \"updatedAt\"\nFROM\n    survivors\nWHERE\n    deleted_at IS NULL\n    AND survivor_id > :cursorId !\nORDER BY\n    survivor_id DESC\nLIMIT\n    :limit !"};

/**
 * Query generated from SQL:
 * ```
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


/** 'TradeSurvivorItems' parameters type */
export interface ITradeSurvivorItemsParams {
  fromSurvivorId: number;
  itemId: number;
  quantity: number;
  toSurvivorId: number;
}

/** 'TradeSurvivorItems' return type */
export interface ITradeSurvivorItemsResult {
  tradeId: string;
}

/** 'TradeSurvivorItems' query type */
export interface ITradeSurvivorItemsQuery {
  params: ITradeSurvivorItemsParams;
  result: ITradeSurvivorItemsResult;
}

const tradeSurvivorItemsIR: any = {"usedParamSet":{"itemId":true,"quantity":true,"fromSurvivorId":true,"toSurvivorId":true},"params":[{"name":"itemId","required":true,"transform":{"type":"scalar"},"locs":[{"a":136,"b":144}]},{"name":"quantity","required":true,"transform":{"type":"scalar"},"locs":[{"a":155,"b":165}]},{"name":"fromSurvivorId","required":true,"transform":{"type":"scalar"},"locs":[{"a":176,"b":192}]},{"name":"toSurvivorId","required":true,"transform":{"type":"scalar"},"locs":[{"a":203,"b":217}]}],"statement":"INSERT INTO\n    trades (\n        item_id,\n        quantity,\n        from_survivor_id,\n        to_survivor_id\n    )\nVALUES\n    (\n        :itemId !,\n        :quantity !,\n        :fromSurvivorId !,\n        :toSurvivorId !\n    ) RETURNING trade_id AS \"tradeId\""};

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
export const tradeSurvivorItems = new PreparedQuery<ITradeSurvivorItemsParams,ITradeSurvivorItemsResult>(tradeSurvivorItemsIR);


/** 'DeleteSurvivalItem' parameters type */
export interface IDeleteSurvivalItemParams {
  itemId: number;
  survivorId: number;
}

/** 'DeleteSurvivalItem' return type */
export type IDeleteSurvivalItemResult = void;

/** 'DeleteSurvivalItem' query type */
export interface IDeleteSurvivalItemQuery {
  params: IDeleteSurvivalItemParams;
  result: IDeleteSurvivalItemResult;
}

const deleteSurvivalItemIR: any = {"usedParamSet":{"survivorId":true,"itemId":true},"params":[{"name":"survivorId","required":true,"transform":{"type":"scalar"},"locs":[{"a":56,"b":68}]},{"name":"itemId","required":true,"transform":{"type":"scalar"},"locs":[{"a":88,"b":96}]}],"statement":"DELETE FROM\n    survivors_items\nWHERE\n    survivor_id = :survivorId !\n    AND item_id = :itemId !"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM
 *     survivors_items
 * WHERE
 *     survivor_id = :survivorId !
 *     AND item_id = :itemId !
 * ```
 */
export const deleteSurvivalItem = new PreparedQuery<IDeleteSurvivalItemParams,IDeleteSurvivalItemResult>(deleteSurvivalItemIR);


/** 'UpsertSurvivorItems' parameters type */
export interface IUpsertSurvivorItemsParams {
  itemId: number;
  quantity: number;
  survivorId: number;
}

/** 'UpsertSurvivorItems' return type */
export type IUpsertSurvivorItemsResult = void;

/** 'UpsertSurvivorItems' query type */
export interface IUpsertSurvivorItemsQuery {
  params: IUpsertSurvivorItemsParams;
  result: IUpsertSurvivorItemsResult;
}

const upsertSurvivorItemsIR: any = {"usedParamSet":{"survivorId":true,"itemId":true,"quantity":true},"params":[{"name":"survivorId","required":true,"transform":{"type":"scalar"},"locs":[{"a":116,"b":128}]},{"name":"itemId","required":true,"transform":{"type":"scalar"},"locs":[{"a":139,"b":147}]},{"name":"quantity","required":true,"transform":{"type":"scalar"},"locs":[{"a":158,"b":168}]}],"statement":"INSERT INTO\n    survivors_items (\n        survivor_id,\n        item_id,\n        quantity\n    )\nVALUES\n    (\n        :survivorId !,\n        :itemId !,\n        :quantity !\n    ) ON CONFLICT (survivor_id, item_id) DO\nUPDATE\nSET\n    quantity = survivors_items.quantity + EXCLUDED.quantity"};

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
 *     quantity = survivors_items.quantity + EXCLUDED.quantity
 * ```
 */
export const upsertSurvivorItems = new PreparedQuery<IUpsertSurvivorItemsParams,IUpsertSurvivorItemsResult>(upsertSurvivorItemsIR);


/** 'LockSurvivorItems' parameters type */
export interface ILockSurvivorItemsParams {
  itemId: number;
  survivorIds: numberArray;
}

/** 'LockSurvivorItems' return type */
export interface ILockSurvivorItemsResult {
  quantity: number;
  survivorId: number;
}

/** 'LockSurvivorItems' query type */
export interface ILockSurvivorItemsQuery {
  params: ILockSurvivorItemsParams;
  result: ILockSurvivorItemsResult;
}

const lockSurvivorItemsIR: any = {"usedParamSet":{"itemId":true,"survivorIds":true},"params":[{"name":"itemId","required":true,"transform":{"type":"scalar"},"locs":[{"a":98,"b":106}]},{"name":"survivorIds","required":true,"transform":{"type":"scalar"},"locs":[{"a":134,"b":147}]}],"statement":"SELECT\n    survivor_id AS \"survivorId\",\n    quantity\nFROM\n    survivors_items\nWHERE\n    item_id = :itemId !\n    AND survivor_id = ANY(:survivorIds ! :: INTEGER [ ]) FOR\nUPDATE"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     survivor_id AS "survivorId",
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


/** 'InfectedSurvivorsReport' parameters type */
export type IInfectedSurvivorsReportParams = void;

/** 'InfectedSurvivorsReport' return type */
export interface IInfectedSurvivorsReportResult {
  amount: string | null;
  infected: boolean;
}

/** 'InfectedSurvivorsReport' query type */
export interface IInfectedSurvivorsReportQuery {
  params: IInfectedSurvivorsReportParams;
  result: IInfectedSurvivorsReportResult;
}

const infectedSurvivorsReportIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    infected,\n    COUNT(*) AS \"amount\"\nFROM\n    survivors\nGROUP BY\n    infected                                                               "};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     infected,
 *     COUNT(*) AS "amount"
 * FROM
 *     survivors
 * GROUP BY
 *     infected                                                               
 * ```
 */
export const infectedSurvivorsReport = new PreparedQuery<IInfectedSurvivorsReportParams,IInfectedSurvivorsReportResult>(infectedSurvivorsReportIR);


/** 'ItemsPerSurvivorsReport' parameters type */
export type IItemsPerSurvivorsReportParams = void;

/** 'ItemsPerSurvivorsReport' return type */
export interface IItemsPerSurvivorsReportResult {
  amount: string | null;
  avarge: number | null;
  itemId: number;
  total: string | null;
}

/** 'ItemsPerSurvivorsReport' query type */
export interface IItemsPerSurvivorsReportQuery {
  params: IItemsPerSurvivorsReportParams;
  result: IItemsPerSurvivorsReportResult;
}

const itemsPerSurvivorsReportIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    si.item_id AS \"itemId\",\n    SUM(si.quantity) AS \"amount\",\n    MAX(survivors_count.total) AS \"total\",\n    SUM(si.quantity) :: FLOAT / MAX(survivors_count.total) AS \"avarge\"\nFROM\n    survivors_items si\n    CROSS JOIN (\n        SELECT\n            COUNT(*)\n        FROM\n            survivors\n    ) survivors_count (total)\nGROUP BY\n    si.item_id\nORDER BY\n    amount DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     si.item_id AS "itemId",
 *     SUM(si.quantity) AS "amount",
 *     MAX(survivors_count.total) AS "total",
 *     SUM(si.quantity) :: FLOAT / MAX(survivors_count.total) AS "avarge"
 * FROM
 *     survivors_items si
 *     CROSS JOIN (
 *         SELECT
 *             COUNT(*)
 *         FROM
 *             survivors
 *     ) survivors_count (total)
 * GROUP BY
 *     si.item_id
 * ORDER BY
 *     amount DESC
 * ```
 */
export const itemsPerSurvivorsReport = new PreparedQuery<IItemsPerSurvivorsReportParams,IItemsPerSurvivorsReportResult>(itemsPerSurvivorsReportIR);


