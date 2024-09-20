import axios from "axios";
import { IChapterLab2ToDo } from "../../types";

const createToDo = async (todo: IChapterLab2ToDo): Promise<IChapterLab2ToDo | undefined> => {
    const response = await axios.post<IChapterLab2ToDo>(`https://jsonplaceholder.typicode.com/todos`, todo);

    if (response.status === 201)
        return response.data;
}

export default createToDo;