const { z } = require("zod");

const projectSchema = z.object({
  title: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Title can't be empty")
    .max(50, "Title can't be longer than 50 characters"),
  description: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Description can't be empty")
    .max(255, "Description can't be longer than 255 characters"),
});

module.exports = { projectSchema };
