import { handlers } from './handlers';

// Use dynamic import for MSW server setup to avoid Jest module resolution issues
let server: any;

const createServer = async () => {
    if (!server) {
        const { setupServer } = await import('msw/node');
        server = setupServer(...handlers);
    }
    return server;
};

// Export a promise-based server
export const getServer = () => createServer(); 