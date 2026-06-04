const virat = Deno.readTextFileSync("./pages/virat.html");
const ab = Deno.readTextFileSync("./pages/ab.html");
const bumrah = Deno.readTextFileSync("./pages/bumrah.html");
const rohit = Deno.readTextFileSync("./pages/rohit.html");
const root = Deno.readTextFileSync("./pages/root.html");
const smith = Deno.readTextFileSync("./pages/smith.html");
const index = Deno.readTextFileSync("./pages/index.html");

const createResponse = (content, type, code) => {
  const headers = {
    "Content-Type": type,
    "Content-Length": content.length,
    "Date": new Date(),
  };

  return {
    body: content,
    headers,
    statusCode: code,
  };
};

export const handleRequest = (request) => {
  switch (request.path) {
    case "/":
      return createResponse(index, "text/html", 200);

    case "/virat":
      return createResponse(virat, "text/html", 200);

    case "/smith":
      return createResponse(smith, "text/html", 200);

    case "/root":
      return createResponse(root, "text/html", 200);

    case "/rohit":
      return createResponse(rohit, "text/html", 200);

    case "/ab":
      return createResponse(ab, "text/html", 200);

    case "/bumrah":
      return createResponse(bumrah, "text/html", 200);

    case "/list":
      return createResponse(
        JSON.stringify(["virat", "rohit"]),
        "application/json",
        404,
      );

    default:
      return createResponse("<h1> Not Found </h1>", request, "text/html");
  }
};
