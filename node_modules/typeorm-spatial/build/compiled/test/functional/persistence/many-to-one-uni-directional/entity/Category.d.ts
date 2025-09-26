import { Post } from "./Post";
export declare class Category {
    id: number;
    name: string;
    post?: Post | null | number;
    constructor(name: string, post?: Post);
}
