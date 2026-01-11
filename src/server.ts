import { createServer } from "http";
import { handler } from "./handler.js";

const port = 3000;

const server = createServer(handler);
server.listen(port, () => console.log(`Server listening on port ${port}`));