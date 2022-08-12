import { Box } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostUser from "./components/PostUser";
import ShowInfo from "./components/ShowInfo";
const queryClient = new QueryClient();

function App() {
  return (
    <Box
      m="lg"

      sx={{

        // backgroundColor: "black",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <PostUser />
        <ShowInfo />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </Box>
  );
}

export default App;
