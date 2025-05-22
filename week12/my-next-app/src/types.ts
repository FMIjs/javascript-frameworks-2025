export type NextPageProps<
  T extends Record<string, string> = Record<string, string>,
  P extends Record<string, string> = Record<string, string>
> = {
  params: Promise<T>;
  searchParams: Promise<P>;
};
