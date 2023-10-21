# Products bought by other people that bought the same products as a given user

This repo shows a rather long trip solution in POSTGRESQL to find products bought by other people that bought the same products as a given user.

## Requirements

1. Node.js
2. PostgreSQL
3. Yarn

I may consider to add a Dockerfile to make it easier to run the project.

## How to run

1. Clone the repo
2. Create a database in PostgreSQL
3. Create a `.env` file based on `.env.example` and fill it with your database credentials
4. Run `yarn` to install dependencies
5. Run `yarn generate` to generate the Prisma client
6. Run `yarn start` to run the project
