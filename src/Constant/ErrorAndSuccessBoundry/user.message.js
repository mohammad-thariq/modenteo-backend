export const userNotificationMessage = {
  success: {
    register: "registration successful",
    login: "login successfully",
    update: "user updated successfully",
    delete: "user deleted successfully",
    passwordchange : "Password Changed Successfully",
  },
  error: {
    login: "invalid email or password",
    register: {
      type: "invalid type value. Must be one of:",
      email: "email is already taken",
    },
    passwordchangefailed : "Failed to change password",
    forgotpassword:{
      email :"Invalid Email"
    }
  },
};
