import { Container } from "react-bootstrap";
import ToDoTable from "./table";

const ToDoList = () => {
  return (
    <Container fluid>
      <h3 className="mt-3 text-primary">To Do List <span className="text-danger">~Not Optimized~</span></h3>
      <ToDoTable />
    </Container>
  )
}

export default ToDoList;