// src/routes/products.ts
import { Hono } from "hono"
import { getSupabase } from "../lib/supabase"
import { AppContext } from "../types/context"

const products = new Hono()

products.get("/", async (c: AppContext) => {
  const supabase = getSupabase(c)
  const search = c.req.query("search") ?? ""
  const limit = parseInt(c.req.query("limit") ?? "10")
  const page = parseInt(c.req.query("page") ?? "1")

  const offset = (page - 1) * limit // compute skip/offset from page

  let query = supabase.from("products").select("*", { count: "exact" })

  if (search) {
    query = query.or(`title.ilike.%${search}%,brand.ilike.%${search}%`)
  }

  query = query.range(offset, offset + limit - 1)

  const { data, count, error } = await query

  if (error) return c.json({ error: error.message }, 500)

  return c.json({
    products: data,
    total: count,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  })
})

products.get("/:id", async (c: AppContext) => {
  const supabase = getSupabase(c)
  const id = c.req.param("id")

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) return c.json({ error: error.message }, 500)

  return c.json({ product: data })
})

export default products
