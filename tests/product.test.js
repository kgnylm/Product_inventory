const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Product = require("../models/productModel");
let server;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  server = app.listen(0); // Using port 0 for random available port
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

beforeEach(async () => {
  await Product.deleteMany({});
});

describe("Product API Tests", () => {
  const sampleProduct = {
    name: "Test Product",
    price: 100,
    quantity: 10,
    description: "Test product description",
  };

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      const res = await request(app).post("/api/products").send(sampleProduct);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(sampleProduct.name);
    });

    it("should fail if required fields are missing", async () => {
      const res = await request(app).post("/api/products").send({
        name: "Test Product",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /api/products", () => {
    it("should get all products", async () => {
      await Product.create(sampleProduct);

      const res = await request(app).get("/api/products");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe("GET /api/products/:id", () => {
    it("should get a single product", async () => {
      const product = await Product.create(sampleProduct);

      const res = await request(app).get(`/api/products/${product._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(sampleProduct.name);
    });

    it("should return 404 if product not found", async () => {
      const res = await request(app).get(
        `/api/products/${new mongoose.Types.ObjectId()}`
      );

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PUT /api/products/:id", () => {
    it("should update a product", async () => {
      const product = await Product.create(sampleProduct);
      const updateData = {
        name: "Updated Product",
        price: 150,
      };

      const res = await request(app)
        .put(`/api/products/${product._id}`)
        .send(updateData);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(updateData.name);
      expect(res.body.data.price).toBe(updateData.price);
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("should delete a product", async () => {
      const product = await Product.create(sampleProduct);

      const res = await request(app).delete(`/api/products/${product._id}`);

      expect(res.statusCode).toBe(204);

      const deletedProduct = await Product.findById(product._id);
      expect(deletedProduct).toBeNull();
    });
  });
});
