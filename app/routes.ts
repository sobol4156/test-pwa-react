import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/test-pwa-react/", "./routes/home.tsx"),
  // pattern ^           ^ module file
] satisfies RouteConfig;
