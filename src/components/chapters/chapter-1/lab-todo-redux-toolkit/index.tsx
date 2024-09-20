import { Container } from "react-bootstrap";
import ToDoTable from "./table";
import Title from "../../features/title";

const ToDoListToolkit = () => {
    return (
        <Container fluid>
            <Title title='Redux Toolkit "To Do List"' />
            <ToDoTable />
        </Container>
    )
}

export default ToDoListToolkit;