# dibs

an app for offering things up and letting people call dibs on it

## Tech Used

* MongoDB 3.6's Change Streams
* Apollo GraphQL
* React
* emotion

## Development instructions

### Setup

#### You'll need to have already installed

1. MongoDB 3.6+
2. Node 8+

#### Instantiate the database

```
mkdir db
mongod --port 27017 --dbpath $(pwd)/db --replSet rs0
# instantiate the replica set. only need to run this one time.
mongo --eval "rs.initiate()"
```

#### Install deps

```
npm install
```

### Dev workflow

#### Start Mongo

```
mongod --port 27017 --dbpath $(pwd)/db --replSet rs0
```

Keep the process open.

#### Start server and client

```
npm start
```
