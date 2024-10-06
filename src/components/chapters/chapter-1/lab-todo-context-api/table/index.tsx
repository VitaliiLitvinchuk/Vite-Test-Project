import { Table } from "react-bootstrap";
import { useState, useMemo, useEffect, useContext, useRef, useCallback } from "react";
import { ToDoListContext } from "../context";
import TableData from "./row";
import "./index.css";
import Loader from "../../../../loader";
import classNames from "classnames";
import SearchInput from "./search";

const items = 10;
const ToDoTable = () => {
    const { todoList, fetching, initToDo } = useContext(ToDoListContext);
    const [filter, setFilter] = useState<string>("");
    const [visibleItems, setVisibleItems] = useState<number>(items);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // In provider delay 400ms (setTimeout)
        // To show loader
        initToDo();
    }, [initToDo]);

    const handleFilter = useCallback((value: string) => {
        setVisibleItems(items);
        setFilter(value);
    }, []);

    const filteredTodoList = useMemo(() => {
        return todoList.filter(x => x.title.includes(filter));
    }, [todoList, filter]);

    const lastItemRef = useCallback(
        (node: HTMLTableRowElement | null) => {
            if (fetching) return;
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting)
                    setVisibleItems((prevVisibleItems) => prevVisibleItems + items);
            });

            if (node) observerRef.current.observe(node);
        },
        [fetching]
    );

    return (
        <Table striped bordered hover variant="dark">
            <thead className="align-middle">
                <tr>
                    <th style={{ width: "10%" }}>User id</th>
                    <th style={{ width: "10%" }}>Task id</th>
                    <th className="py-3" style={{ width: "50%" }}>
                        <SearchInput value={filter} setValue={handleFilter} />
                    </th>
                    <th style={{ width: "10%" }}>Completed</th>
                    <th style={{ width: "20%" }}>
                        <Loader visible={fetching} />
                    </th>
                </tr>
            </thead>
            <tbody className={classNames("align-middle", fetching && "disabled")}>
                {
                    filteredTodoList.slice(0, visibleItems).map((x, index) => {
                        const isLastItem = index === visibleItems - 1;
                        return (
                            <tr
                                key={x.id}
                                ref={isLastItem ? lastItemRef : null}>
                                <TableData todo={x} />
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>
    );
};

export default ToDoTable;
