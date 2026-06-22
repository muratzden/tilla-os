export type AdminQueryHandler<TAdmin, TResult, TInput = void> = (
  admin: TAdmin,
  input: TInput,
) => Promise<TResult>;