import { Container } from "react-bootstrap";
import Title from "../../features/title";
import ToDoTable from "./table";
import Provider from "./Provider";

const ToDoListContextApi = () => {
    return (
        <Container fluid>
            <Title title='Context Api "To Do List"' />
            <Provider>
                <ToDoTable />
            </Provider>
        </Container>
    );
}

export default ToDoListContextApi;