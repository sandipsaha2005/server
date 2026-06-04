const encoder = new TextEncoder();
const decoder = new TextDecoder();

const readRequest = async (connection) => {
  const buffer = new Uint8Array(1024);

  const bytes = await connection.read(buffer);
  return decoder.decode(buffer.subarray(0, bytes));
};

const sendResponse = async (response, connection) =>
  await connection.write(encoder.encode(response));

const createResponseLine = (method, statusCode) => `${method} ${statusCode} OK`;

const createHeaders = (headers) =>
  Object.entries(headers)
    .map(([name, value]) => `${name}: ${value}`)
    .join("\r\n");

const formatResponse = (request, headers, body, statusCode) => {
  return [
    createResponseLine(request.protocol, statusCode),
    createHeaders(headers),
    "",
    body,
  ].join("\r\n");
};

const parseRequest = async (connection) => {
  const request = await readRequest(connection);

  const [method, path, protocol] = request.split("\r\n")[0].split(" ");
  return {
    method,
    path,
    protocol,
  };
};

const handleConnection = async (connection, handleRequest) => {
  const request = await parseRequest(connection);
  const { body, headers, statusCode } = handleRequest(request);
  const response = formatResponse(request, headers, body, statusCode);
  await sendResponse(response, connection);
};

export const serve = async (port, handleRequest) => {
  const listener = Deno.listen({ port });

  for await (const connection of listener) {
    handleConnection(connection, handleRequest);
  }
};
