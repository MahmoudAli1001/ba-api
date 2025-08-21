import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ممكن يكون LaunchedProject أو FeasibilityStudy
  serviceType: { type: String, enum: ["LaunchedProject", "FeasibilityStudy"], required: true },
  amount: { type: Number, required: true },
  stripeSessionId: { type: String, required: true },
  stripeSubscriptionId: { type: String },
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
