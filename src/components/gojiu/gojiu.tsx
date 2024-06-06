import { Container, Radio, RadioGroup, HStack } from "@chakra-ui/react";
import { memo, useState } from "react";

type SelectorProps = {
  value: "katagana" | "hiragana" | "all";
  onChange: (value: SelectorProps["value"]) => void;
};

const Selector = memo(({ value, onChange }: SelectorProps) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <HStack justify="center">
        <Radio value="katagana">katagana</Radio>
        <Radio value="hiragana">hiragana</Radio>
        <Radio value="all">all</Radio>
      </HStack>
    </RadioGroup>
  );
});

export const Gojiu = () => {
  const [type, setType] = useState<SelectorProps["value"]>("katagana");


  return (
    <Container>
      <Selector value={type} onChange={setType} />
    </Container>
  );
};