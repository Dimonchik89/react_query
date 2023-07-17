import { Button, Input, Stack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createTodo } from '../services/todos';
import { Todo } from '../types/todo';

const NewTodo = () => {
  const [title, setTitle] = useState('');

  const client = useQueryClient() // получаем клиет созданый в главном файле, какой мы прокидывали в провайдер

  const {mutate: create} = useMutation({
    mutationFn: createTodo,
    // onSuccess: () => {
    //   client.invalidateQueries({queryKey: ['todos', "all"]})
    // }
    onSuccess: (newTodo) => { // чтобы не получать весь массив данных а просто новые загрузить в кэг, newTodo это данные какие вернет функция mutationFn: createTodo
      // client.setQueryData<Todo[]>(["todos", "all"], (oldTodos) => { // oldTodos это то что храниться в кеше ["todos", "all"]
      //   return [...(oldTodos || []), newTodo]
      // })

      //2-ой вариант загрузки сразу в кеш
      client.invalidateQueries({
        queryKey: ["todos", "all"],
        refetchType: "none"
      })
    }
  })

  const submit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (title) {
      create(title)
      setTitle('');
    }
  };

  return (
    <form onSubmit={submit}>
      <Stack direction="row">
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="new todo..."
        />
        <Button type="submit">Add todo</Button>
      </Stack>
    </form>
  );
};

export { NewTodo };
