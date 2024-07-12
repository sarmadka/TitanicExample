# TitanicExample

An example for comparing Alusus/WebPlatform against Javascript/React.

## Database Setup

1- Spin up the PostgreSQL docker container defined in docker-compose.yml:

```
docker compose up -d
```

2- Seed the database with the `titanic.sql` file:

```
psql -d "postgres://titanic:titanic@localhost/titanic" -f titanic.sql
```

## Credit

The SQL file of the Titanic passenger data was downloaded from
<a target="__blank" href="https://neon.tech/docs/import/import-sample-data">https://neon.tech/docs/import/import-sample-data)</a>

and the original source of the data is
<a target="__blank" href="https://www.kaggle.com/datasets/ibrahimelsayed182/titanic-dataset">
https://www.kaggle.com/datasets/ibrahimelsayed182/titanic-dataset
</a>

