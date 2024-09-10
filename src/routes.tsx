import React from "react";
import HomePage from "./components/home-page";
import chapters from "./components/chapters";

const rootPath = "";

export interface IRouteEndpoint {
    path: string,
    component: React.ElementType | null,
    name: string,
    nested: IRouteEndpoint[] | null
}

const rootRoute: IRouteEndpoint = {
    path: rootPath,
    component: HomePage,
    name: "Vite + react + ts",
    nested: null,
}

export const routes: IRouteEndpoint[] = [
    rootRoute,
    {
        path: `${rootPath}`,
        component: null,
        name: "Chapters",
        nested: [{
            path: `chapters-1`,
            component: chapters.ChapterOne,
            name: "Chapter 1: Basic React",
            nested: null,
        },
        {
            path: `chapters-2`,
            component: chapters.ChapterTwo,
            name: "Chapter 2: UI Components Libraries",
            nested: null,
        },
        {
            path: `chapters-3`,
            component: chapters.ChapterThree,
            name: "Chapter 3: Design the Final Project",
            nested: null,
        },
        {
            path: `chapters-4`,
            component: chapters.ChapterFour,
            name: "Chapter 4: Project structure",
            nested: null,
        },
        {
            path: `chapters-5`,
            component: chapters.ChapterFive,
            name: "Chapter 5: Routing",
            nested: null,
        },
        {
            path: `chapters-6`,
            component: chapters.ChapterSix,
            name: "Chapter 6: Fetching Data (advanced)",
            nested: null,
        },
        {
            path: `chapters-7`,
            component: chapters.ChapterSeven,
            name: "Chapter 7: State Management",
            nested: null,
        },
        {
            path: `chapters-8`,
            component: chapters.ChapterEight,
            name: "Chapter 8: Performance Optimization",
            nested: null,
        }, {
            path: `chapters-9`,
            component: chapters.ChapterNine,
            name: "Chapter 9:  SOLID React",
            nested: null,
        }, {
            path: `chapters-10`,
            component: chapters.ChapterTen,
            name: "Chapter 10: React Frameworks Review (Next.js, Remix, Gatsby)",
            nested: null,
        }, {
            path: `chapters-11`,
            component: chapters.ChapterEleven,
            name: "Chapter 11: HTML, CSS, JS Overview",
            nested: null,
        },],
    },
];

export default rootPath; 