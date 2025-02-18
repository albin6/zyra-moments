import React, { useEffect, useState } from "react";
import ServiceCards from "./ServiceCard";
import { ServicesHeader } from "./ServicesHeader";
import Pagination from "../Pagination";
import { useServiceQuery } from "@/hooks/service/useService";
import { getAllServices } from "@/services/vendor/service";
import { Spinner } from "../ui/spinner";

export interface Service {
  _id?: string;
  serviceTitle: string;
  serviceDescription: string;
  serviceDuration: number;
  servicePrice: number;
}

export const ServiceList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 1;

  const [services, setServices] = useState<Service[] | null>(null);

  const { data, isLoading } = useServiceQuery(getAllServices, page, limit);

  useEffect(() => {
    if (data) {
      setServices(data.services);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!services) {
    return null;
  }

  return (
    <div className="space-y-4 p-4">
      <ServicesHeader />
      {totalPages === 0 ? (
        <h1 className="text-center">No Services</h1>
      ) : (
        <>
          <ServiceCards services={services} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(page: number) => setPage(page)}
          />
        </>
      )}
    </div>
  );
};
