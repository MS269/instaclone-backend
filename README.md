# Instaclone

Instaclone Backend

## Packages

1. npm i apollo-server graphql
   > GraphQL server
2. npm i @babel/core @babel/preset-env @babel/node -D
   > JavaScript compiler
3. npm i nodemon -D
   > Restart server
4. npm i prisma -D
   > NodeJS ORM
5. npm i graphql-tools @graphql-tools/load-files @graphql-tools/merge
   > Merge GraphQL files
6. npm i dotenv
   > .env

## Scripts

- start: nodemon (--exec babel-node server)
  > Nodemon and babel: start server with watch mode and modern style JavaScript
- migrate: npx prisma migrate dev
  > Prisma: create schema on DB and Prisma Client
- studio: npx prisma studio
  > Prisma: visualize DB
