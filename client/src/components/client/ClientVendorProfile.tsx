import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  DollarSign,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useClientVendorProifileQuery } from "@/hooks/client/useClientVendorProfile";
import {
  getVendorProfileDetailsForClientSide,
  VendorProfileData,
} from "@/services/client/clientVendorProfileService";
import { Spinner } from "../ui/spinner";
import Pagination from "../Pagination";
import { Button } from "../ui/button";
import { ClientOneToOneChatPage } from "@/pages/client/ClientOneToOneChatPage";
import ClientReviewList from "../reviews/ClientReviewList";

export default function VendorProfile() {
  const { vendorId } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  // pagination things!!!!!!!!
  const [currentServicePage, setCurrentServicePage] = useState(1);
  const [currentWorkSamplePage, setCurrentWorkSamplePage] = useState(1);

  const [totalServicePages, setTotalServicePages] = useState(0);
  const [totalWorkSamplePages, setTotalWorkSamplePages] = useState(0);

  const limit = 1;

  const [vendorData, setVendorData] = useState<VendorProfileData | null>(null);

  if (!vendorId) {
    return null;
  }

  const { data, isLoading } = useClientVendorProifileQuery(
    getVendorProfileDetailsForClientSide,
    vendorId,
    currentServicePage,
    currentWorkSamplePage,
    limit
  );

  useEffect(() => {
    if (data) {
      setVendorData(data.vendorData);
      setCurrentServicePage(data.currentServicePage);
      setTotalServicePages(data.totalServicePages);
      setCurrentWorkSamplePage(data.currentWorkSamplePage);
      setTotalWorkSamplePages(data.totalWorkSamplePage);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!vendorData) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xVendorProfileResponsel mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={vendorData.profileImage}
                alt={`${vendorData.firstName} ${vendorData.lastName}`}
              />
              <AvatarFallback>
                {vendorData.firstName[0]}
                {vendorData.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl">
                {vendorData.firstName} {vendorData.lastName}
              </CardTitle>
              <p className="text-muted-foreground">
                {vendorData?.category?.title}
              </p>
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>
                  {vendorData?.averageRating || 5} (
                  {vendorData?.totalReviews || 0} reviews)
                </span>
              </div>
            </div>
          </div>
          <div>
            {/* {vendorData.canChat && (
              <Button onClick={() => setShowChat(true)} className="mr-2">
                Message
              </Button>
            )} */}
            <Button onClick={() => navigate(`/booking/${vendorId}`)}>
              Book Now
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Details</TabsTrigger>
              <TabsTrigger value="worksamples">Work Samples</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-4">
              <div className="space-y-4">
                <p>{vendorData.bio}</p>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{vendorData?.place || "Not added yet"}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{vendorData.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{vendorData.email}</span>
                </div>
              </div>
              <ClientReviewList vendorId={vendorData._id} />
            </TabsContent>
            <TabsContent value="worksamples" className="mt-4">
              <div className="grid gap-6">
                {vendorData.workSamples.length === 0 ? (
                  <h1 className="text-center">No Worksample added</h1>
                ) : (
                  vendorData.workSamples?.map((sample, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="text-lg font-semibold">{sample.title}</h3>
                      <p className="text-muted-foreground">
                        {sample.description}
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {sample.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image || "/placeholder.svg"}
                            alt={`${sample.title} sample ${imgIndex + 1}`}
                            className="rounded-md w-80 h-56 object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
                {vendorData.workSamples.length !== 0 && (
                  <Pagination
                    currentPage={currentWorkSamplePage}
                    onPageChange={(value) => setCurrentWorkSamplePage(value)}
                    totalPages={totalWorkSamplePages}
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent value="services" className="mt-4">
              {vendorData.services.length === 0 ? (
                <h1 className="text-center">No Service Provided</h1>
              ) : (
                vendorData.services.map((service, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      {service.serviceTitle}
                    </h3>
                    <p>{service.serviceDescription}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          Experience: {service.yearsOfExperience} years
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Duration: {service.serviceDuration} hours</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>Price: ${service.servicePrice}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>
                          Additional hour: ${service.additionalHoursPrice}
                        </span>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Available Dates:</h4>
                      {service?.availableDates &&
                        service.availableDates.map((date, dateIndex) => (
                          <div key={dateIndex} className="mb-2">
                            <Badge>{date.date}</Badge>
                            <div className="ml-4 mt-1">
                              {date.timeSlots.map((slot, slotIndex) => (
                                <span key={slotIndex} className="text-sm">
                                  {slot.startTime} - {slot.endTime} (Capacity:{" "}
                                  {slot.capacity})
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">
                        Cancellation Policy:
                      </h4>
                      <ul className="list-disc list-inside">
                        {service?.cancellationPolicies &&
                          service.cancellationPolicies.map(
                            (policy, policyIndex) => (
                              <li key={policyIndex}>{policy}</li>
                            )
                          )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Terms and Conditions:
                      </h4>
                      <ul className="list-disc list-inside">
                        {service?.termsAndConditions &&
                          service.termsAndConditions.map((term, termIndex) => (
                            <li key={termIndex}>{term}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ))
              )}
              {vendorData.services.length !== 0 && (
                <Pagination
                  currentPage={currentServicePage}
                  onPageChange={(value) => setCurrentServicePage(value)}
                  totalPages={totalServicePages}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {showChat && (
        <div className="mt-4 border rounded-lg">
          <ClientOneToOneChatPage
            vendorId={vendorId}
            onClose={() => setShowChat(false)}
          />
        </div>
      )}
    </div>
  );
}
