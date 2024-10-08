import { Container } from "react-bootstrap"
import Title from "../../features/title"
import Provider from "./Provider"
import PhoneTable from "./table"

const Lab8 = () => {
    return (
        <Container fluid>
            <Title title='Lab 8' />
            <Provider>
                <PhoneTable />
            </Provider>
        </Container>
    )
}

export default Lab8