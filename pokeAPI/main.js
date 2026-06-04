import { createRequestHandler } from "./src/routes.js";

const main = () => {
  const requstHandler = createRequestHandler(Deno.readTextFile);
  Deno.serve({ port: 3000 }, requstHandler);
};

main();
