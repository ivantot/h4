import * as yup from "yup";

import { DateTime } from "luxon";

export const bookYupSchema = yup.object().shape({
  id: yup.mixed().nullable(true).default(null),
  authors: yup
    .array()
    .of(yup.string().ensure().required("Author name required."))
    .min(1, "At least one author, please.")
    .required()
    .typeError("Author name required."),
  title: yup.string().ensure().required("Book title required"),
  publishDate: yup
    .date()
    .max(DateTime.now(), "This book is not from the future")
    .typeError("Must be a date."),

  pages: yup
    .number()
    .required("Number of pages required.")
    .typeError("Pages must be a positive integer.")
    .min(1, "A book must have at least one page."),

  // available: yup.boolean("True or false"),
  // rating: yup.number().required("Rating required"),
  isbn: yup
    .mixed()
    .test(
      "lengthOfISBN",
      "ISBN must be a 12 number long integer value.",
      (num) => /^(\d{12})$/.test(num)
    )
    .typeError("Must be a number"),
  genre: yup.string().ensure().required("Genre required."),
});

export const toStandardTime = (time) => {
  return time.toFormat("y-MM-dd");
};
