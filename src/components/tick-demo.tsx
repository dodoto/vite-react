import { useState, useEffect } from "react";
import { Container, VStack, Box } from "@chakra-ui/react";
import { Ticker, Tick } from "react-flip-ticker";
 
function getRandom(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
const currencies = ["$", "¥", "€"];
 
export const TickDemo = () => {
  const [state, setState] = useState<any>({
    currency: currencies[getRandom(0, 2)],
    value: getRandom(0, 100000),
  });
 
  useEffect(() => {
    setInterval(() => {
      setState({
        currency: currencies[getRandom(0, 2)],
        value: getRandom(0, 100000),
      });
    }, 1500);
  }, []);
  return (
    <Container>
      <VStack h="100vh" justifyContent="center">
        <Box pos="relative">
          <Ticker textClassName="text">
            <Tick rotateItems={currencies}>{state.currency}</Tick>
            {state.value.toLocaleString()}
          </Ticker>
        </Box>
      </VStack>
    </Container>
  );
};