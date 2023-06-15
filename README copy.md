# Todo App - Nodejs Web Server

## Getting Started

You must have NodeJS >=18 and PNPM >= 8 installed.
Make sure to have PNPM and Docker desktop installed, then confirm that nothing else is running at http://localhost:3000.  
Run `docker compose up -d --build` (root privileges may be necessary), migrate the database `pnpm migrate:dev`, then visit http://localhost:3000.  
Use the swagger UI to make requests against the web server.

<!-- migrate: -->
<!-- atlas schema apply   -u "postgresql://survival_nexus_user:survival_nexus_password@localhost:5432/survival_nexus_db?sslmode=disable"   --to file://schema.hcl  -->

\*\*Obs: it was developed and tested only on Linux (EndevaourOS).

## Developing and Testing

Create a .env file with the contents of the test.env file  
Run `pnpm install` to install the packages, start the database with `docker compose up database -d`, and migrate the database `pnpm migrate:dev`.  
Then run `pnpm test` to run the tests.  
Or run `pnpm dev` to run the code with file watch.

## Architerure

The main idea here is to colocate use cases with schema definitions, keeping the presentation layer skinny as possible.  
The use cases being so simple and using an ORM, Prisma, make an extra data layer unnecessary.
