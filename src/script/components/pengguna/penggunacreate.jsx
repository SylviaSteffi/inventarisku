import {
  Box,
  Button,
  CardBody,
  CardHeader,
  CardRoot,
  CardTitle,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PenggunaCreate = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const navigate = useNavigate();

  const handleSimpan = async () => {
    const url = "http://localhost/codebackendweb/insertpengguna.php";
    const body = { username: username, password: password, nama: nama };

    try {
      const response = await axios.post(url, body);
      if (response.data.STATUS === "BERHASIL") {
        navigate("/dashboard/pengguna");
      } else {
        navigate("dashboard/pengguna/tambah");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        width="100dvw"
        height="100dvh"
        justifyContent="center"
        alignItems="center"
      >
        <CardRoot width="50dvw" shadowColor="bg.emphasized" shadow="lg">
          <CardHeader>
            <CardTitle>
              <Text>Form Tambah Pengguna</Text>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Input
              type="text"
              border="1px solid grey"
              borderRadius="10px"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></Input>
            <Input
              type="text"
              border="1px solid grey"
              borderRadius="10px"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Input>
            <Input
              type="text"
              border="1px solid grey"
              borderRadius="10px"
              placeholder="Nama"
              onChange={(e) => {
                setNama(e.target.value);
              }}
            ></Input>
            <Button
              variant="solid"
              bg="green.400"
              onClick={() => handleSimpan()}
            >
              Simpan Pengguna
            </Button>
            <Button variant="outline" as={Link} to="/dashboard/pengguna">
              Kembali
            </Button>
          </CardBody>
        </CardRoot>
      </Box>
    </>
  );
};

export default PenggunaCreate;
