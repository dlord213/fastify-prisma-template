import fastifyEnv from "@fastify/env";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";

import { server } from "./server";

export default async function initializeFastifyConfig() {
  /*
    - Configuration for dotenv files
    */
  await server.register(fastifyEnv, {
    data: process.env,
    dotenv: true,
    confKey: "config",
    schema: {
      type: "object",
      required: ["JWT_SECRET_KEY", "COOKIE_SECRET_KEY", "DATABASE_URL"],
      properties: {
        JWT_SECRET_KEY: { type: "string" },
        COOKIE_SECRET_KEY: { type: "string" },
        DATABASE_URL: { type: "string" },
      },
    },
  });

  /*
    - Configuration for cookies
    */
  await server.register(fastifyCookie, {
    secret: server.config.COOKIE_SECRET_KEY,
    hook: "preHandler",
  });

  /*
    - Configuration for JWT
    */
  await server.register(fastifyJwt, {
    secret: server.config.JWT_SECRET_KEY,
    cookie: {
      cookieName: "",
      signed: true,
    },
  });

  /*
   - Configuration for CORS
   */
  await server.register(cors, {
    origin: (origin, cb) => {
      const allowedOrigins = [
        "http://localhost:5173", // Vite Development Port
        "http://localhost:19006", // Expo Web Dev
        "http://127.0.0.1:19006", // Alternate localhost
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["content-type", "accept", "content-type", "authorization"],
  });

  /*
    - API testing route
    */
  server.get("/api/test", (req, res) => {
    try {
      res.code(200).send({
        message: "API working.",
      });
    } catch (err) {
      res.code(500).send({
        message: "API not working.",
      });
    }
  });
}
