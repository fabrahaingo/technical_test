echo "Downloading data for database...\n"

mkdir files
curl https://backend-technical-test-data.s3.eu-central-1.amazonaws.com/decisions_1.csv.gz --output ./files/decisions_1.csv.gz ; gunzip ./files/decisions_1.csv.gz
curl https://backend-technical-test-data.s3.eu-central-1.amazonaws.com/decisions_2.csv.gz --output ./files/decisions_2.csv.gz ; gunzip ./files/decisions_2.csv.gz
curl https://backend-technical-test-data.s3.eu-central-1.amazonaws.com/decisions_3.csv.gz --output ./files/decisions_3.csv.gz ; gunzip ./files/decisions_3.csv.gz
curl https://backend-technical-test-data.s3.eu-central-1.amazonaws.com/decisions_4.csv.gz --output ./files/decisions_4.csv.gz ; gunzip ./files/decisions_4.csv.gz
curl https://backend-technical-test-data.s3.eu-central-1.amazonaws.com/decisions_5.csv.gz --output ./files/decisions_5.csv.gz ; gunzip ./files/decisions_5.csv.gz
curl https://backend-technical-test-data.s3.eu-central-1.amazonaws.com/decisions_6.csv.gz --output ./files/decisions_6.csv.gz ; gunzip ./files/decisions_6.csv.gz
curl https://backend-technical-test-data.s3.eu-central-1.amazonaws.com/decisions_7.csv.gz --output ./files/decisions_7.csv.gz ; gunzip ./files/decisions_7.csv.gz
curl https://backend-technical-test-data.s3.eu-central-1.amazonaws.com/decisions_8.csv.gz --output ./files/decisions_8.csv.gz ; gunzip ./files/decisions_8.csv.gz
curl https://backend-technical-test-data.s3.eu-central-1.amazonaws.com/decisions_9.csv.gz --output ./files/decisions_9.csv.gz ; gunzip ./files/decisions_9.csv.gz

echo "Importing data to database...\n"

sqlite3 -header sqlite_db <<EOF || exit 1
.mode tabs
.import ./files/decisions_1.csv decisions
.import ./files/decisions_2.csv decisions
.import ./files/decisions_3.csv decisions
.import ./files/decisions_4.csv decisions
.import ./files/decisions_5.csv decisions
.import ./files/decisions_6.csv decisions
.import ./files/decisions_7.csv decisions
.import ./files/decisions_8.csv decisions
.import ./files/decisions_9.csv decisions
EOF

echo "Importing data to database ended !\n"
