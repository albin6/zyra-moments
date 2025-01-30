import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state: RootState) => state.store.user);

  const isLoggedIn = user !== null;

  return { isLoggedIn, user };
};

export default useAuth;
