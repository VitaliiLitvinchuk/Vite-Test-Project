import React from "react";
import HomePage from "./components/home-page";

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
            component: () => <div>Chapter 1</div>,
            name: "Chapter 1: Basic React",
            nested: null,
        },
        {
            path: `chapters-2`,
            component: () => <div>Chapter 2</div>,
            name: "Chapter 2: UI Components Libraries",
            nested: null,
        },
        {
            path: `chapters-3`,
            component: () => <div>Chapter 3</div>,
            name: "Chapter 3: Design the Final Project",
            nested: null,
        },
        {
            path: `chapters-4`,
            component: () => <div>Chapter 4</div>,
            name: "Chapter 4: Project structure",
            nested: null,
        },
        {
            path: `chapters-5`,
            component: () => <div>Chapter 5</div>,
            name: "Chapter 5: Routing",
            nested: null,
        },
        {
            path: `chapters-6`,
            component: () => <div>Chapter 6</div>,
            name: "Chapter 6: Fetching Data (advanced)",
            nested: null,
        },
        {
            path: `chapters-7`,
            component: () => <div>Chapter 7</div>,
            name: "Chapter 7: State Management",
            nested: null,
        },
        {
            path: `chapters-8`,
            component: () => <div>Chapter 8</div>,
            name: "Chapter 8: Performance Optimization",
            nested: null,
        }, {
            path: `chapters-9`,
            component: () => <div>Chapter 9</div>,
            name: "Chapter 9:  SOLID React",
            nested: null,
        }, {
            path: `chapters-10`,
            component: () => <div>Chapter 10</div>,
            name: "Chapter 10: React Frameworks Review (Next.js, Remix, Gatsby)",
            nested: null,
        }, {
            path: `chapters-11`,
            component: () => <div>Chapter 11</div>,
            name: "Chapter 11: HTML, CSS, JS Overview",
            nested: null,
        },],
    },
];

export default rootPath; 