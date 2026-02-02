const decoder = new TextDecoder();
const listener = Deno.listen({
  hostname: "127.0.0.1",
  port: 8080,
  transport: "tcp",
});

const handelConnection = async (conn) => {
  console.log(conn.remoteAddr.hostname, "connected");

  const buffer = new Uint8Array(1024);

  while (true) {
    const n = await conn.read(buffer);
    if (n === null) {
      console.log("Client disconnected");
      break;
    }

    const message = decoder.decode(buffer.subarray(0, n));
    if (message === "exit") {
      console.log("Closing connection");
      conn.close();
      break;
    }

    console.log("Server - received:", message);
    for (const client of clients.values()) {
      client.write(buffer);
    }
  }
};

const clients = new Set();
for await (const conn of listener) {
  clients.add(conn);
  console.log("No client is ", clients.size);

  handelConnection(conn);
}
