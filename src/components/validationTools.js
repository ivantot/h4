import * as yup from "yup";
import { object, array, string, number } from "yup";

import { DateTime } from "luxon";

export const bookYupSchema = yup.object().shape({
  id: yup.mixed().nullable(true).default(null),
  authors: yup
    .array()
    .of(yup.string().ensure().required("Author name required."))
    .typeError("Author name required."),
  title: yup.string().ensure().required("Book title required"),
  publishDate: yup
    .date()
    .max(DateTime.now(), "This book is not from the future")
    .typeError("Must be a date."),

  // rating: yup
  //   .number()
  //   .test(
  //     "maxDigitsAfterDecimal",
  //     "Rating must have maximum 2 digits after the decimal point.",
  //     (rating) => /^\d+(\.\d{1,2})?$/.test(rating)
  //   )
  //   .min(0, "Rating must be a value between 0 and 5, decimals allowed.")
  //   .max(5, "Rating must be a value between 0 and 5, decimals allowed."),
  pages: yup
    .number()
    .required("Number of pages required.")
    .typeError("Pages must be a positive integer.")
    .min(1, "A book must have at least one page."),

  // available: yup.boolean("True or false"),
  isbn: yup
    .number()
    .typeError("Must be a number.")
    .test(
      "lengthOfISBN",
      "ISBN must be a 12 number long integer value.",
      (num) => /^(\d{12})$/.test(num)
    ),
  // genre: yup.string(),
});

export const toStandardTime = (time) => {
  return time.toFormat("y-MM-dd");
};
