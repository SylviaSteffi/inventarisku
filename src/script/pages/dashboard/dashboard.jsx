import { Box, Button } from "@chakra-ui/react";
import MyDrawer from "../../components/ui/drawer";
import { CiSun } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";
import { useColorMode } from "../../components/ui/color-mode";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import person from "../../../public/assets/img/person.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const { toggleColorMode } = useColorMode();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const usernameLS = localStorage.getItem("usernameLS");
    if (usernameLS == null) {
      navigate("/");
    } else {
      setNama(localStorage.getItem("namaLS"));
    }
  }, []);

  return (
    <>
      <Box
        width="100dvw"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="10px"
      >
        <MyDrawer nama={nama} imgLogo={person} />
        <Box display="flex" flexDirection="row" gap="10px">
          <Button
            variant="outline"
            shadow="1px 1px 1px grey"
            onClick={toggleColorMode}
          >
            <CiSun />
          </Button>
          <Button
            variant="outline"
            shadow="1px 1px 1px grey"
            onClick={() => {
              handleLogout();
            }}
          >
            <BiLogOut />
          </Button>
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default Dashboard;
