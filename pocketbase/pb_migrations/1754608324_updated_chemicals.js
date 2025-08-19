/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2110153588")

  // add field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3638437114",
    "hidden": false,
    "id": "relation1234000656",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "hazards",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2110153588")

  // remove field
  collection.fields.removeById("relation1234000656")

  return app.save(collection)
})
