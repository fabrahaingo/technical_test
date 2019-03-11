#!/bin/bash

cd ./backend

sqlite3 sqlite_db "DROP TABLE IF EXISTS jurisdictions;" || exit 1
sqlite3 sqlite_db "DROP TABLE IF EXISTS jurisdictions_verified_contact_infos;" || exit 1
sqlite3 sqlite_db "DROP TABLE IF EXISTS decisions;" || exit 1
