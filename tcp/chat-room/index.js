
const decoder = new TextDecoder();
const encoder = new TextEncoder();

const listener = Deno.listen({
  hostname: "127.0.0.1",
  port: 8080,
  transport: "tcp",
});

console.log("Chat server running on 127.0.0.1:8080");

const clients = new Set();

for await (const conn of listener) {
  clients.add(conn);
  console.log("New client connected. Total:", clients.size);

  handleClient(conn);
}

async function handleClient(conn) {
  const buf = new Uint8Array(1024);

  try {
    while (true) {
      const n = await conn.read(buf);
      if (n === null) break;

      const msg = decoder.decode(buf.subarray(0, n)).trim();

      for (const client of clients) {
        if (client !== conn) {
          await client.write(
            encoder.encode(msg + "\n"),
          );
        }
      }
    }
  } catch (err) {
    console.error("Client error:", err);
  } finally {
    clients.delete(conn);
    conn.close();
    console.log("Client disconnected. Total:", clients.size);
  }
}