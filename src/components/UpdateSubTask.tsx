import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useTodos from "../hooks/useTodos";
import { ISubTask } from "../interfaces/ITodo";

const defaultValues = {
  name: '',
  startDate: new Date(),
  endDate: new Date(),
};

export default function UpdateSubTask(props: {todoId: string, subTask: ISubTask}) {
  const {updateSubTask} = useTodos();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = React.useState(props.subTask as typeof defaultValues);
  const handleChange = (name: keyof typeof formData, value: string | Date | null) => {
    setFormData((fd) => ({
      ...fd,
      [name]: value || fd[name]
    }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSubTask(props.todoId, props.subTask.id, formData);
    setFormData(defaultValues); // reset form
    onClose();
  }
  return (
    <React.Fragment>
      <Button size="sm" variant="solid" colorScheme="orange" onClick={onOpen}>Update Sub Task</Button>
      {
        isOpen && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit}>
              <ModalHeader>Update Sub Task</ModalHeader>
              <ModalCloseButton />
              <ModalBody display="flex" flexDir="column" gap="8px">
                <FormControl w={{base: 'full', md: ''}}>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                </FormControl>
                <FormControl w={{base: 'full', md: ''}}>
                  <FormLabel>Start date</FormLabel>
                  <Input
                    type="date"
                    value={formData.startDate.toISOString().split('T')[0]}
                    onChange={(e) => handleChange('startDate', e.target.valueAsDate)}
                  />
                </FormControl>
                <FormControl w={{base: 'full', md: ''}}>
                  <FormLabel>End date</FormLabel>
                  <Input
                    type="date"
                    value={formData.endDate.toISOString().split('T')[0]}
                    onChange={(e) => handleChange('endDate', e.target.valueAsDate)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="solid" colorScheme="orange" type="submit">Update</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )
      }
    </React.Fragment>
  )
}