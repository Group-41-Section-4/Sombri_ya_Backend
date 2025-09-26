export declare enum PostType {
    blog = "blog",
    news = "news",
    advertising = "advertising",
}
export declare class Post {
    id: number;
    type: PostType[];
    numbers: number[];
}
