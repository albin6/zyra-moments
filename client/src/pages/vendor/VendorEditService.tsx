import { Spinner } from "@/components/ui/spinner";
import { EditableServiceForm } from "@/components/vendor/EditableServiceForm";
import { useSingleServiceQuery } from "@/hooks/service/useService";
import { getServiceById } from "@/services/vendor/service";
import { Service } from "@/types/Service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VendorEditService() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [service, setService] = useState<Service | null>(null);

  if (!serviceId) {
    return <Spinner />;
  }

  const { data, isLoading } = useSingleServiceQuery(getServiceById, serviceId);

  useEffect(() => {
    if (data) {
      setService(data.service);
    }
  }, [data]);

  const handleSubmit = (service: Service) => {
    console.log(service);
  };

  const handleCancel = () => {
    navigate("/vendor/services");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!service) {
    return null;
  }
  return (
    <EditableServiceForm
      initialValues={service}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}

export default VendorEditService;
