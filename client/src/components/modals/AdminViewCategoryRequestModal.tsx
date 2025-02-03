import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CategoryRequest {
  id: number;
  vendorName: string;
  categoryName: string;
  status: "pending" | "approved" | "rejected";
}

const mockCategoryRequests: CategoryRequest[] = [
  {
    id: 1,
    vendorName: "TechConf Inc.",
    categoryName: "Tech Conferences",
    status: "pending",
  },
  {
    id: 2,
    vendorName: "GreenEvents",
    categoryName: "Eco-friendly Workshops",
    status: "pending",
  },
  {
    id: 3,
    vendorName: "MusicFest Organizers",
    categoryName: "Music Festivals",
    status: "approved",
  },
  {
    id: 4,
    vendorName: "SportsMeet",
    categoryName: "Sports Tournaments",
    status: "rejected",
  },
  {
    id: 5,
    vendorName: "ArtExpo",
    categoryName: "Art Exhibitions",
    status: "pending",
  },
];

const ViewCatgoryRequestModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">View Category Requests</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Category Requests</DialogTitle>
          <DialogDescription>
            Review and manage category requests from vendors.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCategoryRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.vendorName}
                  </TableCell>
                  <TableCell>{request.categoryName}</TableCell>
                  <TableCell className="text-center">
                    {request.status}
                  </TableCell>
                  <TableCell className="flex justify-center">
                    {["approved", "rejected"].includes(request.status) ? (
                      <Button variant={"ghost"} size="sm">
                        Acknowledged
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" size="sm" className="mr-2">
                          Approve
                        </Button>
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <DialogFooter>
          <Button type="button">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCatgoryRequestModal;
