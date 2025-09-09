import {
  Box,
  Button,
  Dialog,
  Heading,
  Portal,
  Table,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShowToast } from "../ui/data-services";

const Pengguna = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const fetchDataPengguna = async () => {
    const url = "http://localhost:3000/pengguna";
    const response = await axios.get(url);
    setUser(response.data.DATA);
  };

  useEffect(() => {
    fetchDataPengguna();
  }, []);

  const handleHapus = async (id) => {
    const url = `http://localhost:3000/hapuspengguna/${id}`;

    try {
      const response = await axios.get(url);
      if (response.data.STATUS === "BERHASIL") {
        navigate("/dashboard/pengguna");
      } else {
        ShowToast("INFO", "Hapus Gagal");
      }
    } catch (error) {
      console.log(error);
    }

    await fetchDataPengguna();
  };

  return (
    <>
      <Box padding="20px">
        <Heading size="xl" textAlign="center" padding="10px">
          Tabel Pengguna
        </Heading>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="right"
          padding="20px"
        >
          <Button variant="solid" bg="green.400" as={Link} to="tambah">
            <Text>Tambah Pengguna</Text>
          </Button>
        </Box>
      </Box>
      <Table.Root size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Nama</Table.ColumnHeader>
            <Table.ColumnHeader>Username</Table.ColumnHeader>
            <Table.ColumnHeader>Password</Table.ColumnHeader>
            <Table.ColumnHeader>Aksi</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {user.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.nama}</Table.Cell>
              <Table.Cell>{item.username}</Table.Cell>
              <Table.Cell>{item.password}</Table.Cell>
              <Table.Cell>
                <Box display="flex" flexDirection="row" gap="10px">
                  <Button
                    variant="solid"
                    bg="blue.400"
                    as={Link}
                    to={`edit/${item.id}`}
                  >
                    <Text>Ubah</Text>
                  </Button>
                  <Dialog.Root role="alertdialog">
                    <Dialog.Trigger asChild>
                      <Button variant="solid" bg="red.400" size="sm">
                        Hapus
                      </Button>
                    </Dialog.Trigger>
                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content>
                          <Dialog.Header>
                            <Dialog.Title>
                              Apakah kamu yakin menghapus Data Pengguna{" "}
                              {item.nama}
                            </Dialog.Title>
                          </Dialog.Header>
                          <Dialog.Body>
                            <p>
                              Data yang telah dihapus akan hilang dengan
                              permanen
                            </p>
                          </Dialog.Body>
                          <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                              <Button variant="outline">Batal</Button>
                            </Dialog.ActionTrigger>
                            <Button
                              colorPalette="red"
                              onClick={() => {
                                handleHapus(item.id);
                              }}
                            >
                              Hapus
                            </Button>
                          </Dialog.Footer>
                        </Dialog.Content>
                      </Dialog.Positioner>
                    </Portal>
                  </Dialog.Root>
                </Box>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default Pengguna;
