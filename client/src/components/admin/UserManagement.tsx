import type React from "react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  category: string;
  categoryRequest?: boolean;
}

export type VendorList = Vendor[];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("client");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const [clients, setClients] = useState<ClientsData>();
  const [vendors, setVendors] = useState<VendorList>();

  // Pagination state (you'd implement actual pagination logic)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  const renderClientTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients &&
          clients.map((client) => (
            <TableRow key={client.clientId}>
              <TableCell>{client.firstName + client.lastName}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phoneNumber}</TableCell>
              <TableCell>{client.status}</TableCell>
              <TableCell className="text-center">
                {/* <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button> */}
                <Button variant="destructive" size="sm">
                  Block
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
          <TableHead>Service</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendors &&
          vendors.map((vendor) => (
            <TableRow key={vendor._id}>
              <TableCell>{vendor.firstName + vendor.lastName}</TableCell>
              <TableCell>{vendor.category}</TableCell>
              <TableCell>{vendor.phoneNumber}</TableCell>
              <TableCell className="text-center">
                {/* <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button> */}
                <Button variant="destructive" size="sm">
                  Block
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
          <Select value={filter} onValueChange={handleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {activeTab === "client" ? (
                <>
                  <SelectItem value="highEvents">High Events</SelectItem>
                  <SelectItem value="lowEvents">Low Events</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="highRating">High Rating</SelectItem>
                  <SelectItem value="lowRating">Low Rating</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        <TabsContent value="client" className="overflow-x-auto">
          {renderClientTable()}
        </TabsContent>
        <TabsContent value="vendor" className="overflow-x-auto">
          {clients && renderVendorTable()}
        </TabsContent>
      </Tabs>
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={1} // Replace with actual total pages calculation
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
