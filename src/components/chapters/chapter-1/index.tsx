import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const ChapterOne = () => {
    const { test } = useTypedSelector(state => state.chapterOne);

    const { SetTestValue } = useActions();

    return (
        <>
            <div>Chapter 1: Basic React {test}</div>
            <button onClick={() => SetTestValue('test chapter one')}></button>
        </>
    )
}

export default ChapterOne;