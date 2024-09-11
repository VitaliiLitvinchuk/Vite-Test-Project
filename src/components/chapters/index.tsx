import { Suspense } from "react";
import { chapters } from "./constants";

const chaptersCompleted: { [key: string]: () => JSX.Element } = chapters.reduce((acc, chapter) => {
    acc[chapter.name] = () => (
        <Suspense fallback={<div>Chapter '{chapter.name}' is loading...</div>}>
            <chapter.component />
        </Suspense>
    );
    return acc;
}, {} as { [key: string]: () => JSX.Element });

export default chaptersCompleted;