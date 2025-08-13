import Fastify from "fastify";
import initializeFastifyConfig from "./fastify.config";

export const server = Fastify();

async function main() {
  try {
    await initializeFastifyConfig();
    await server.listen({ port: 10000, host: "0.0.0.0" });

    console.log(server.getEnvs());
    console.log("Server running at http://localhost:10000");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
