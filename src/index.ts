// src/index.ts
import { Hono } from "hono"
import products from "./routes/products"
import { cors } from "hono/cors"

export interface Env {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

app.use("/api/*", cors())
app.route("/api/products", products)

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

export default app
