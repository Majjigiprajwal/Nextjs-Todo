import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Todo from '../../../../models/Todo';

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;
  const data = await request.json();
  const todo = await Todo.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  return NextResponse.json(todo);
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params;
  const deletedTodo = await Todo.deleteOne({ _id: id });
  if (!deletedTodo) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: {} });
}