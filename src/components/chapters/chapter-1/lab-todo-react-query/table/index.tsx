import { Table } from "react-bootstrap";
import { useState, useCallback, useMemo, useEffect } from "react";
import { IChapterLab2ToDo } from "../../types";
import getToDos from "../query-functions/get";
import deleteToDo from "../query-functions/delete";
import { useQuery } from "@tanstack/react-query";
import createToDo from "../query-functions/create";
import updateToDo from "../query-functions/update";
import TableRow from "../../features/TableRow";
import LoaderWrapper from "../../../../loader/wrapper";

const defaultUserId = 1;

const ToDoTable = () => {
    const [filter, setFilter] = useState<string>("");

    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => await getToDos({ limit: 10, start: 20 }),
    })

    const [nextIdToDo, setNext] = useState<number>(1);
    const [todoList, setTodoList] = useState<IChapterLab2ToDo[]>([]);
    const [todo, setTodo] = useState<IChapterLab2ToDo>({ userId: defaultUserId, id: nextIdToDo, title: "", completed: false });

    useEffect(() => {
        if (data) {
            setTodoList(data);
            setNext(data.sort((a, b) => b.id - a.id)[0].id + 1);
        }
    }, [data]);

    useEffect(() => {
        setTodo({ userId: defaultUserId, id: nextIdToDo, title: "", completed: false });
    }, [nextIdToDo]);

    const handleFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }, []);

    const handleCreate = useCallback(async () => {
        const response = await createToDo(todo);

        if (response) {
            // get from 20-30 todos
            response.id = nextIdToDo;
            //
            setTodoList([response, ...todoList]);
            setNext(response.id + 1);
        }
    }, [todo, todoList, nextIdToDo]);

    const handleEdit = useCallback(async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const response = await updateToDo({ ...todoList.find(x => x.id === id)!, title: e.target.value });

        if (response)
            setTodoList(todoList.map(x => x.id === id ? response : x));
    }, [todoList]);

    const handleDelete = useCallback(async (id: number) => {
        if (!todoList)
            return;

        const response = await deleteToDo(id, todoList);

        if (response)
            setTodoList(response);
    }, [todoList]);

    const handleChangeStatus = useCallback(async (id: number) => {
        const todo = todoList.find(x => x.id === id)!;

        const response = await updateToDo({ ...todo, completed: !todo.completed });

        if (response)
            setTodoList(todoList.map(x => x.id === id ? response : x));
    }, [todoList]);

    const filteredTodoList = useMemo(() => {
        if (todoList)
            return todoList.filter(x => x.title.includes(filter));
        return [];
    }, [todoList, filter]);

    if (error) return 'An error has occurred: ' + error.message;

    return (
        <LoaderWrapper visible={isPending || isFetching}>
            <Table striped bordered hover variant="dark">
                <thead className="align-middle">
                    <tr>
                        <th style={{ width: "10%" }}>User id</th>
                        <th style={{ width: "10%" }}>Task id</th>
                        <th style={{ width: "55%" }}>
                            <input type="text" className="form-control" placeholder="Filter by title" onChange={handleFilter} />
                        </th>
                        <th style={{ width: "10%" }}>Completed</th>
                        <th style={{ width: "15%" }}></th>
                    </tr>
                </thead>
                <tbody className="align-middle">
                    <TableRow
                        key={todo.id}
                        todo={todo}
                        handleEdit={handleEdit}
                        handleChangeStatus={handleChangeStatus}
                        bootstrapButtonType='btn-outline-primary'
                        actionName='Add'
                        disabledStatus={true}
                        handleAction={handleCreate} />
                    <tr>
                        <td colSpan={5}>
                            <hr />
                        </td>
                    </tr>
                    {
                        filteredTodoList.map(todo => (
                            <TableRow
                                key={todo.id}
                                todo={todo}
                                handleEdit={handleEdit}
                                handleChangeStatus={handleChangeStatus}
                                bootstrapButtonType='btn-outline-danger'
                                actionName='Delete'
                                disabledStatus={false}
                                handleAction={handleDelete} />
                        ))
                    }
                </tbody>
            </Table>
        </LoaderWrapper>
    );
}

export default ToDoTable;
