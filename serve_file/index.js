import { serveFile } from "jsr:@std/http";

const base64 = async () => {
  const image = await Deno.open("./a.png", { read: true });
  const newImage = await Deno.open("./new.png", { write: true, create: true });
  image.readable.pipeTo(newImage.writable);

  // while (true) {
  //   const { value, done } = await reader.read();
  //   if (done) break;
  //   await writer.write(value);
  // }

  // console.log(await reader.read());
  // console.log(await reader.read());

  // const reader = image.readable.getReader();

  // for await (const chunk of image.readable) {
  //   writer.write(chunk);
  // }

  // const bytes = await Deno.readFile("./a.png");

  // const base = btoa(String.fromCharCode(...bytes));
  // // console.log(base);

  // const decoded = atob(base);
  // const buffer = new Uint8Array(decoded.length);
  // for (let index = 0; index < decoded.length; index++) {
  //   buffer[index] = decoded.charCodeAt(index);
  // }

  // await Deno.writeFile("./copyImage.png", buffer);
};

const main = () => {
  Deno.serve(async (req) => {
    await base64();

    return serveFile(req, "./next.json");
  });
};

main();
