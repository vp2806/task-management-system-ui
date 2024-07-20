const { z } = require("zod");

const taskCategorySchema = z.object({
  categoryName: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Task Category can't be empty")
    .max(50, "Task Category can't be longer than 50 characters"),
});

module.exports = { taskCategorySchema };
