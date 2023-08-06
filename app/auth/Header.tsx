import getSession from "../utils/getSession";
import Navbar from "./Navbar";

const Header = async () => {
  const session = await getSession();
  return <Navbar session={session} />;
};

export default Header;
