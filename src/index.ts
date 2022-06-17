import { IncomingMessage, ServerResponse, createServer } from "http";
import { User } from "./data";
import { Controller } from "./controller";
import { getEndpoint } from "./utils/getEndpoint";

const PORT = 5000;

const API_URL = "/api/users";

const server = createServer(
  async (request: IncomingMessage, response: ServerResponse) => {
    const controller = new Controller();

    if (request.url) {
      if (
        request.url.includes(API_URL) &&
        !getEndpoint(request.url, API_URL) &&
        request.method === "GET"
      ) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(await controller.getAllUsers()));
        response.end();
      } else if (!request.url.includes(API_URL)) {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Route not found" }));
      } else if (
        request.url.includes(API_URL) &&
        getEndpoint(request.url, API_URL) &&
        request.method === "GET"
      ) {
        try {
          const endpoint = getEndpoint(request.url, API_URL);
          if (endpoint) {
            const user = await controller.getUser(endpoint);
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(user));
            response.end();
          }
        } catch (err) {
          console.log(err);
          if (err instanceof Error && err.message === "400") {
            response.writeHead(400, "Invalid id endpoint", {
              "Content-Type": "text/html",
            });
            response.write("Invalid id endpoint");
            response.end();
          } else if (err instanceof Error && err.message === "404") {
            response.writeHead(404, "User not found", {
              "Content-Type": "text/html",
            });
            response.write("User not found");
            response.end();
          }
        }
      }
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server listens to port ${PORT}`);
});
