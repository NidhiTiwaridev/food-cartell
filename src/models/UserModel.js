export class UserModel {
  static getQuote() {
    return {
      text: "Good food is the foundation of genuine happiness.",
      author: "Auguste Escoffier"
    };
  }

  static validateLogin(username, password) {
    if (username.trim() === "admin" && password === "admin123") {
      return { success: true, user: { name: "Admin Manager", role: "Manager" } };
    }
    if (username.trim() !== "" && password.length >= 4) {
      return { success: true, user: { name: username, role: "Staff" } };
    }
    return { success: false, message: "Invalid credentials. Try 'admin' and 'admin123'" };
  }
}