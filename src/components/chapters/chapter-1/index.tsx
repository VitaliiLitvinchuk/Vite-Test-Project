import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const ChapterOne = () => {
    const { test } = useTypedSelector(state => state.chapterOne);

    const { SetTestValue } = useActions();

    return (
        <>
            <div>Chapter 1: Basic React {test}</div>
            <button className="btn btn-outline-dark w-25 mx-auto" onClick={() => SetTestValue('test chapter one')}><b>Hello world</b></button>
        </>
    )
}

export default ChapterOne;