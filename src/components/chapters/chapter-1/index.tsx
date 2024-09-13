import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import LabsSidebar from "../sidebar";
import { labs } from "./constants";
import { names } from "../constants";

const ChapterOne = () => {
    const [currentLab, setCurrentLab] = useState<string>(Object.keys(labs[0])[0]);
    const [show, setShow] = useState(!currentLab);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="dark" className="w-25 mx-auto rounded-top-0" onClick={handleShow}>
                Open Labs
            </Button>
            <LabsSidebar
                title={names[0]}
                handleClose={handleClose}
                setLab={setCurrentLab}
                labs={labs.map(x => Object.keys(x)[0])}
                show={show}
            />
            <Container fluid className="flex-grow-1">
                {
                    labs.map(x => x[currentLab])
                }
            </Container>
        </>
    )
}

export default ChapterOne;