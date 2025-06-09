import { handlers } from './handlers';
import type { SetupServer } from 'msw/node';

// Use dynamic import for MSW server setup to avoid Jest module resolution issues
let server: SetupServer | null = null;

const createServer = async () => {
    if (!server) {
        const { setupServer } = await import('msw/node');
        server = setupServer(...handlers);
    }
    return server;
};

// Export a promise-based server
export const getServer = () => createServer(); 