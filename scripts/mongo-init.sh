#!/bin/bash

mongo <<EOF
use admin 
db.createUser(
  {
    user: "${MONGO_USERNAME}",
    pwd: "${MONGO_PASSWORD}",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)

use "${MONGO_INITDB_DATABASE}"
db.createCollection("users")
db.users.insert({"name": "user"})
EOF