// src/index.ts
import { Hono } from "hono"
import products from "./routes/products"
import { cors } from "hono/cors"

import { swaggerUI } from "@hono/swagger-ui"
import { serve } from "@hono/node-server"
import { openApiSpec } from "./routes/docs"

export interface Env {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

app.use("/api/*", cors())

app.route("/api/products", products)

app.get("/docs/*", swaggerUI({ url: "/openapi.json" }))

app.get("/", c =>
  c.json({
    msg: "Hono + Supabase is running ✅",
    routes: {
      products: [
        {
          route: "/api/products",
          description: "This route is for fetching all products",
        },
        {
          route: "/api/products/:id",
          description: "This route is for fetching single product",
        },
      ],
    },
  })
)

app.get("/openapi.json", c => c.json(openApiSpec))

export default app
