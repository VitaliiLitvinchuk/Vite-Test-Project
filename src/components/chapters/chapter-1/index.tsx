import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import LabsSidebar from "../features/sidebar";
import { labs } from "./constants";
import { names } from "../constants";

const ChapterOne = () => {
    const [currentLab, setCurrentLab] = useState<string>(Object.keys(labs)[3]);
    const [show, setShow] = useState(!currentLab);

    const handleClose = () => setShow(false);
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
                labs={Object.keys(labs)}
                show={show}
            />
            <Container fluid className="flex-grow-1">
                {
                    labs[currentLab]
                }
            </Container>
        </>
    )
}

export default ChapterOne;