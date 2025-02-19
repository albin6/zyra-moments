import {
  VendorForListing,
  VendorListing,
} from "@/components/client/VendorListing";
import { Spinner } from "@/components/ui/spinner";
import { useVendorsListing } from "@/hooks/vendors-listing/useVendorsListing";
import { getVendorListingBasedOnCategory } from "@/services/vendor-listing/vendorListing";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ClientVendorListing() {
  const { categoryId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [vendors, setVendors] = useState<VendorForListing[] | null>(null);
  const limit = 1;

  if (!categoryId) {
    return null;
  }

  const { data, isLoading } = useVendorsListing(
    getVendorListingBasedOnCategory,
    page,
    limit,
    searchTerm,
    sortBy,
    categoryId
  );

  useEffect(() => {
    if (data) {
      setVendors(data.vendors);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!vendors) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-center">
        <VendorListing
          limit={limit}
          page={page}
          setPage={setPage}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSortBy={setSortBy}
          sortBy={sortBy}
          totalPages={totalPages}
          vendors={vendors}
        />
      </div>
    </motion.div>
  );
}
