import {FC} from 'react';
import {Grid, GridItem, Box, Center, Container, Heading} from '@chakra-ui/react';

export const ResponsiveGridLayout: FC = () => {
  return (
    <Box>
      <Center>
        <Container maxW="800px">
          <Grid templateRows="repeat(2, minmax(100px, auto))" templateColumns="repeat(5, 1fr)" p="4" gap="4">
            <GridItem colSpan={5} bg="tomato">
              <Heading>head</Heading>
            </GridItem>
            <GridItem bg="papayawhip">left-side</GridItem>
            <GridItem colSpan={3} bg="papayawhip">
              <Heading>main</Heading>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolorem fuga recusandae illum similique. Modi dolorem ad eum saepe quisquam illo distinctio, fugiat ratione doloribus, cupiditate maiores, impedit alias? Magnam?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, iure perferendis? Laborum modi quibusdam voluptatum repudiandae nobis! Placeat, quos saepe ipsa eos sit repudiandae alias modi odio facilis deserunt blanditiis!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam maiores voluptatem fuga quibusdam sint accusamus voluptatibus dolores? Labore doloribus ut minima, excepturi dolore tenetur perspiciatis sed, nostrum blanditiis adipisci obcaecati.
            </GridItem>
            <GridItem bg="tomato">right-side</GridItem>
          </Grid>
        </Container>
      </Center>
    </Box>
  );
};