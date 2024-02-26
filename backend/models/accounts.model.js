import mongoose from "mongoose";

const accountsSchema = mongoose.Schema({
  userId: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Accounts =
  mongoose.models.accounts || mongoose.model("accounts", accountsSchema);

export default Accounts;
