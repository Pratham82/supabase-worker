// src/types/product.ts
export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discount_percentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: any
  warranty_information: string
  shipping_information: string
  availability_status: string
  return_policy: string
  minimum_order_quantity: number
  meta: any
  images: string[]
  thumbnail: string
}
