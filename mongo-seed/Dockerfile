from mongo

COPY authentications.json /authentications.json
COPY libraries.json /libraries.json
COPY rooms.json /rooms.json
COPY seats.json /seats.json


CMD ["sh", "-c", "\
mongoimport --host mongo --collection authentications --type=json --file /authentications.json --jsonArray; \
mongoimport --host mongo --collection libraries --type=json --file /libraries.json --jsonArray; \
mongoimport --host mongo --collection rooms --type=json --file /rooms.json --jsonArray; \
mongoimport --host mongo --collection seats --type=json --file /seats.json --jsonArray; \
"]
