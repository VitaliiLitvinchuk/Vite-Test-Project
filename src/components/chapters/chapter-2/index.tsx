import { useTypedSelector } from "../../../hooks/useTypedSelector";

const ChapterTwo = () => {
    const { test } = useTypedSelector(state => state.chapterOne)

    return (
        <div>Chapter 2: UI Components Libraries {test}</div>
    )
}

export default ChapterTwo;