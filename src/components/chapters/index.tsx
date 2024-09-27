import { Suspense } from "react";
import { chapters } from "./constants";
import Loader from "../loader";

// eslint-disable-next-line react-refresh/only-export-components
const ChapterLoader = ({ name }: { name: string }) => {
    return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <div>
                <Loader visible={true} />
            </div>
            <div>Chapter '{name}' is loading...</div>
        </div>
    );
}

const chaptersCompleted: { [key: string]: () => JSX.Element } = chapters.reduce((acc, chapter) => {
    acc[chapter.name] = () => (
        <Suspense fallback={<ChapterLoader name={chapter.name} />}>
            <chapter.component />
        </Suspense>
    );
    return acc;
}, {} as { [key: string]: () => JSX.Element });

export default chaptersCompleted;