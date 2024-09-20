import { Container } from "react-bootstrap";
import Title from "../../features/title";
import ToDoTable from "./table";

const ToDoListZustand = () => {
    return (
        <Container fluid>
            <Title title='Zustand "To Do List"' />
            <ToDoTable />
        </Container>
    );
}

export default ToDoListZustand;