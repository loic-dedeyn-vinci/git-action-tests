import request from "supertest";
import app from "../src/app";
import { defaultUsers as users } from "../src/datas/users-data";

describe("User Controller", () => {
    beforeEach(() => {
        // Reset users array before each test
        users.length = 0;
        users.push(
            {
                id: 1,
                name: "Alice",
                email: "alice@mail.com",
                borrowHistory: [],
            },
            {
                id: 2,
                name: "Bob",
                email: "bob@mail.com",
                borrowHistory: [],
            }
        );
    });

    it("GET /users should return default users", async () => {
        const res = await request(app).get("/users");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("GET /users/:id should return a user by ID", async () => {
        const res = await request(app).get("/users/1");
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Alice");
    });

    it("GET /users/:id with invalid ID should return 400", async () => {
        const res = await request(app).get("/users/abc");
        expect(res.status).toBe(400);
    });

    it("GET /users/:id with non-existing ID should return 404", async () => {
        const res = await request(app).get("/users/999");
        expect(res.status).toBe(404);
    });

    it("POST /users should create a new user", async () => {
        const newUser = {
            name: "Charlie",
            email: "charlie@mail.com",
            borrowHistory: [],
        };

        const res = await request(app).post("/users").send(newUser);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe("Charlie");
        expect(users.length).toBe(3);
    });

    it("POST /users with existing user should return 400", async () => {
        const existingUser = {
            name: "Alice",
            email: "alice@mail.com",
            borrowHistory: [],
        };

        const res = await request(app).post("/users").send(existingUser);
        expect(res.status).toBe(400);
        expect(res.text).toBe("This User already Exist");
    });

    it("POST /users with invalid data should return 400", async () => {
        const res = await request(app).post("/users").send({ name: "NoEmail" });
        expect(res.status).toBe(400);
    });

    it("PUT /users should update an existing user", async () => {
        const updatedUser = {
            id: 1,
            name: "Alice Updated",
            email: "alice_updated@mail.com",
            borrowHistory: [],
        };

        const res = await request(app).put("/users").send(updatedUser);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Alice Updated");
    });

    it("PUT /users with invalid data should return 400", async () => {
        const res = await request(app).put("/users").send({ id: 1 });
        expect(res.status).toBe(400);
    });

    it("PUT /users with non-existing user should return 404", async () => {
        const res = await request(app).put("/users").send({
            id: 999,
            name: "Ghost",
            email: "ghost@mail.com",
            borrowHistory: [],
        });
        expect(res.status).toBe(404);
    });

    it("DELETE /users/:id should delete a user", async () => {
        const res = await request(app).delete("/users/1");
        expect(res.status).toBe(204);
        expect(users.find((u) => u.id === 1)).toBeUndefined();
    });

    it("DELETE /users/:id with invalid ID should return 400", async () => {
        const res = await request(app).delete("/users/abc");
        expect(res.status).toBe(400);
    });

    it("DELETE /users/:id with non-existing ID should return 404", async () => {
        const res = await request(app).delete("/users/999");
        expect(res.status).toBe(404);
    });
});
