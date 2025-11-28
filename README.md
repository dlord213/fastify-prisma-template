# Prisma + Fastify Quick Template

This template is made for me because I'm too lazy to setup. This is a basic starting point for building a Node.js API with Fastify and Prisma. It includes pre-configured plugins for environment variables, cookies, JWT authentication, and CORS, giving you a solid foundation for your project.

## ENV Variables

This template uses environment variables to manage sensitive configuration data, such as database credentials and secret keys. The required environment variables are defined in the `@fastify/env` schema and must be provided in a `.env` file at the root of your project.

### Required Variables:

- `JWT_SECRET_KEY`: A strong, random key for signing and verifying JWTs.

- `COOKIE_SECRET_KEY`: A strong, random key for signing cookies.

- `DATABASE_URL`: The connection string for your database.

### Example `.env` file:

```
JWT_SECRET_KEY="your_jwt_secret_key"
COOKIE_SECRET_KEY="your_cookie_secret_key"
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
```

If you add a new environment variable to the schema in fastify.config.ts, you must also add it to the types.ts file to maintain proper type safety.
For example, if you add an `API_KEY` to your `@fastify/env` schema, you would update types.ts like this:

```
declare module "fastify" {
  interface FastifyInstance {
    config: {
      JWT_SECRET_KEY: string;
      COOKIE_SECRET_KEY: string;
      DATABASE_URL: string;
      API_KEY: string; // <-- Add the new variable here
    };
  }
}
```

Also update your `fastify.config.ts` on the schema property.

## Configurations `(fastify.config.ts)`

The `fastify.config.ts` file is the central hub for configuring your Fastify plugins. All major configurations are handled here.

- **@fastify/env:** You can update the **`required`** properties in the schema to add or remove environment variables that your application needs.

- **@fastify/cookie:** The `secret` is automatically read from `server.config.COOKIE_SECRET_KEY`.

- **@fastify/jwt:** The `secret` is automatically read from `server.config.JWT_SECRET_KEY`.

- **@fastify/cors:** To change the allowed origins, simply modify the `allowedOrigins` array. This is where you would add your front-end application's URL.

```
// Inside fastify.config.ts
const allowedOrigins = [
"http://localhost:5173", // Vite Development Port
"http://localhost:19006", // Expo Web Dev
"http://127.0.0.1:19006", // Alternate localhost
// Add new origins here: "https://your-domain.com"
];
```

### Development Scripts

`npm run dev` - Runs the server in watch mode using `tsx watch`, automatically restarting on file changes.

`npm run start` - Runs the compiled server from the `dist` folder. Use this for production.

`npm run build` - Compiles the TypeScript source code into JavaScript in the `dist` folder.

### Prisma Scripts

`npm run db:generate`- Creates a new migration file based on changes in `schema.prisma` and applies it.

`npm run db:migrate` - Generates the Prisma Client, allowing you to interact with your database.

### Hash

The `hash.ts` file provides helper functions for secure password management using `bcrypt`.

### Module folder structure `(@/modules/)`

I'm using a feature-based folder structure, where each feature of the application (e.g., auth, users, products) lives in its own module. Each module contains three key files: route, controller, and service. This separation of concerns makes the application easier to manage and scale.

**The Role of Each File**

- `{feature}.route.ts` - This file defines the API endpoints for the module.

- `{feature}.controller.ts` - This file acts as the bridge between the route and the service. It handles incoming requests, validates input, calls the necessary service functions, and sends the final response back to the client.

- `{feature}.service.ts` - This file contains all the business logic and directly interacts with the database using the Prisma Client.
