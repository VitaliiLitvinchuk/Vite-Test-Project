import axios from "axios";

const deleteToDo = async (id: number): Promise<boolean> => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    if (response.status === 200)
        return true;

    return false;
}

export default deleteToDo;