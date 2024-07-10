// src/types/Article.ts
export interface Article {
    _id: string;
    title: string;
    introduction: string;
    body: string;
    conclusion: string;
    // category: {
    //     _id: string;
    //     name: string;
    // };
    createdAt: string;
    author: string;
    imageUrl: string;
}
