const { z } = require("zod");

const taskSchema = z.object({
  taskCategory: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Task Category can't be empty")
    .max(50, "Task Category can't be longer than 50 characters"),
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
    .max(1000, "Description can't be longer than 1000 characters"),
  dueDate: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Due Date can't be empty")
    .regex(
      /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/gm,
      "Invalid Date Format. (YYYY-MM-DD)"
    )
    .refine(
      ({ dueDate }) =>
        !new Date(dueDate) <= new Date(new Date().toJSON().slice(0, 10)),
      {
        message: "Due Date can't be in past.",
        path: ["dueDate"],
      }
    ),
  dueTime: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Due Time can't be empty")
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/gm,
      "Invalid Time Format. (HH:MM)"
    ),
  assigneeName: z
    .string({
      invalid_type_error: "At least one Assignee Name is required",
      required_error: "This is Required",
    })
    .array()
    .min(1, "At least one Assignee Name is required")
    .refine(
      (data) => {
        let status = true;
        data.map((name) => {
          if (name.length === 0) {
            status = false;
          }
          return name;
        });
        return status;
      },
      {
        message:
          "At least one Assignee Name is required or Name can't be empty",
        path: ["assigneeName"],
      }
    ),
  priorityLevel: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Priority level can't be empty"),
  taskDocument: z
    .any()
    .refine(
      (file) => {
        let status = true;
        Array.from(file).map((file) => {
          const validMimeTypes = /jpeg|jpg|png|pdf|mp4/;
          if (!validMimeTypes.test(file?.type)) {
            status = false;
          }

          if (file?.size > 5000000) {
            status = false;
          }

          return file;
        });
        return status;
      },
      {
        message: "Invalid File Format. (jpeg, jpg, png, pdf, mp4)",
        path: ["taskDocument"],
      }
    )
    .refine(
      (file) => {
        let status = true;
        Array.from(file).map((file) => {
          if (file?.size > 5000000) {
            status = false;
          }

          return file;
        });
        return status;
      },
      {
        message: "Max File Size is 5MB",
        path: ["taskDocument"],
      }
    )
    .optional(),
});

const updateTaskSchema = taskSchema
  .omit({
    assigneeName: true,
  })
  .extend({
    taskStatus: z
      .string({
        required_error: "This is Required",
      })
      .trim()
      .min(1, "Task Status can't be empty"),
  });

const taskCommentSchema = z.object({
  taskId: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Task Id can't be empty"),
  comment: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Comment can't be empty")
    .max(2000, "Comment can't be longer than 2000 characters"),
});

module.exports = { taskSchema, updateTaskSchema, taskCommentSchema };
