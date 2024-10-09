import React from "react";
import {
  Box,
  Button,
  Text
} from '@chakra-ui/react';
import { ISubTask } from "../interfaces/ITodo";
import UpdateSubTask from "./UpdateSubTask";
import useTodos from "../hooks/useTodos";

export default function SubTask(props: {todoId: string; subTask: ISubTask}) {
  const subTask = props.subTask;
  const {finishSubTask, deleteSubTask} = useTodos()
  return (
    <Box key={subTask.name} display="flex" flexDir="row" w="full" alignItems="center" gap="2" textDecor={subTask.isFinished ? "line-through" : ""}>
      <Text w="30%" fontWeight="bold">{subTask.name}</Text>
      <Text flexGrow={1}><b>Start Date:&nbsp;</b>{subTask.startDate.toDateString()}</Text>
      <Text flexGrow={1}><b>End Date:&nbsp;</b>{subTask.endDate.toDateString()}</Text>
      <UpdateSubTask todoId={props.todoId} subTask={subTask} />
      <Button variant="solid" w="fit-content" size="sm" colorScheme="red" onClick={() => deleteSubTask(props.todoId, subTask.id)}>Delete</Button>
      <Button variant="solid" w="fit-content" size="sm" colorScheme="blue" onClick={() => finishSubTask(props.todoId, subTask.id)}>Finish</Button>
    </Box>
  )
}