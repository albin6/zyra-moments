import { Spinner } from "@/components/ui/spinner";
import { EditableServiceForm } from "@/components/vendor/EditableServiceForm";
import {
  useServiceMutation,
  useSingleServiceQuery,
} from "@/hooks/service/useService";
import { getServiceById, updateServiceById } from "@/services/vendor/service";
import { Service } from "@/types/Service";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function VendorEditService() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [service, setService] = useState<Service | null>(null);

  if (!serviceId) {
    return <Spinner />;
  }

  const { data, isLoading } = useSingleServiceQuery(getServiceById, serviceId);

  const { mutate: updateService } = useServiceMutation(updateServiceById);

  useEffect(() => {
    if (data) {
      setService(data.service);
    }
  }, [data]);

  const handleSubmit = (service: Service) => {
    console.log(service);
    updateService(
      { id: serviceId, service },
      {
        onSuccess: (data) => {
          navigate("/vendor/services");
          toast.success(data.message);
        },
        onError: (error: any) => toast.error(error.response.data.message),
      }
    );
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
