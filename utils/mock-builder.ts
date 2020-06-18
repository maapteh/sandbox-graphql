export type TBuilder<O> = (attrs?: Partial<O>) => O;

export const mockBuilder = <O extends {}>(defaults: O): TBuilder<O> => (
    attrs,
) => ({
    ...defaults,
    ...attrs,
});
