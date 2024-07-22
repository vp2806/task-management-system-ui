const { z } = require("zod");

const userTaskAssigneeSchema = z.object({
  assigneeFullName: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Task assignee name can't be empty")
    .max(100, "Task assignee name can't be longer than 100 characters"),
});

module.exports = { userTaskAssigneeSchema };
