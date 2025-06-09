/**
 * API utilities for making requests
 */

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  credentials?: RequestCredentials;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

/**
 * Make an API request with standard error handling
 */
export const apiRequest = async <T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  try {
    // Set default headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Prepare body if it exists
    const body = options.body ? JSON.stringify(options.body) : undefined;

    // Make the request
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body,
      credentials: options.credentials || 'same-origin',
    });

    // Parse response data
    let data: T | null = null;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else if (response.status !== 204) { // No content
      const text = await response.text();
      data = text as unknown as T;
    }

    // Check for error status
    if (!response.ok) {
      return {
        data: null,
        error: data && typeof data === 'object' && data !== null && 'message' in data
          ? String((data as { message: unknown }).message)
          : `API error: ${response.status} ${response.statusText}`,
        status: response.status,
      };
    }

    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown API error',
      status: 0,
    };
  }
};

/**
 * Simple GET request helper
 */
export const get = <T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> => {
  return apiRequest<T>(url, { method: 'GET', headers });
};

/**
 * Simple POST request helper
 */
export const post = <T>(url: string, body: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> => {
  return apiRequest<T>(url, { method: 'POST', body, headers });
};

/**
 * Simple PUT request helper
 */
export const put = <T>(url: string, body: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> => {
  return apiRequest<T>(url, { method: 'PUT', body, headers });
};

/**
 * Simple DELETE request helper
 */
export const del = <T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> => {
  return apiRequest<T>(url, { method: 'DELETE', headers });
};

/**
 * Mock API request (for development)
 */
export const mockApiRequest = <T>(data: T, delay: number = 500, shouldFail: boolean = false): Promise<ApiResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({
          data: null,
          error: 'Mock API error',
          status: 500,
        });
      } else {
        resolve({
          data,
          error: null,
          status: 200,
        });
      }
    }, delay);
  });
};