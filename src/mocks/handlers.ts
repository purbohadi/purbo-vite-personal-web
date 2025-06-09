import { http } from 'msw';

// Basic handlers for now - we can add more specific handlers as needed
export const handlers = [
    // Example handler - replace with actual API endpoints as needed
    http.get('/api/health', () => {
        return new Response(JSON.stringify({ status: 'ok' }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }),
]; 