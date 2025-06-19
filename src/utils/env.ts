// Utility to get environment variables in both Vite and Jest/Node
export const getEnvVar = (key: string): string => {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
        return process.env[key] || '';
    }
    // Only access import.meta.env via window['import'] to avoid Jest parsing errors
    if (
        typeof window !== 'undefined' &&
        typeof (window as any)['import'] !== 'undefined' &&
        ((window as any)['import'] as any).meta &&
        ((window as any)['import'] as any).meta.env &&
        ((window as any)['import'] as any).meta.env[key]
    ) {
        return ((window as any)['import'] as any).meta.env[key] || '';
    }
    return '';
}; 