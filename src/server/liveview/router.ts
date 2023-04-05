import { LiveViewRouter } from "liveviewjs";
import { helloLive } from "./hello.ts";

// configure LiveView routes for Test-liveviewjs
export const liveRouter: LiveViewRouter = {
  "/hello": helloLive,
  "/hello/:name": helloLive,
};
