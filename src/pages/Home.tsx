import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Heading,
  Tag,
  TagLabel,
  Text
} from '@chakra-ui/react';
import ITodo from "../interfaces/ITodo";

const todos: ITodo[] = [
  {
    name: "Plan weekend getaway",
    startDate: new Date("2023-12-18"),
    endDate: new Date("2023-12-20"),
    category: "personal",
    tags: ["adventure", "relaxing", "nature"],
    isFinished: false,
    subTasks: [
      {
        name: "Book flights",
        startDate: new Date("2023-12-18"),
        endDate: new Date("2023-12-18"),
        isFinished: false,
      },
      {
        name: "Find accommodation",
        startDate: new Date("2023-12-18"),
        endDate: new Date("2023-12-19"),
        isFinished: true,
      },
      {
        name: "Plan activities",
        startDate: new Date("2023-12-19"),
        endDate: new Date("2023-12-19"),
        isFinished: false,
      },
    ],
  },
  {
    name: "Review annual report",
    startDate: new Date("2023-12-19"),
    endDate: new Date("2023-12-21"),
    category: "work",
    tags: ["important", "urgent", "financial"],
    isFinished: false,
    subTasks: [
      {
        name: "Gather sales data",
        startDate: new Date("2023-12-19"),
        endDate: new Date("2023-12-19"),
        isFinished: true,
      },
      {
        name: "Analyze financials",
        startDate: new Date("2023-12-20"),
        endDate: new Date("2023-12-20"),
        isFinished: false,
      },
      {
        name: "Write report",
        startDate: new Date("2023-12-21"),
        endDate: new Date("2023-12-21"),
        isFinished: false,
      },
    ],
  },
  {
    name: "Clean apartment",
    startDate: new Date("2023-12-21"),
    endDate: new Date("2023-12-22"),
    category: "misc",
    tags: ["tidying", "household", "chores"],
    isFinished: false,
    subTasks: [
      {
        name: "Dust furniture",
        startDate: new Date("2023-12-21"),
        endDate: new Date("2023-12-21"),
        isFinished: false,
      },
      {
        name: "Vacuum and mop floors",
        startDate: new Date("2023-12-21"),
        endDate: new Date("2023-12-21"),
        isFinished: false,
      },
      {
        name: "Wash dishes and laundry",
        startDate: new Date("2023-12-22"),
        endDate: new Date("2023-12-22"),
        isFinished: false,
      },
    ],
  },
];

const colorMap = {
  'personal': 'green',
  'work': 'blue',
  'misc': 'purple'
}

export default function Home() {
  return (
    <Box w="100vw" minH="100vh" display="flex" flexDir="column">
      <Container maxW="container.lg" display="flex" flexDir="column" border="2px solid gray" m="auto" rounded="xl" p="3">
        <Heading as="h1" textAlign="center">My Todos</Heading>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt="4">
          <Text fontWeight="bold">List</Text>
          <Button size="sm" variant="solid" colorScheme="teal">Add Todo</Button>
        </Box>
        <Accordion mt="4" allowToggle>
          {
            todos.map((todo) => (
              <AccordionItem key={todo.name}>
                <Heading>
                  <AccordionButton fontSize="x-large" fontWeight="bold" display="flex" justifyContent="space-between">
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
                  <Box display="flex" flexDir="row" flexWrap="wrap" w="full" alignItems="center" gap="3">
                    <Text fontWeight="bold">Tags:</Text>
                    {
                      todo.tags.map((tag) => (
                        <Tag key={tag}>
                          <TagLabel>{tag}</TagLabel>
                        </Tag>
                      ))
                    }
                  </Box>
                  <Box display="flex" flexDir="column" w="full" gap="2" px="4">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Text fontWeight="bold">Sub Tasks</Text>
                      <Button size="sm" variant="solid" colorScheme="teal">Add Subtask</Button>
                    </Box>
                    {
                      todo.subTasks.map((task) => (
                        <Box key={task.name} display="flex" flexDir="row" w="full" alignItems="center" gap="2">
                          <Text w="30%" fontWeight="bold">{task.name}</Text>
                          <Text flexGrow={1}><b>Start Date:&nbsp;</b>{task.startDate.toDateString()}</Text>
                          <Text flexGrow={1}><b>End Date:&nbsp;</b>{task.endDate.toDateString()}</Text>
                          <Button variant="outline" w="fit-content" size="sm" colorScheme="orange">Edit</Button>
                          <Button variant="solid" w="fit-content" size="sm" colorScheme="red">Delete</Button>
                          <Button variant="solid" w="fit-content" size="sm" colorScheme="blue">Finish</Button>
                        </Box>
                      ))
                    }
                  </Box>
                  <Box display="flex" flexDir="row" flexWrap="wrap" w="full" alignItems="center" justifyContent="flex-end" gap="3">
                    <Button size="sm" variant="outline" colorScheme="orange">Edit</Button>
                    <Button size="sm" variant="solid" colorScheme="red">Delete</Button>
                    <Button w="fit-content" size="sm" colorScheme="blue">Mark as Done</Button>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            ))
          }
        </Accordion>
      </Container>
    </Box>
  )
}