import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Todo from '../../../models/Todo';

export async function GET() {
  await dbConnect();
  const todos = await Todo.find({});
  return NextResponse.json(todos);
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const todo = await Todo.create(data);
  return NextResponse.json(todo, { status: 201 });
}