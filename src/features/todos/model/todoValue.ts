import type { TodoDto } from '../api/todosApi';

const ASCII_LOWER_A = 97;
const ASCII_LOWER_Z = 122;

const getFirstLetterBaseValue = (label: string): number => {
  if (!label) {
    return 0;
  }

  const firstCharCode = label.toLowerCase().charCodeAt(0);
  if (firstCharCode < ASCII_LOWER_A || firstCharCode > ASCII_LOWER_Z) {
    return 0;
  }

  return firstCharCode - ASCII_LOWER_A + 1;
};

const getRandomPrecision = (): number => {
  return Math.floor(Math.random() * 4) + 1;
};

export const createTodoValue = (label: string): number => {
  const baseValue = getFirstLetterBaseValue(label);
  const precision = getRandomPrecision();
  return Number((baseValue + Math.random()).toFixed(precision));
};

export const refreshTodoValue = (todo: TodoDto): number => {
  return createTodoValue(todo.label);
};

export const createDefaultTodos = (): TodoDto[] => {
  const labels = ['a', 'b', 'c'];
  return labels.map((label) => ({
    id: label,
    label,
    value: createTodoValue(label),
  }));
};
