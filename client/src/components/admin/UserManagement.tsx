import type React from "react";
import { useState } from "react";
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

// Mock data (replace with actual data fetching logic)
const mockClients = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: 1234567,
    status: "active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: 1234567,
    status: "active",
  },
  // ... more clients
];

const mockVendors = [
  { id: 1, name: "Catering Co.", service: "Catering", rating: 4.5 },
  {
    id: 2,
    name: "Sound Systems Inc.",
    service: "Audio Equipment",
    rating: 4.2,
  },
  // ... more vendors
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("clients");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockClients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>{client.status}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2">
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Delete
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
          <TableHead>Rating</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockVendors.map((vendor) => (
          <TableRow key={vendor.id}>
            <TableCell>{vendor.name}</TableCell>
            <TableCell>{vendor.service}</TableCell>
            <TableCell>{vendor.rating}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2">
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Delete
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
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
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
              {activeTab === "clients" ? (
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
        <TabsContent value="clients" className="overflow-x-auto">
          {renderClientTable()}
        </TabsContent>
        <TabsContent value="vendors" className="overflow-x-auto">
          {renderVendorTable()}
        </TabsContent>
      </Tabs>
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={5} // Replace with actual total pages calculation
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
