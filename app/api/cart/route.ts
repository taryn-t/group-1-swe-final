import { NextRequest, NextResponse } from 'next/server';
import Cart from '@/models/Cart';
import { connectDB } from '@/lib/mongoose';
import Textbook from '@/models/Textbook';

export async function GET(req: NextRequest) {
    await connectDB();
  
    const user_id = req.nextUrl.searchParams.get('user_id');
  
    if (!user_id) {
      return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
    }
  
    const cart = await Cart.findOne({ user_id }).populate('textbooks');
  
    if (!cart) {
      return NextResponse.json({ message: 'Cart not found' }, { status: 404 });
    }
  
    // Fetch full textbook info
    const fullTextbooks = await Textbook.find({ _id: { $in: cart.textbooks } });
    
    return NextResponse.json({
      success: true,
      cart: {
        _id: cart._id,
        user_id: cart.user_id,
        textbooks: fullTextbooks, // enriched textbook data
      },
    });
  }
// POST: /api/cart
// body: { user_id: string, textbooks?: string[] }
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  try {
    const newCart = await Cart.create({
      user_id: body.user_id,
      textbooks: body.textbooks || [],
    });

    return NextResponse.json(newCart, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating cart', error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
    await connectDB();
    const { user_id, textbook_id } = await req.json();
  
    if (!user_id || !textbook_id) {
      return NextResponse.json(
        { message: 'user_id and textbook_id are required' },
        { status: 400 }
      );
    }
  
    try {
      // Check if cart exists
      const cart = await Cart.findOneAndUpdate(
        { user_id },
        { $addToSet: { textbooks: textbook_id } }, // prevents duplicates
        { new: true, upsert: true } // create if doesn't exist
      );
  
      return NextResponse.json({ success: true, cart });
    } catch (error) {
      return NextResponse.json(
        { message: 'Error updating cart', error },
        { status: 500 }
      );
    }
  }

// DELETE: /api/cart?user_id=123&textbook=abc123
export async function DELETE(req: NextRequest) {
  await connectDB();
  const user_id = req.nextUrl.searchParams.get('user_id');
  const textbook = req.nextUrl.searchParams.get('textbook');

  if (!user_id) {
    return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
  }

  if (textbook) {
    // Remove a single textbook from the array
    const cart = await Cart.findOneAndUpdate(
      { user_id },
      { $pull: { textbooks: textbook } },
      { new: true }
    );
    return NextResponse.json(cart || { message: 'Cart not found' });
  } else {
    // Delete the whole cart
    await Cart.findOneAndDelete({ user_id });
    return NextResponse.json({ message: 'Cart deleted' });
  }
}