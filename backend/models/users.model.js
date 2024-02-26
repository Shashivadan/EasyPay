import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 30,
    unique: true,
    lowercase: true,
  },
  lastname: {
    required: true,
    type: String,
    trim: true,
  },
  firstname: {
    trim: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    minLength: 3,
    maxLength: 30,
    type: String,
  },
});

const Users = mongoose.models.users || mongoose.model("users", userSchema);

export default Users;
