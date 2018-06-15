# dibs

This branch is for use with the Dibs Tutorial presentation. For the actual app please checkout the `master` branch.

## Notes

### How to start MongoDB

#### Create the folder where the database will save its data.

```
mkdir db
```

#### Start the mongo daemon, and leave it open in a terminal.

```
mongod --port 27017 --dbpath $(pwd)/db --replSet rs0
```

#### Instantiate the replica set. Only need to run this one time.

```
mongo --eval "rs.initiate()"
```
