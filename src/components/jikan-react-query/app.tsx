import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { List } from "./list";

const queryClient = new QueryClient();

export const QueryApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <List />
    </QueryClientProvider>
  );
};