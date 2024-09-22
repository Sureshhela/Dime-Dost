
import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/dbConnect';

export const GET = async() => {
  try {
    await dbConnect(); // Call the dbConnect function to ensure connection

    return NextResponse.json({ status: 200, message: 'Database Connected' })
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ status: 500, message: 'Database Connection failed' })
  }
}
