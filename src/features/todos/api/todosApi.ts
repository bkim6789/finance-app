export interface TodoDto {
  id: string;
  label: string;
  value: number;
}

interface TodosResponse {
  todos: TodoDto[];
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

export const fetchTodosApi = async (
  username: string,
  signal?: AbortSignal,
): Promise<TodoDto[]> => {
  const searchParams = new URLSearchParams({ username });
  const response = await fetch(`${API_BASE_PATH}/todos?${searchParams.toString()}`, {
    method: 'GET',
    signal,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const data = (await response.json()) as TodosResponse;
  return Array.isArray(data.todos) ? data.todos : [];
};

export const saveTodosApi = async (
  username: string,
  todos: TodoDto[],
  signal?: AbortSignal,
): Promise<void> => {
  const response = await fetch(`${API_BASE_PATH}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, todos }),
    signal,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
};
