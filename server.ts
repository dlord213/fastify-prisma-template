import Fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import initializeFastifyConfig from "./fastify.config.js";

export const server = Fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

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
