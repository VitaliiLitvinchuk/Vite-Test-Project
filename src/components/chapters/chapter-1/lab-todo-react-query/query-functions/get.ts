import axios from "axios"
import { IChapterLab2ToDo } from "../../types";

interface GetToDo {
    start: number,
    limit: number
}

const getToDos = async (settings: GetToDo): Promise<IChapterLab2ToDo[]> => {
    const response = await axios.get<IChapterLab2ToDo[]>(`https://jsonplaceholder.typicode.com/todos?_start=${settings.start}&_limit=${settings.limit}`);
    const data = response.data;
    return data.reverse();
}

export default getToDos;