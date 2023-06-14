table "items" {
  schema = schema.public
  column "item_id" {
    type = integer
    identity {
      generated = ALWAYS
    }
  }
  column "name" {
    type = text
  }
  column "description" {
    type = text
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.item_id]
  }
}
table "survivors" {
  schema = schema.public
  column "survivor_id" {
    type = integer
    identity {
      generated = ALWAYS
    }
  }
  column "name" {
    type = text
  }
  column "birthday" {
    type = timestamptz
  }
  column "gender" {
    type = enum.gender_type
  }
  column "last_location" {
    null = true
    type = point
  }
  column "infected" {
    type = boolean
  }
  column "deleted_at" {
    null = true
    type = timestamptz
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  column "updated_at" {
    null = true
    type = timestamptz
  }
  primary_key {
    columns = [column.survivor_id]
  }
}
table "survivors_items" {
  schema = schema.public
  column "survivor_id" {
    type = integer
  }
  column "item_id" {
    type = integer
  }
  column "quantity" {
    type = integer
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  column "updated_at" {
    null = true
    type = timestamptz
  }
  primary_key {
    columns = [column.survivor_id, column.item_id]
  }
  check "survivors_items_quantity_not_zero_check" {
    expr = "quantity != 0"
  }
  foreign_key "survivors_items_item_id_fkey" {
    columns     = [column.item_id]
    ref_columns = [table.items.column.item_id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  foreign_key "survivors_items_survivor_id_fkey" {
    columns     = [column.survivor_id]
    ref_columns = [table.survivors.column.survivor_id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
}
table "trades" {
  schema = schema.public
  column "trade_id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "from_survivor_id" {
    type = integer
  }
  column "to_survivor_id" {
    type = integer
  }
  column "item_id" {
    type = integer
  }
  column "quantity" {
    type = integer
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.trade_id]
  }
  check "trades_quantity_not_zero_check" {
    expr = "quantity != 0"
  }
  foreign_key "trades_item_id_fkey" {
    columns     = [column.item_id]
    ref_columns = [table.items.column.item_id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  foreign_key "trades_from_survivor_id_fkey" {
    columns     = [column.from_survivor_id]
    ref_columns = [table.survivors.column.survivor_id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  foreign_key "trades_to_survivor_id_fkey" {
    columns     = [column.to_survivor_id]
    ref_columns = [table.survivors.column.survivor_id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
}
enum "gender_type" {
  schema = schema.public
  values = ["M", "F", "Other"]
}
schema "public" {
}
