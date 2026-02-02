const encoder = new TextEncoder();
const decoder = new TextDecoder();

const virat = Deno.readTextFileSync("virat.html");
const ab = Deno.readTextFileSync("ab.html");
const bumrah = Deno.readTextFileSync("bumrah.html");
const rohit = Deno.readTextFileSync("rohit.html");
const root = Deno.readTextFileSync("root.html");
const smith = Deno.readTextFileSync("smith.html");
const index = Deno.readTextFileSync("index.html");

const createResponseLine = (method) => `${method} 200 OK`;

const createHeaders = (headers) => {
  return Object.entries(headers)
    .map(([name, value]) => `${name}: ${value}`)
    .join("\r\n");
};

const createResponse = (content, connection, protocol) => {
  const headers = {
    "Content-Type": "text/html",
    "Content-Length": content.length,
    "Date": new Date(),
    "Batch": "step-batch-11",
  };
  const response = [
    createResponseLine(protocol),
    createHeaders(headers),
    "",
    content,
  ].join("\r\n");

  connection.write(encoder.encode(response));
};

const sendResponse = (method, path, protocol, connection) => {
  switch (path) {
    case "/smith":
      return createResponse(smith, connection, protocol);
    case "/virat":
      return createResponse(virat, connection, protocol);
    case "/ab":
      return createResponse(ab, connection, protocol);
    case "/root":
      return createResponse(root, connection, protocol);
    case "/rohit":
      return createResponse(rohit, connection, protocol);
    case "/bumrah":
      return createResponse(bumrah, connection, protocol);

    default:
      return createResponse(index, connection, protocol);
  }
};

const handleConnection = async (connection) => {
  const buffer = new Uint8Array(1026);

  while (true) {
    const n = await connection.read(buffer);
    if (!n) break;
    const message = decoder.decode(buffer.subarray(0, n));
    const [method, path, protocol] = message.split("\r\n")[0].split(" ");
    sendResponse(method, path, protocol, connection);
  }

  connection.close();
};

const server = async () => {
  const listener = Deno.listen({ port: 8080 });

  for await (const connection of listener) {
    handleConnection(connection);
  }
};

server();
