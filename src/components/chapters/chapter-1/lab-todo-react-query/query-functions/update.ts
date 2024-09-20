import axios from "axios";
import { IChapterLab2ToDo } from "../../types";

const updateToDo = async (todo: IChapterLab2ToDo): Promise<IChapterLab2ToDo | undefined> => {
    const response = await axios.put<IChapterLab2ToDo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);

    if (response.status === 200)
        return response.data;
}

export default updateToDo;