import { List, Spinner } from '@chakra-ui/react';
import { TodoState } from '../types/todo';
import { TodoItem } from './TodoItem';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../services/todos';
import { useTodosQuery } from '../hooks/useTodosQuery';

type TodoListProps = {
  state: TodoState;
};

const TodoList = ({ state }: TodoListProps) => {
  const {data, isLoading, isSuccess } = useTodosQuery(state)

  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );

  return (
    <List>
      {isSuccess && data.map((todo) => <TodoItem key={todo.id} {...todo} />)}
    </List>
  );
};

export { TodoList };
