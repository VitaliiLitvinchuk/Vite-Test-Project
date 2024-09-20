import { Button, Offcanvas } from 'react-bootstrap';

interface ISidebarProps {
    show: boolean,
    title: string,
    labs: string[],
    handleClose: () => void,
    setLab: (lab: string) => void
}

const LabsSidebar = ({ show, title, labs, handleClose, setLab }: ISidebarProps) => {
    const handleClick = (lab: string) => {
        setLab(lab)
        handleClose();
    }

    return (
        <Offcanvas show={show} onHide={handleClose} className="bg-dark text-light">
            <Offcanvas.Header closeButton closeVariant='white'>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    labs.map(x =>
                        <Button className='w-100 mb-3' variant='secondary' key={x} onClick={() => handleClick(x)}>
                            <b>{x}</b>
                        </Button>
                    )
                }
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default LabsSidebar;
