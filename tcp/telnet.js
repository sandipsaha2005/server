const encoder = new TextEncoder();
const conn = await Deno.connect({
  hostname: "127.0.0.1",
  port: 8080,
  transport: "tcp",
});

const name = prompt("Enter you name");
await conn.write(encoder.encode(name, "\n"));

// await conn.write(encoder.encode("ping\n"));
// await conn.write(encoder.encode("ping\n"));
// await conn.write(encoder.encode("ping\n"));
