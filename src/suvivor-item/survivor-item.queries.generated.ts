/** Types generated for queries found in "src/suvivor-item/survivor-item.queries.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'CreateItem' parameters type */
export interface ICreateItemParams {
  description: string;
  name: string;
}

/** 'CreateItem' return type */
export interface ICreateItemResult {
  itemId: number;
}

/** 'CreateItem' query type */
export interface ICreateItemQuery {
  params: ICreateItemParams;
  result: ICreateItemResult;
}

const createItemIR: any = {"usedParamSet":{"name":true,"description":true},"params":[{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":54,"b":60}]},{"name":"description","required":true,"transform":{"type":"scalar"},"locs":[{"a":63,"b":76}]}],"statement":"INSERT INTO\n    items (NAME, description)\nVALUES\n    (:name !, :description !) RETURNING item_id AS \"itemId\""};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     items (NAME, description)
 * VALUES
 *     (:name !, :description !) RETURNING item_id AS "itemId"
 * ```
 */
export const createItem = new PreparedQuery<ICreateItemParams,ICreateItemResult>(createItemIR);


/** 'FindAllItems' parameters type */
export type IFindAllItemsParams = void;

/** 'FindAllItems' return type */
export interface IFindAllItemsResult {
  createdAt: Date;
  description: string;
  id: number;
  name: string;
}

/** 'FindAllItems' query type */
export interface IFindAllItemsQuery {
  params: IFindAllItemsParams;
  result: IFindAllItemsResult;
}

const findAllItemsIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    item_id AS \"id\",\n    NAME AS \"name\",\n    DESCRIPTION AS \"description\",\n    created_at AS \"createdAt\"\nFROM\n    items"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     item_id AS "id",
 *     NAME AS "name",
 *     DESCRIPTION AS "description",
 *     created_at AS "createdAt"
 * FROM
 *     items
 * ```
 */
export const findAllItems = new PreparedQuery<IFindAllItemsParams,IFindAllItemsResult>(findAllItemsIR);


