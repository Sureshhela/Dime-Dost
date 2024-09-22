import dbConnect from "@/app/utils/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import Expense from "@/app/config/expenseSchema";
export const POST = async(req: NextRequest)=>{
    try {
        await dbConnect();
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const amount = Number(formData.get('amount'));
        const shortDescription = formData.get('short-description') as string;
        const spendingDate = formData.get('spending-date') ? (formData.get('spending-date') as string) : undefined; // Optional field
        const newExpense = new Expense({
            title,
            amount,
            shortDescription,
            spendingDate,
          });
        await newExpense.save();
        return NextResponse.json({ status: 200, message: 'Expense added successfully!', expense: newExpense });
    } catch (error) {
        console.error('Error adding expense:', error);
        return NextResponse.json({ status: 500, message: 'adding failed' });
    }
}

export const PATCH = async(req: NextRequest) => {
    try {
        await dbConnect();
        const formData = await req.formData();
        const user_id = formData.get('user_id') as string;
        if (!user_id) {
            return NextResponse.json({ status: 400, message: 'user_id is required' });
        }
        const updateData: Partial<any> = {};
        const title = formData.get('title') as string | null;
        const amount = formData.get('amount') as string | null;
        const shortDescription = formData.get('short-description') as string | null;
        const spendingDate = formData.get('spending-date') as string | null;

        if (title) updateData.title = title;
        if (amount) updateData.amount = parseFloat(amount); // Convert to number if present
        if (shortDescription) updateData.shortDescription = shortDescription;
        if (spendingDate) updateData.spendingDate = spendingDate;

        const updatedExpense = await Expense.findOneAndUpdate(
            { user_id },
            {
              ...updateData,
              updatedDate: new Date(),
            },
            { new: true }
        );
        if (!updatedExpense) {
            return NextResponse.json({ status: 404, message: 'Expense not found' });
        }
        return NextResponse.json({
            status: 200,
            message: 'Expense updated successfully!',
            expense: updatedExpense,
        });

    } catch (error) {
        console.error('Error editing expense:', error);
        return NextResponse.json({ status: 500, message: 'updating failed' });
    }
}

export const GET = async (req: NextRequest) => {
    try {
      await dbConnect();
      const { searchParams } = new URL(req.url);
      const user_id = searchParams.get('user_id');
  
      if (!user_id) {
        return NextResponse.json({ status: 400, message: 'user_id is required' });
      }

      const expense = await Expense.findOne({ user_id });
  
      if (!expense) {
        return NextResponse.json({ status: 404, message: 'Expense not found' });
      }
  
      return NextResponse.json({
        status: 200,
        message: 'Expense retrieved successfully!',
        expense,
      });
    } catch (error) {
      console.error('Error retrieving expense:', error);
      return NextResponse.json({ status: 500, message: 'Retrieving expense failed' });
    }
  };

export const DELETE = async (req: NextRequest) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
      return NextResponse.json({ status: 400, message: 'user_id is required' });
    }

    const deletedExpense = await Expense.findOneAndDelete({ user_id });

    if (!deletedExpense) {
      return NextResponse.json({ status: 404, message: 'Expense not found' });
    }

    return NextResponse.json({
      status: 200,
      message: 'Expense deleted successfully!',
      expense: deletedExpense,
    });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return NextResponse.json({ status: 500, message: 'Deleting expense failed' });
  }
};
