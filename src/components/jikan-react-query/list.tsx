import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Flex, Spinner, Text, Container, Box, Image, Link } from "@chakra-ui/react";

const URL = "https://api.jikan.moe/v4/anime";

type Anime = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    url: string;
    embed_url: string;
  };
  title: string;
  title_english: string;
  title_japanese: string;
  episodes: number;
};

const getAnime = async (): Promise<Array<Anime>> => {
  const res = await fetch(URL);
  const data = await res.json();
  return data.data;
};

const Loading = () => {
  return (
    <Flex alignItems="center" justifyContent="center" h="100vh">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl"/>
    </Flex>
  );
};

const Error = ({ error }: { error: string }) => {
  return (
    <Flex alignItems="center" justifyContent="center" h="100vh">
      <Text>{ error }</Text>
    </Flex>
  );
};

const AnimeItem = ({ src, url }: { src: string, url: string }) => {
  return (
    <Box shadow="2xl" rounded="sm" overflow="hidden">
      <Link href={url} target="_blank">
        <Image src={src} objectFit="cover" w="240px" h="320px" transition="0.2s" _hover={{ transform: "scale(1.035)" }}/>
      </Link>
    </Box>
  );
};

export const List = () => {
  // const client = useQueryClient();
  const { isPending, error, data, isFetching } = useQuery({ queryKey: ["anime"], queryFn: getAnime });

  if (isPending) return <Loading />;

  if (error) return <Error error={`An error has occurred: ${error.message}`}/>;

  // console.log(data);
  return  (
    <Container>
      <Flex flexWrap="wrap" gap="16px" p="16px" justifyContent="space-between">
        { data.map((item: Anime) => (
          <AnimeItem key={item.mal_id} src={item.images.jpg.image_url} url={item.url}/>
        ))}
      </Flex>
    </Container>
  );
};