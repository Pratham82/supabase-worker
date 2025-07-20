// docs.ts
export const openApiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Products API",
    version: "1.0.0",
  },
  paths: {
    "/products": {
      get: {
        summary: "Get paginated list of products",
        description: "Returns a paginated and searchable list of products",
        parameters: [
          {
            name: "search",
            in: "query",
            description: "Search query (matches title or brand)",
            required: false,
            schema: { type: "string" },
          },
          {
            name: "page",
            in: "query",
            description: "Page number (1-based)",
            required: false,
            schema: { type: "integer", default: 1 },
          },
          {
            name: "limit",
            in: "query",
            description: "Items per page",
            required: false,
            schema: { type: "integer", default: 10 },
          },
        ],
        responses: {
          "200": {
            description: "A list of products with pagination info",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    products: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Product" },
                    },
                    total: { type: "integer" },
                    page: { type: "integer" },
                    limit: { type: "integer" },
                    totalPages: { type: "integer" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/products/{id}": {
      get: {
        summary: "Get product by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID of the product",
          },
        ],
        responses: {
          "200": {
            description: "Single product details",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    product: { $ref: "#/components/schemas/Product" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Error fetching product",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          brand: { type: "string" },
          price: { type: "number" },
          // Add more fields based on your actual product schema
        },
      },
    },
  },
}
