import { Spinner } from "@/components/ui/spinner";
import { WorkSampleDisplay } from "@/components/vendor/WorkSampleDisplay";
import { WorkSampleHeader } from "@/components/vendor/WorkSampleHeader";
import { useSingleWorkSampleQuery } from "@/hooks/work-sample/useWorkSample";
import { getWorkSampleById } from "@/services/vendor/vendorService";
import { WorkSample } from "@/types/WorkSample";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VendorWorkSampleDisplay() {
  const { workSampleId } = useParams();
  const [workSample, setWorkSample] = useState<WorkSample | null>(null);

  if (!workSampleId) return <Spinner />;

  const { data, isLoading } = useSingleWorkSampleQuery(
    getWorkSampleById,
    workSampleId
  );

  useEffect(() => {
    if (data) {
      setWorkSample(data.workSample);
    }
  }, [workSampleId, data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!workSample) {
    return null;
  }

  return (
    <div className="space-y-4 p-4">
      <WorkSampleHeader />
      <WorkSampleDisplay workSample={workSample} />
    </div>
  );
}

export default VendorWorkSampleDisplay;
