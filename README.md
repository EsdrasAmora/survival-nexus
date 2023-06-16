# Survival Nexus - The last API

## Getting Started

You must have [NodeJS](https://nodejs.org/en) >=18 and [PNPM](https://pnpm.io/installation) >= 8 installed.

1. Run `pnpm install` to install the packages.
1. Start the database with `docker compose up database -d`.
1. Migrate the database `pnpm migrate:dev`, add some data with `pnpm seed`.
1. Confirm that nothing else is running at http://localhost:3000.
1. Run `pnpm test` to run the tests.
1. Run `pnpm start` to start the server.
1. Visit http://localhost:3000/api and use the swagger UI to make requests against the web server.

## Docker

You must have [Docker](https://docs.docker.com/get-docker/), installed.  
Run `docker compose up -d --build` (root privileges may be necessary).

## Stack

I could have used [Prisma](https://www.prisma.io/), wich I'm already familiar with, but decided to used some other options that was interested in.
For migrations and to manage the database schema I used [atlas](https://atlasgo.io/),
It's kinda similar to the way that Prisma migrate works, but seems to be way less limiting, the schema definition can be found at `schema.hcl` file.
For querying I used [Pgtyped](https://pgtyped.dev/docs/) to generate type safe definitions from sql queries.

I wanted to use `zod` instead of `class-validator` but got no time to try it out ([nestjs-zod](https://www.npmjs.com/package/nestjs-zod)).
I haven't used NestJS mutch before doing this. The recommended way of doing validation has a LOT of foot guns, @Query don't get parsed properly and validating nested objects is weird. The openApi/swagger support, wich I though it would be a selling point, is not amazing either. I like the modules and DI stuff, but besides that dosen't seem to be that great.
I probably could have done better in some organizational aspects, probably would split the modules/services in a different way.

\*\*Obs: this project was developed and tested only on Linux (EndevaourOS).
