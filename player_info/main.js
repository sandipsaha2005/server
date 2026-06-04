import { serve } from "./src/server.js";
import { handleRequest } from "./src/handleRequest.js";

const main = (port) => {
  serve(port, handleRequest);
};

main(Deno.args[0] || 8080);
