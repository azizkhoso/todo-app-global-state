import React from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Tag,
  TagLabel,
  Text
} from '@chakra-ui/react';
import SubTask from "./SubTask";
import ITodo from "../interfaces/ITodo";
import AddSubTask from "./AddSubTask";
import useTodos from "../hooks/useTodos";
import UpdateTodo from "./UpdateTodo";

const colorMap = {
  'personal': 'green',
  'work': 'blue',
  'misc': 'purple'
}

export default function Todo(props: {todo: ITodo}) {
  const todo = props.todo;
  const {deleteTodo, finishTodo} = useTodos();
  return (
    <AccordionItem key={todo.name}>
      <Heading>
        <AccordionButton
          fontSize="x-large"
          fontWeight="bold"
          display="flex"
          justifyContent="space-between"
          textDecor={todo.isFinished ? "line-through" : 'none'}
        >
          {todo.name}
          <Tag colorScheme={colorMap[todo.category]} ml="auto">
            <TagLabel textTransform="uppercase">{todo.category}</TagLabel>
          </Tag>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel display="flex" flexDir="column" alignItems="center" rowGap="4">
        <Box display="flex" flexDir="row" w="full" alignItems="center" gap="2">
          <Text flexGrow={1}><b>Start Date:&nbsp;</b>{todo.startDate.toDateString()}</Text>
          <Text flexGrow={1}><b>End Date:&nbsp;</b>{todo.endDate.toDateString()}</Text>
        </Box>
        <Box display="flex" flexDir="column" w="full" gap="2" px="4">
          <Box display="flex" justifyContent="space-between" alignItems="center" textDecor={todo.isFinished ? "line-through" : ""}>
            <Text fontWeight="bold">Sub Tasks</Text>
            <AddSubTask todoId={todo.id} />
          </Box>
          {
            todo.subTasks.map((task) => (
              <SubTask todoId={todo.id} subTask={task} key={task.name} />
            ))
          }
        </Box>
        <Box display="flex" flexDir="row" flexWrap="wrap" w="full" alignItems="center" justifyContent="flex-end" gap="3">
          <UpdateTodo todo={todo} />
          <Button size="sm" variant="solid" colorScheme="red" onClick={() => deleteTodo(todo.id)}>Delete</Button>
          <Button w="fit-content" size="sm" colorScheme="blue" onClick={() => finishTodo(todo.id)}>Mark as Done</Button>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  )
}