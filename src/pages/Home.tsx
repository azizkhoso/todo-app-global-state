import React from "react";
import {
  Accordion,
  Box,
  Container,
  Heading,
  Text
} from '@chakra-ui/react';
import Todo from "../components/Todo";
import AddTodo from "../components/AddTodo";
import useTodos from "../hooks/useTodos";

export default function Home() {
  const {todos} = useTodos();
  return (
    <Box w="100vw" minH="100vh" display="flex" flexDir="column">
      <Container maxW="container.lg" display="flex" flexDir="column" border="2px solid gray" m="auto" rounded="xl" p="3">
        <Heading as="h1" textAlign="center">My Todos</Heading>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt="4">
          <Text fontWeight="bold">List</Text>
          <AddTodo />
        </Box>
        <Accordion mt="4" allowToggle>
          {
            todos.map((todo) => (
              <Todo key={todo.name} todo={todo} />
            ))
          }
        </Accordion>
      </Container>
    </Box>
  )
}