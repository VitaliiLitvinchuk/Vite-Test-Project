import { Container } from "react-bootstrap"
import Title from "../../features/title"
import Provider from "./Provider"
import PhoneTable from "./table"

const Lab9 = () => {
    return (
        <Container fluid>
            <Title title='Lab 9' />
            <Provider>
                <PhoneTable />
            </Provider>
        </Container>
    )
}

export default Lab9