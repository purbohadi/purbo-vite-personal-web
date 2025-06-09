import {
    apiRequest,
    get,
    post,
    put,
    del,
    mockApiRequest,
} from '../../../src/utils/api';

// Mock fetch globally
global.fetch = jest.fn();

describe('api', () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    beforeEach(() => {
        mockFetch.mockClear();
    });

    describe('apiRequest', () => {
        it('should make a successful GET request', async () => {
            const mockData = { id: 1, name: 'Test' };
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => mockData,
            } as Response);

            const result = await apiRequest('/api/test');

            expect(mockFetch).toHaveBeenCalledWith('/api/test', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: undefined,
                credentials: 'same-origin',
            });

            expect(result).toEqual({
                data: mockData,
                error: null,
                status: 200,
            });
        });

        it('should make a successful POST request with body', async () => {
            const requestBody = { name: 'New Item' };
            const responseData = { id: 1, ...requestBody };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 201,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => responseData,
            } as Response);

            const result = await apiRequest('/api/items', {
                method: 'POST',
                body: requestBody,
            });

            expect(mockFetch).toHaveBeenCalledWith('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'same-origin',
            });

            expect(result).toEqual({
                data: responseData,
                error: null,
                status: 201,
            });
        });

        it('should handle custom headers', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => ({}),
            } as Response);

            await apiRequest('/api/test', {
                headers: {
                    'Authorization': 'Bearer token123',
                    'X-Custom-Header': 'custom-value',
                },
            });

            expect(mockFetch).toHaveBeenCalledWith('/api/test', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token123',
                    'X-Custom-Header': 'custom-value',
                },
                body: undefined,
                credentials: 'same-origin',
            });
        });

        it('should handle non-JSON responses', async () => {
            const textResponse = 'Plain text response';
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: new Headers({ 'content-type': 'text/plain' }),
                text: async () => textResponse,
            } as Response);

            const result = await apiRequest('/api/text');

            expect(result).toEqual({
                data: textResponse,
                error: null,
                status: 200,
            });
        });

        it('should handle 204 No Content responses', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 204,
                headers: new Headers(),
            } as Response);

            const result = await apiRequest('/api/delete');

            expect(result).toEqual({
                data: null,
                error: null,
                status: 204,
            });
        });

        it('should handle HTTP error responses with JSON error message', async () => {
            const errorData = { message: 'Resource not found' };
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Not Found',
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => errorData,
            } as Response);

            const result = await apiRequest('/api/nonexistent');

            expect(result).toEqual({
                data: null,
                error: 'Resource not found',
                status: 404,
            });
        });

        it('should handle HTTP error responses without JSON error message', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
                headers: new Headers({ 'content-type': 'text/plain' }),
                text: async () => 'Server Error',
            } as Response);

            const result = await apiRequest('/api/error');

            expect(result).toEqual({
                data: null,
                error: 'API error: 500 Internal Server Error',
                status: 500,
            });
        });

        it('should handle network errors', async () => {
            mockFetch.mockRejectedValueOnce(new Error('Network error'));

            const result = await apiRequest('/api/test');

            expect(result).toEqual({
                data: null,
                error: 'Network error',
                status: 0,
            });
        });

        it('should handle unknown errors', async () => {
            mockFetch.mockRejectedValueOnce('Unknown error');

            const result = await apiRequest('/api/test');

            expect(result).toEqual({
                data: null,
                error: 'Unknown API error',
                status: 0,
            });
        });

        it('should handle custom credentials', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => ({}),
            } as Response);

            await apiRequest('/api/test', {
                credentials: 'include',
            });

            expect(mockFetch).toHaveBeenCalledWith('/api/test', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: undefined,
                credentials: 'include',
            });
        });
    });

    describe('get', () => {
        it('should make a GET request', async () => {
            const mockData = { id: 1 };
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => mockData,
            } as Response);

            const result = await get('/api/items');

            expect(mockFetch).toHaveBeenCalledWith('/api/items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: undefined,
                credentials: 'same-origin',
            });

            expect(result.data).toEqual(mockData);
        });

        it('should pass custom headers to GET request', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => ({}),
            } as Response);

            await get('/api/items', { 'Authorization': 'Bearer token' });

            expect(mockFetch).toHaveBeenCalledWith('/api/items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token',
                },
                body: undefined,
                credentials: 'same-origin',
            });
        });
    });

    describe('post', () => {
        it('should make a POST request with body', async () => {
            const requestData = { name: 'Test Item' };
            const responseData = { id: 1, ...requestData };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 201,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => responseData,
            } as Response);

            const result = await post('/api/items', requestData);

            expect(mockFetch).toHaveBeenCalledWith('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
                credentials: 'same-origin',
            });

            expect(result.data).toEqual(responseData);
        });
    });

    describe('put', () => {
        it('should make a PUT request with body', async () => {
            const requestData = { id: 1, name: 'Updated Item' };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                headers: new Headers({ 'content-type': 'application/json' }),
                json: async () => requestData,
            } as Response);

            const result = await put('/api/items/1', requestData);

            expect(mockFetch).toHaveBeenCalledWith('/api/items/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
                credentials: 'same-origin',
            });

            expect(result.data).toEqual(requestData);
        });
    });

    describe('del', () => {
        it('should make a DELETE request', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 204,
                headers: new Headers(),
            } as Response);

            const result = await del('/api/items/1');

            expect(mockFetch).toHaveBeenCalledWith('/api/items/1', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: undefined,
                credentials: 'same-origin',
            });

            expect(result.status).toBe(204);
        });
    });

    describe('mockApiRequest', () => {
        beforeEach(() => {
            jest.clearAllTimers();
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.useRealTimers();
        });

        it('should return successful mock response', async () => {
            const mockData = { id: 1, name: 'Mock Data' };
            const promise = mockApiRequest(mockData);

            // Fast-forward time
            jest.advanceTimersByTime(500);

            const result = await promise;

            expect(result).toEqual({
                data: mockData,
                error: null,
                status: 200,
            });
        });

        it('should return error mock response when shouldFail is true', async () => {
            const mockData = { id: 1, name: 'Mock Data' };
            const promise = mockApiRequest(mockData, 500, true);

            // Fast-forward time
            jest.advanceTimersByTime(500);

            const result = await promise;

            expect(result).toEqual({
                data: null,
                error: 'Mock API error',
                status: 500,
            });
        });

        it('should respect custom delay', async () => {
            const mockData = { test: true };
            const promise = mockApiRequest(mockData, 1000);

            // Advance time by less than delay
            jest.advanceTimersByTime(500);

            // Promise should not be resolved yet
            const timeoutPromise = Promise.race([
                promise,
                new Promise(resolve => setTimeout(() => resolve('timeout'), 0))
            ]);

            jest.advanceTimersByTime(0);
            expect(await timeoutPromise).toBe('timeout');

            // Now advance past the delay
            jest.advanceTimersByTime(500);

            const result = await promise;
            expect(result.data).toEqual(mockData);
        });

        it('should use default delay of 500ms', async () => {
            const mockData = { test: true };
            const promise = mockApiRequest(mockData);

            // Advance time by less than default delay
            jest.advanceTimersByTime(400);

            const timeoutPromise = Promise.race([
                promise,
                new Promise(resolve => setTimeout(() => resolve('timeout'), 0))
            ]);

            jest.advanceTimersByTime(0);
            expect(await timeoutPromise).toBe('timeout');

            // Advance past default delay
            jest.advanceTimersByTime(100);

            const result = await promise;
            expect(result.data).toEqual(mockData);
        });
    });
}); 