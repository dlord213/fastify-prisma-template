declare module "fastify" {
  interface FastifyInstance {
    config: {
      config: {
        JWT_SECRET_KEY: string;
        COOKIE_SECRET_KEY: string;
        DATABASE_URL: string;
      };
    };
  }
}
