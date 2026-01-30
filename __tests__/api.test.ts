/**
 * @jest-environment node
 */

import { POST, DELETE } from '@/app/api/posts/route';
import fs from 'fs';
import path from 'path';

jest.mock('fs');
jest.mock('path');

describe('API: /api/posts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('POST: returns 400 if fields are missing', async () => {
        const req = new Request('http://localhost/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: '' }),
        });

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Missing required fields');
    });

    it('DELETE: returns 400 if fields are missing', async () => {
        const req = new Request('http://localhost/api/posts', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: '' }),
        });

        const response = await DELETE(req);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe('Missing required fields');
    });
});
