import mongoose, { Schema, Document, Model } from 'mongoose';

interface IExpense extends Document {
  title: string;
  amount: number;
  shortDescription: string;
  addedDate: Date;
  updatedDate: Date;
  spendingDate?: string;
  user_id: number;
}

const ExpenseSchema: Schema<IExpense> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  spendingDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0],
  },
  user_id: {
    type: Number,
    default: () => Math.floor(10000 + Math.random() * 90000),
  },
});

// Update updatedDate before saving
ExpenseSchema.pre<IExpense>('save', function (next) {
  this.updatedDate = new Date();
  next();
});

const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);
export default Expense;
