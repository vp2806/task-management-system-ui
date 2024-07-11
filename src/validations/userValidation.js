const { z } = require("zod");

const userSchema = z.object({
  firstName: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "First Name can't be empty")
    .regex(/^[a-zA-Z]+$/, "Name must contains alphabets only"),
  lastName: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Last Name can't be empty")
    .regex(/^[a-zA-Z]+$/, "Name must contains alphabets only"),
  email: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Email can't be empty")
    .email("Invalid Email"),
  dob: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "DOB can't be empty")
    .regex(
      /[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/gm,
      "Invalid Date Format. (YYYY-MM-DD)"
    ),
  contactNumber: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(1, "Contact Number can't be empty")
    .regex(/^\d{10}$/gm, "Invalid Contact Number"),
});

const setPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "This is Required",
      })
      .trim()
      .min(8, "Password must be at least 8 characters."),
    confirmPassword: z
      .string({
        required_error: "This is Required",
      })
      .trim()
      .min(8, "Password must be at least 8 characters."),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password is not match.",
        path: ["confirmPassword"],
      });
    }
  });

const emailSchema = userSchema.pick({ email: true });

const loginSchema = emailSchema.extend({
  password: z
    .string({
      required_error: "This is Required",
    })
    .trim()
    .min(8, "Password must be at least 8 characters."),
});

module.exports = {
  userSchema,
  setPasswordSchema,
  emailSchema,
  loginSchema,
};
