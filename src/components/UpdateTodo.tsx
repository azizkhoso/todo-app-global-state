import React from "react";
import {
  Box,
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
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import useTodos from "../hooks/useTodos";
import ITodo from "../interfaces/ITodo";

const colorMap = {
  'personal': 'green',
  'work': 'blue',
  'misc': 'purple'
}

const defaultValues = {
  name: '',
  category: 'personal' as 'personal' | 'work' | 'misc',
  startDate: new Date(),
  endDate: new Date(),
};

export default function UpdateTodo(props: {todo: ITodo}) {
  const {updateTodo} = useTodos();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = React.useState(props.todo as typeof defaultValues);
  const handleChange = (name: keyof typeof defaultValues, value: string | Date | null) => {
    setFormData((fd) => ({
      ...fd,
      [name]: value || fd[name]
    }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTodo(props.todo.id, formData);
    setFormData(defaultValues); // reset form
    onClose();
  }
  return (
    <React.Fragment>
      <Button size="sm" variant="solid" colorScheme="orange" onClick={onOpen}>Edit Todo</Button>
      {
        isOpen && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as="form" onSubmit={handleSubmit}>
              <ModalHeader>Edit Todo</ModalHeader>
              <ModalCloseButton />
              <ModalBody display="flex" flexDir="column" gap="8px">
                <FormControl w={{base: 'full', md: ''}}>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
                </FormControl>
                <FormControl w={{base: 'full', md: ''}}>
                  <FormLabel>Category</FormLabel>
                  <Select value={formData.category} onChange={(e) => handleChange('category', e.target.value)} >
                    {
                      (['personal', 'work', 'misc'] as const).map((category) => (
                        <Box
                          as="option"
                          value={category}
                          color="white"
                          bgColor={colorMap[category] + ' !important'}
                          textTransform="capitalize"
                        >
                          {category}
                        </Box>
                      ))
                    }
                  </Select>
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
                <Button variant="outline" colorScheme="orange" type="submit">Update</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )
      }
    </React.Fragment>
  )
}