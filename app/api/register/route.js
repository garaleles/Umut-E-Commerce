import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/user';
import bcrypt from 'bcrypt';

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const { name, email, password } = body;
    await new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    }).save();

    return NextResponse.json({ message: 'Kayıt başarılı.' }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
