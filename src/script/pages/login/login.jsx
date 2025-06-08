import {
  Box,
  CardBody,
  CardHeader,
  CardRoot,
  CardTitle,
  Input,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "../../components/ui/data-services";
import { Toaster } from "../../components/ui/toaster";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const url = "http://localhost/codebackendweb/proseslogin.php";
    const body = { username: username, password: password };

    try {
      const response = await axios.post(url, body);
      if (response.data.STATUS === "BERHASIL") {
        localStorage.setItem("usernameLS", response.data.DATA[0]["username"]);
        localStorage.setItem("namaLS", response.data.DATA[0]["nama"]);

        navigate("/dashboard");
      } else {
        ShowToast("INFO", "Login Gagal");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const usernameLS = localStorage.getItem("usernameLS");
    if (usernameLS) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100dvw"
        height="100dvh"
      >
        <Toaster />
        <CardRoot
          width="50dvw"
          height="60dvh"
          shadowColor="bg.emphasized"
          shadow="lg"
        >
          <CardHeader>
            <CardTitle
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              {/* <Image src={img} width="10dvw" /> */}
              <Text>Inventaris Ku</Text>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Box display="flex" flexDirection="column" gapY="5px">
              <Input
                type="text"
                border="1px solid grey"
                borderRadius="10px"
                placeholder="Enter your username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Input
                type="password"
                border="1px solid grey"
                borderRadius="10px"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                borderRadius="10px"
                bg="teal"
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </Button>
            </Box>
          </CardBody>
        </CardRoot>
      </Box>
    </>
  );
};

export default Login;
