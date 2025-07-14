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

app.get("/", c => c.text("Hono + Supabase is running ✅"))

export default app
