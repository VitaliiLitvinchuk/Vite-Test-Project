import { lazy } from "react";

export const amountOfChapters = 11;

export const names: string[] = [
    "Chapter 1: Basic React",
    "Chapter 2: UI Components Libraries",
    "Chapter 3: Design the Final Project",
    "Chapter 4: Project structure",
    "Chapter 5: Routing",
    "Chapter 6: Fetching Data (advanced)",
    "Chapter 7: State Management",
    "Chapter 8: Performance Optimization",
    "Chapter 9: SOLID React",
    "Chapter 10: React Frameworks Review (Next.js, Remix, Gatsby)",
    "Chapter 11: HTML, CSS, JS Overview"
];

export const keys: string[] = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven'
];

export const paths = keys.map((_key, index) => `chapter-${index + 1}`);

if (names.length !== keys.length || keys.length !== amountOfChapters)
    throw new Error("names.length, keys.length, amountOfChapters must be equal");

export interface Chapter {
    name: string;
    component: React.LazyExoticComponent<React.ComponentType>;
}

export interface IShowLabs {
    [key: string]: JSX.Element
}


export const chapters: Chapter[] = keys.map((key, index) => ({ name: key, component: lazy(() => import(`./${paths[index]}/index.tsx`)) }));
