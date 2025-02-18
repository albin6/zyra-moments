import React from "react";
import { useFormik } from "formik";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { serviceValidationSchema } from "@/utils/service.validator";
import { ServicesHeader } from "./ServicesHeader";
import { DateSlot, Service } from "@/types/Service";

// interface TimeSlot {
//   startTime: string;
//   endTime: string;
//   capacity: number;
// }

// interface DateSlot {
//   date: string;
//   timeSlots: TimeSlot[];
// }

// export interface ServiceFormValues {
//   _id
//   serviceTitle: string;
//   yearsOfExperience: string;
//   availableDates: DateSlot[];
//   serviceDescription: string;
//   serviceDuration: string;
//   servicePrice: string;
//   additionalHoursPrice: string;
//   cancellationPolicies: string[];
//   termsAndConditions: string[];
// }

interface EditableServiceFormProps {
  initialValues?: Service;
  onSubmit: (values: Service) => void;
  onCancel?: () => void;
}

const defaultInitialValues: Service = {
  serviceTitle: "",
  yearsOfExperience: 0,
  availableDates: [] as DateSlot[],
  serviceDescription: "",
  serviceDuration: 0,
  servicePrice: 0,
  additionalHoursPrice: 0,
  cancellationPolicies: [""],
  termsAndConditions: [""],
};

export const EditableServiceForm: React.FC<EditableServiceFormProps> = ({
  initialValues = defaultInitialValues,
  onSubmit,
  onCancel,
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: serviceValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const addDateSlot = () => {
    formik.setFieldValue("availableDates", [
      ...formik.values.availableDates,
      { date: "", timeSlots: [{ startTime: "", endTime: "", capacity: 0 }] },
    ]);
  };

  const removeDateSlot = (dateIndex: number) => {
    const newAvailableDates = formik.values.availableDates.filter(
      (_, index) => index !== dateIndex
    );
    formik.setFieldValue("availableDates", newAvailableDates);
  };

  const addTimeSlot = (dateIndex: number) => {
    const newAvailableDates = [...formik.values.availableDates];
    newAvailableDates[dateIndex].timeSlots.push({
      startTime: "",
      endTime: "",
      capacity: 0,
    });
    formik.setFieldValue("availableDates", newAvailableDates);
  };

  const removeTimeSlot = (dateIndex: number, timeIndex: number) => {
    const newAvailableDates = [...formik.values.availableDates];
    newAvailableDates[dateIndex].timeSlots = newAvailableDates[
      dateIndex
    ].timeSlots.filter((_, index) => index !== timeIndex);
    formik.setFieldValue("availableDates", newAvailableDates);
  };

  const addPolicy = (field: "cancellationPolicies" | "termsAndConditions") => {
    formik.setFieldValue(field, [...formik.values[field], ""]);
  };

  return (
    <div>
      <ServicesHeader />
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-6 p-4 max-w-2xl mx-auto"
      >
        <div>
          <Label htmlFor="serviceTitle">Service Title</Label>
          <Input
            id="serviceTitle"
            name="serviceTitle"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serviceTitle}
          />
          {formik.touched.serviceTitle && formik.errors.serviceTitle ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.serviceTitle}
            </div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Input
            id="yearsOfExperience"
            name="yearsOfExperience"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.yearsOfExperience}
          />
          {formik.touched.yearsOfExperience &&
          formik.errors.yearsOfExperience ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.yearsOfExperience}
            </div>
          ) : null}
        </div>

        <div>
          <Label>Available Dates and Capacity</Label>
          {formik.values.availableDates.map((dateSlot, dateIndex) => (
            <div
              key={dateIndex}
              className="mt-4 p-4 border rounded-md relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeDateSlot(dateIndex)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Input
                type="date"
                value={dateSlot.date}
                onChange={(e) => {
                  const newAvailableDates = [...formik.values.availableDates];
                  newAvailableDates[dateIndex].date = e.target.value;
                  formik.setFieldValue("availableDates", newAvailableDates);
                }}
                className="mb-2"
              />
              {dateSlot.timeSlots.map((timeSlot, timeIndex) => (
                <div
                  key={timeIndex}
                  className="flex flex-wrap items-center space-x-2 mt-2 relative"
                >
                  <Input
                    type="time"
                    value={timeSlot.startTime}
                    onChange={(e) => {
                      const newAvailableDates = [
                        ...formik.values.availableDates,
                      ];
                      newAvailableDates[dateIndex].timeSlots[
                        timeIndex
                      ].startTime = e.target.value;
                      formik.setFieldValue("availableDates", newAvailableDates);
                    }}
                    className="w-full sm:w-auto mb-2 sm:mb-0"
                  />
                  <Input
                    type="time"
                    value={timeSlot.endTime}
                    onChange={(e) => {
                      const newAvailableDates = [
                        ...formik.values.availableDates,
                      ];
                      newAvailableDates[dateIndex].timeSlots[
                        timeIndex
                      ].endTime = e.target.value;
                      formik.setFieldValue("availableDates", newAvailableDates);
                    }}
                    className="w-full sm:w-auto mb-2 sm:mb-0"
                  />
                  <Input
                    type="number"
                    placeholder="Capacity"
                    value={timeSlot.capacity}
                    onChange={(e) => {
                      const newAvailableDates = [
                        ...formik.values.availableDates,
                      ];
                      newAvailableDates[dateIndex].timeSlots[
                        timeIndex
                      ].capacity = parseInt(e.target.value) || 0;
                      formik.setFieldValue("availableDates", newAvailableDates);
                    }}
                    className="w-full sm:w-auto"
                  />
                  {dateSlot.timeSlots.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTimeSlot(dateIndex, timeIndex)}
                      className="mt-2 sm:mt-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() => addTimeSlot(dateIndex)}
                className="mt-2"
              >
                Add Time Slot
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addDateSlot} className="mt-2">
            Add Date
          </Button>
        </div>

        <div>
          <Label htmlFor="serviceDescription">Service Description</Label>
          <Textarea
            id="serviceDescription"
            name="serviceDescription"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serviceDescription}
          />
          {formik.touched.serviceDescription &&
          formik.errors.serviceDescription ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.serviceDescription}
            </div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="serviceDuration">Service Duration (hours)</Label>
          <Input
            id="serviceDuration"
            name="serviceDuration"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serviceDuration}
          />
          {formik.touched.serviceDuration && formik.errors.serviceDuration ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.serviceDuration}
            </div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="servicePrice">Service Price</Label>
          <Input
            id="servicePrice"
            name="servicePrice"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.servicePrice}
          />
          {formik.touched.servicePrice && formik.errors.servicePrice ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.servicePrice}
            </div>
          ) : null}
        </div>

        <div>
          <Label htmlFor="additionalHoursPrice">Additional Hours Price</Label>
          <Input
            id="additionalHoursPrice"
            name="additionalHoursPrice"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.additionalHoursPrice}
          />
          {formik.touched.additionalHoursPrice &&
          formik.errors.additionalHoursPrice ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.additionalHoursPrice}
            </div>
          ) : null}
        </div>

        <div>
          <Label>Cancellation Policies</Label>
          {formik.values.cancellationPolicies.map((policy, index) => (
            <div key={index} className="flex items-center mt-2">
              <Input
                value={policy}
                onChange={(e) => {
                  const newPolicies = [...formik.values.cancellationPolicies];
                  newPolicies[index] = e.target.value;
                  formik.setFieldValue("cancellationPolicies", newPolicies);
                }}
                className="flex-grow"
              />
              {formik.values.cancellationPolicies.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newPolicies =
                      formik.values.cancellationPolicies.filter(
                        (_, i) => i !== index
                      );
                    formik.setFieldValue("cancellationPolicies", newPolicies);
                  }}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={() => addPolicy("cancellationPolicies")}
            className="mt-2"
          >
            Add Policy
          </Button>
        </div>

        <div>
          <Label>Terms and Conditions</Label>
          {formik.values.termsAndConditions.map((term, index) => (
            <div key={index} className="flex items-center mt-2">
              <Input
                value={term}
                onChange={(e) => {
                  const newTerms = [...formik.values.termsAndConditions];
                  newTerms[index] = e.target.value;
                  formik.setFieldValue("termsAndConditions", newTerms);
                }}
                className="flex-grow"
              />
              {formik.values.termsAndConditions.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newTerms = formik.values.termsAndConditions.filter(
                      (_, i) => i !== index
                    );
                    formik.setFieldValue("termsAndConditions", newTerms);
                  }}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={() => addPolicy("termsAndConditions")}
            className="mt-2"
          >
            Add Term
          </Button>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="submit" className="w-full">
            Update Service
          </Button>
        </div>
      </form>
    </div>
  );
};
