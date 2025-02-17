import * as Yup from "yup";

export const serviceValidationSchema = Yup.object({
  serviceTitle: Yup.string().required("Required"),
  yearsOfExperience: Yup.number().positive().integer().required("Required"),
  availableDates: Yup.array()
    .of(
      Yup.object({
        date: Yup.string().required("Date is required"),
        timeSlots: Yup.array()
          .of(
            Yup.object({
              startTime: Yup.string().required("Start time is required"),
              endTime: Yup.string().required("End time is required"),
              capacity: Yup.number()
                .positive()
                .integer()
                .required("Capacity is required"),
            })
          )
          .min(1, "At least one time slot is required"),
      })
    )
    .min(1, "At least one date is required"),
  serviceDescription: Yup.string().required("Required"),
  serviceDuration: Yup.number().positive().required("Required"),
  servicePrice: Yup.number().positive().required("Required"),
  additionalHoursPrice: Yup.number().positive().required("Required"),
  cancellationPolicies: Yup.array()
    .of(Yup.string())
    .min(1, "At least one policy is required"),
  termsAndConditions: Yup.array()
    .of(Yup.string())
    .min(1, "At least one term is required"),
});
