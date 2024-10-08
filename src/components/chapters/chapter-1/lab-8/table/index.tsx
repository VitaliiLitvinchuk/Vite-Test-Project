import { Table } from "react-bootstrap";
import { useState, useMemo, useEffect, useContext, useRef, useCallback } from "react";
import "./index.css";
import Loader from "../../../../loader";
import classNames from "classnames";
import SearchInput from "./search";
import { PhoneListContext } from "../context";
import TableData from "./row";

const items = 10;
const PhoneTable = () => {
    const { phoneList, fetching, initPhones } = useContext(PhoneListContext);
    const [filter, setFilter] = useState<string>("");
    const [visibleItems, setVisibleItems] = useState<number>(items);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        initPhones();
    }, [initPhones]);

    const handleFilter = useCallback((value: string) => {
        setVisibleItems(items);
        setFilter(value);
    }, []);

    const filteredPhoneList = useMemo(() => {
        return phoneList.filter(x => {
            return `${x.firstName} ${x.lastName}`.toLowerCase().includes(filter.toLowerCase());
        });
    }, [phoneList, filter]);

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
                    <th style={{ width: "10%" }}>Id</th>
                    <th className="py-3" style={{ width: "35%" }} colSpan={2}>
                        <SearchInput value={filter} setValue={handleFilter} />
                    </th>
                    <th style={{ width: "15%" }}>Phone</th>
                    <th style={{ width: "20%" }}>
                        <Loader visible={fetching} />
                    </th>
                </tr>
            </thead>
            <tbody className={classNames("align-middle", fetching && "disabled")}>
                {filteredPhoneList.length > 0 ?
                    filteredPhoneList.slice(0, visibleItems).map((x, index) => {
                        const isLastItem = index === visibleItems - 1;
                        return (
                            <tr
                                key={x.id}
                                ref={isLastItem ? lastItemRef : null}>
                                <TableData phone={x} />
                            </tr>
                        );
                    })
                    :
                    <tr>
                        <td colSpan={5} className="text-center">No data to display</td>
                    </tr>
                }
            </tbody>
        </Table>
    );
};

export default PhoneTable;
