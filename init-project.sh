#!/bin/bash

cd ./front && npm install
cd ../backend && npm install && node ./init-db.js || exit 1
bash add-data-to-db.sh
