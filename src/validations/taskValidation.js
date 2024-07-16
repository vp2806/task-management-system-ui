const { z } = require("zod");

const taskSchema = z.object({
  projectId: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Project Id can't be empty")
    .max(36, "Project Id can't be longer than 36 characters"),
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
        new Date(dueDate) < new Date(new Date().toJSON().slice(0, 10)),
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
      required_error: "This is Required",
    })
    .array()
    .min(1, "At least one Assignee Name is required"),
  priorityLevel: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Priority level can't be empty"),
});

const updateTaskSchema = taskSchema.omit({ assigneeName: true });

// const updateTaskSchema = z
//   .object({
//     projectId: z
//       .string({
//         required_error: "This is Required",
//       })
//       .trim()
//       .min(1, "Project Id can't be empty")
//       .max(36, "Project Id can't be longer than 36 characters"),
//     taskCategory: z
//       .string({
//         required_error: "This is Required",
//       })
//       .trim()
//       .min(1, "Task Category can't be empty")
//       .max(50, "Task Category can't be longer than 50 characters"),
//     title: z
//       .string({
//         required_error: "This is Required",
//       })
//       .trim()
//       .min(1, "Title can't be empty")
//       .max(50, "Title can't be longer than 50 characters"),
//     description: z
//       .string({
//         required_error: "This is Required",
//       })
//       .trim()
//       .min(1, "Description can't be empty")
//       .max(1000, "Description can't be longer than 1000 characters"),
//     dueDate: z
//       .string({
//         required_error: "This is Required",
//       })
//       .trim()
//       .min(1, "Due Date can't be empty")
//       .regex(
//         /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/gm,
//         "Invalid Date Format. (YYYY-MM-DD)"
//       ),
//     dueTime: z
//       .string({
//         required_error: "This is Required",
//       })
//       .trim()
//       .min(1, "Due Time can't be empty")
//       .regex(
//         /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/gm,
//         "Invalid Time Format. (HH:MM)"
//       ),
//     priorityLevel: z
//       .string({
//         required_error: "This is Required",
//       })
//       .trim()
//       .min(1, "Priority level can't be empty"),
//   })
//   .superRefine(({ dueDate }, ctx) => {
//     if (new Date(dueDate) < new Date(new Date().toJSON().slice(0, 10))) {
//       ctx.addIssue({
//         code: "custom",
//         message: "Due Date can't be in past.",
//         path: ["dueDate"],
//       });
//     }
//   });

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
