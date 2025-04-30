"use server"
import { sendVerificationEmail } from "@/lib/mailer";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
    const { email, password, name, role } = values;
  
    try {
      await connectDB();
  
      // Check if user already exists
      const userFound = await User.findOne({ email });
      if (userFound) {
        return { error: "Email already exists!" };
      }
  
      // Validate password
      const passwordErrors = validatePassword(password, name, email);
      if (passwordErrors.length > 0) {
        return { error: passwordErrors.join(" ") };
      }
  
      // Create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = crypto.randomUUID();
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role,
        verified: false,
        emailToken: verificationToken,
      });
  
      console.log("Token saved:", verificationToken);
      const savedUser = await user.save();
  
      await sendVerificationEmail(savedUser.email, verificationToken);
  
      return { success: true };
    } catch (e) {
      console.error(e);
      return { error: "Server error. Please try again." };
    }
  };
function validatePassword(password: string, name: string, email: string): string[] {
    const errors: string[] = [];
  
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[-!@#$%^&*()_+?.]/.test(password)) {
      errors.push("Password must contain at least one special character (-!@#$%^&*()_+?.).");
    }
  
    const bannedWords = ["password", "qwerty", "123", "1234", "12345", "123456"];
    const lowerPassword = password.toLowerCase();
  
    // Prevent parts of name/email appearing in password
    const nameParts = name.split(/\s+/).map(part => part.toLowerCase());
    const emailParts = email.split(/[@.]/).map(part => part.toLowerCase());
  
    const bannedParts = [...nameParts, ...emailParts, ...bannedWords];
  
    for (const part of bannedParts) {
      if (part && lowerPassword.includes(part)) {
        errors.push("Password cannot contain parts of your name, email, or common terms like 'password', 'qwerty', or simple sequences like '123'.");
        break;
      }
    }
  
    return errors;
  }