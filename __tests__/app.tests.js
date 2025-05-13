import request from 'supertest';
import app from '../app.js';

describe('Express API Tests', () => {
    // Test for GET /users
    it('should return all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ id: 1, name: 'Alice' }]);
    });

    // Test for POST /users
    it('should create a new user', async () => {
        const newUser = { name: 'Bob' };
        const res = await request(app).post('/api/users').send(newUser);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Bob');
    });

    // Test for GET /users/:id
    it('should return a single user', async () => {
        const res = await request(app).get('/api/users/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: 1, name: 'Alice' });
    });

    // Test for GET /users/:id (not found)
    it('should return 404 for a non-existent user', async () => {
        const res = await request(app).get('/api/users/999');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'User not found');
    });
});
