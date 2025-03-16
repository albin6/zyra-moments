import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Pagination from "../Pagination";
import { useAllUsersQuery, UserType } from "@/hooks/admin/useAllUsers";
import { Spinner } from "../ui/spinner";
import { getAllUsers } from "@/services/admin/adminService";
import { useUpdateUserStatusMutation } from "@/hooks/admin/useUpdateUserStatus";
import { toast } from "sonner";
import _ from "lodash";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";

export interface IClient {
  _id: string;
  clientId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  masterOfCeremonies: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ClientsData = IClient[];

interface Vendor {
  _id: string;
  vendorId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  category: {
    _id: string;
    title: string;
  };
  categoryRequest?: boolean;
}

export type VendorList = Vendor[];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<string>("client");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState<{
    type: string;
    id: string;
  } | null>(null);

  const [clients, setClients] = useState<ClientsData>();
  const [vendors, setVendors] = useState<VendorList>();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const limit = 5;

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      setDebouncedSearchTerm(query);
    }, 500),
    []
  );

  const { data, isLoading } = useAllUsersQuery<ClientsData | VendorList>(
    getAllUsers,
    page,
    limit,
    debouncedSearchTerm,
    activeTab as UserType
  );

  const { mutate: updateUserStatus } = useUpdateUserStatusMutation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleBlockUser = (userType: string, userId: any) => {
    updateUserStatus(
      { userType, userId },
      {
        onSuccess: (data) => toast.success(data.message),
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
  };

  const confirmBlock = () => {
    if (userToBlock) {
      handleBlockUser(userToBlock?.type, userToBlock?.id);
    }
  };

  useEffect(() => {
    if (!data) return;

    if (activeTab === "client") {
      console.log("client tab");
      setClients(data.users as ClientsData);
      setTotalPages(data.totalPages);
    } else if (activeTab === "vendor") {
      setVendors(data.users as VendorList);
      setTotalPages(data.totalPages);
    }
  }, [data, activeTab]);

  if (isLoading) {
    return <Spinner />;
  }

  const renderClientTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-center">Master Of Cerimonies</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients &&
          clients.map((client) => (
            <TableRow key={client.clientId}>
              <TableCell>
                {client.firstName + " " + (client?.lastName ?? "")}
              </TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
              <TableCell className="text-center">
                {client.masterOfCeremonies ? "Yes" : "No"}
              </TableCell>
              <TableCell className="text-center">{client.status}</TableCell>
              <TableCell className="text-center">
                {/* <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button> */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setUserToBlock(() => ({ type: "client", id: client._id }));
                    setIsConfirmationModalOpen(true);
                  }}
                >
                  {client.status === "active" ? "Block" : "UnBlock"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  const renderVendorTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendors &&
          vendors.map((vendor) => (
            <TableRow key={vendor._id}>
              <TableCell>
                {vendor.firstName + " " + (vendor?.lastName ?? "")}
              </TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>
                {vendor.category?.title ?? "Not in Category"}
              </TableCell>
              <TableCell>{vendor.phoneNumber}</TableCell>
              <TableCell className="text-center">
                {/* <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button> */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setUserToBlock(() => ({ type: "vendor", id: vendor._id }));
                    setIsConfirmationModalOpen(true);
                  }}
                >
                  {vendor.status === "active" ? "Block" : "UnBlock"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Card className="w-full">
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold mb-6">User Management</h1>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="client">Clients</TabsTrigger>
              <TabsTrigger value="vendor">Vendors</TabsTrigger>
            </TabsList>
            <div className="my-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={handleSearch}
                className="max-w-sm"
              />
            </div>
            <TabsContent value="client" className="overflow-x-auto">
              <ScrollArea className="h-[287px] w-full rounded-md border">
                {renderClientTable()}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="vendor" className="overflow-x-auto">
              <ScrollArea className="h-[287px] w-full rounded-md border">
                {clients && renderVendorTable()}
              </ScrollArea>
            </TabsContent>
          </Tabs>
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            onClose={() => setIsConfirmationModalOpen(false)}
            onConfirm={() => {
              confirmBlock();
              setUserToBlock(null);
            }}
            title="Confirm Action"
            message="Are you sure you want to perform this action?"
            confirmText="Yes, I'm sure"
            cancelText="No, cancel"
          />
        </div>
      </Card>
    </div>
  );
}
