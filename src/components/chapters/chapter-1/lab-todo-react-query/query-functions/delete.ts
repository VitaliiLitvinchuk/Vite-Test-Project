import axios from "axios";
import { IChapterLab2ToDo } from "../../types"

const deleteToDo = async (id: number, todoList: IChapterLab2ToDo[]): Promise<IChapterLab2ToDo[] | undefined> => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    const todo = todoList.find(x => x.id === id);

    if (!todo)
        return;

    if (response.status === 200) {
        return todoList.filter(x => todo.id !== x.id);
    }
}

export default deleteToDo;