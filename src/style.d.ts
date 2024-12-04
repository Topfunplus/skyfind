declare module '*.css';
declare module '*.less';
declare module '*'


// ollama 流式返回
declare class AbortableAsyncIterator<T extends object> {
    private readonly abortController;
    private readonly itr;
    private readonly doneCallback;

    constructor(abortController: AbortController, itr: AsyncGenerator<T | ErrorResponse>, doneCallback: () => void);

    abort(): void;

    [Symbol.asyncIterator](): AsyncGenerator<Awaited<T>, void, unknown>;
}
