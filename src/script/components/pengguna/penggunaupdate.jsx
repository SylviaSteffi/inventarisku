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
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toaster } from "../ui/toaster";
import { ShowToast } from "../ui/data-services";

const PenggunaUpdate = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const navigate = useNavigate();

  const fetchDataPengguna = async () => {
    const url = `http://localhost/codebackendweb/selectonepengguna.php?id=${id}`;
    const response = await axios.get(url);
    setUsername(response.data.DATA[0].username);
    setPassword(response.data.DATA[0].password);
    setNama(response.data.DATA[0].nama);
  };

  useEffect(() => {
    fetchDataPengguna();
  }, []);

  const handleEdit = async () => {
    const url = `http://localhost:3000/pengguna/${id}`;
    const body = { username: username, password: password, nama: nama, id: id };

    try {
      const response = await axios.post(url, body);
      if (response.data.STATUS === "BERHASIL") {
        navigate("/dashboard/pengguna");
      } else {
        ShowToast("INFO", "Simpan Gagal");
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
        <Toaster />
        <CardRoot width="50dvw" shadowColor="bg.emphasized" shadow="lg">
          <CardHeader>
            <CardTitle>
              <Text>Form Edit Pengguna</Text>
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
              value={username}
            ></Input>
            <Input
              type="text"
              border="1px solid grey"
              borderRadius="10px"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            ></Input>
            <Input
              type="text"
              border="1px solid grey"
              borderRadius="10px"
              placeholder="Nama"
              onChange={(e) => {
                setNama(e.target.value);
              }}
              value={nama}
            ></Input>
            <Button variant="solid" bg="blue.400" onClick={() => handleEdit()}>
              Edit Pengguna
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

export default PenggunaUpdate;
