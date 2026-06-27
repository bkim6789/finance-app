import http from 'node:http';

const PORT = 4001;
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'password123';

const todoStore = new Map();

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });
  response.end(JSON.stringify(payload));
};

const readRequestBody = async (request) => {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf-8');
  if (!rawBody) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return {};
  }
};

const isValidTodo = (todo) => {
  if (!todo || typeof todo !== 'object') {
    return false;
  }

  return (
    typeof todo.id === 'string' &&
    typeof todo.label === 'string' &&
    typeof todo.value === 'number'
  );
};

const handleLogin = async (request, response) => {
  const body = await readRequestBody(request);
  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    sendJson(response, 200, { username });
    return;
  }

  sendJson(response, 401, { message: 'Invalid username or password.' });
};

const handleGetTodos = (request, response, requestUrl) => {
  const username = requestUrl.searchParams.get('username') ?? '';
  if (!username) {
    sendJson(response, 400, { message: 'Missing username query parameter.' });
    return;
  }

  const todos = todoStore.get(username) ?? [];
  sendJson(response, 200, { todos });
};

const handleSaveTodos = async (request, response) => {
  const body = await readRequestBody(request);
  const username = typeof body.username === 'string' ? body.username : '';
  const todos = Array.isArray(body.todos) ? body.todos : [];

  if (!username) {
    sendJson(response, 400, { message: 'Missing username in request body.' });
    return;
  }

  if (!todos.every(isValidTodo)) {
    sendJson(response, 400, { message: 'Todos payload is invalid.' });
    return;
  }

  todoStore.set(username, todos);
  sendJson(response, 200, { saved: true });
};

const server = http.createServer(async (request, response) => {
  if (!request.url || !request.method) {
    sendJson(response, 404, { message: 'Not found.' });
    return;
  }

  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === 'POST' && requestUrl.pathname === '/api/v1/login') {
    await handleLogin(request, response);
    return;
  }

  if (request.method === 'GET' && requestUrl.pathname === '/api/v1/todos') {
    handleGetTodos(request, response, requestUrl);
    return;
  }

  if (request.method === 'POST' && requestUrl.pathname === '/api/v1/todos') {
    await handleSaveTodos(request, response);
    return;
  }

  sendJson(response, 404, { message: 'Not found.' });
});

server.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
