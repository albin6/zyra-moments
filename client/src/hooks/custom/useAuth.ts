import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useAdminAuth = () => {
  const admin = useSelector((state: RootState) => state.admin.admin);
  return { isLoggedIn: admin !== null, admin };
};

export const useClientAuth = () => {
  const client = useSelector((state: RootState) => state.client.client);
  return { isLoggedIn: client !== null, client };
};

export const useVendorAuth = () => {
  const vendor = useSelector((state: RootState) => state.vendor.vendor);
  return { isLoggedIn: vendor !== null, vendor };
};
