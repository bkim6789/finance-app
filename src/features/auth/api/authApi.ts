export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
}

const API_BASE_PATH = '/api/v1';

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = await response.json();
    if (typeof data?.message === 'string' && data.message) {
      return data.message;
    }
  } catch {
    // Response body is not JSON.
  }

  return 'Request failed. Please try again.';
};

export const loginApi = async (
  request: LoginRequest,
  signal?: AbortSignal,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_PATH}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json() as Promise<LoginResponse>;
};
