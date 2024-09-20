import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container } from "react-bootstrap";
import Title from "../../features/title";
import ToDoTable from "./table";

const queryClient = new QueryClient();

const ToDoListReactQuery = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Container fluid>
                <Title title='React Query "To Do List"' />
                <ToDoTable />
            </Container>
        </QueryClientProvider>
    );
}

export default ToDoListReactQuery;