import React from "react";
import HomePage from "./components/home-page";

const rootPath = "";

export interface IRouteEndpoint {
    path: string,
    component: React.ElementType | null,
    name: string,
    nested: IRouteEndpoint[] | null
}

export const routes: IRouteEndpoint[] = [
    {
        path: rootPath,
        component: HomePage,
        name: "Vite + react + ts",
        nested: null,
    },
    {
        path: `${rootPath}/test-page-1`,
        component: HomePage,
        name: "Vite",
        nested: null,
    },
    {
        path: `${rootPath}/test-page-2`,
        component: null,
        name: "react",
        nested: [
            {
                path: `/test`,
                component: HomePage,
                name: "ts",
                nested: null,
            },
        ]
    },
];

export const chapters: IRouteEndpoint[] = [
    {
        path: `${rootPath}/chapters-1`,
        component: null,
        name: "Chapter 1: Basic React",
        nested: null,
    },
    {
        path: `${rootPath}/chapters-2`,
        component: null,
        name: "Chapter 2: UI Components Libraries",
        nested: null,
    },
    {
        path: `${rootPath}/chapters-3`,
        component: null,
        name: "Chapter 3: Design the Final Project",
        nested: null,
    },
    {
        path: `${rootPath}/chapters-4`,
        component: null,
        name: "Chapter 4: Project structure",
        nested: null,
    },
    {
        path: `${rootPath}/chapters-5`,
        component: null,
        name: "Chapter 5: Routing",
        nested: null,
    },
    {
        path: `${rootPath}/chapters-6`,
        component: null,
        name: "Chapter 6: Fetching Data (advanced)",
        nested: null,
    },
    {
        path: `${rootPath}/chapters-7`,
        component: null,
        name: "Chapter 7: State Management",
        nested: null,
    },
    {
        path: `${rootPath}/chapters-8`,
        component: null,
        name: "Chapter 8: Performance Optimization",
        nested: null,
    },
];

export default rootPath; 