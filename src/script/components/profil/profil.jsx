import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import person from "../../../public/assets/img/person.jpg";
import { useEffect } from "react";

const Profil = () => {
  const [nama, setNama] = useState("");
  useEffect(() => {
    setNama(localStorage.getItem("usernameLS"));
  }, []);

  return (
    <>
      <Heading size="3xl" textAlign="center">
        Profil Saya
      </Heading>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Image src={person} width="30dvw" />
      </Box>
      <Text textAlign="center" padding="10px">
        Nama saya {nama}
      </Text>
      <Text textAlign="center" padding="10px">
        Saya adalah seorang programmer amatir yang suka belajar.
      </Text>
    </>
  );
};

export default Profil;
