import { NextRequest, NextResponse } from 'next/server';
import Cart from '@/models/Cart';
import { connectDB } from '@/lib/mongoose';
import Textbook from '@/models/Textbook';
import Merchandise from '@/models/Merchandise';
import mongoose, { ObjectId, Types } from 'mongoose';
export async function GET(req: NextRequest) {
  await connectDB();

  const user_id = req.nextUrl.searchParams.get('user_id');

  if (!user_id) {
    return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
  }

  let cart = await Cart.findOne({ user_id }).populate('textbooks').populate('merchandise');
  if (!cart) {
    cart = await Cart.create({
      user_id: user_id,
      textbooks: [],
      merchandise: []
    });
    return NextResponse.json({
      success: true,
      cart,
    });
  }
  console.log(cart.merchandise)
  return NextResponse.json({
    success: true,
    cart: {
      _id: cart._id,
      user_id: cart.user_id,
      textbooks: cart.textbooks,   // populated already
      merchandise: cart.merchandise // populated already
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
      merchandise: body.mechandise || []
    });

    return NextResponse.json(newCart, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating cart', error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
    await connectDB();
    const { user_id, textbook_id, merch_id } = await req.json();
  
    if (!user_id) {
      return NextResponse.json(
        { message: 'user_id required' },
        { status: 400 }
      );
    }
    try {
      // Check if cart exists
      if(textbook_id){
        const cart = await Cart.findOneAndUpdate(
          { user_id },
          { $addToSet: { textbooks: textbook_id } }, // prevents duplicates
          { new: true, upsert: true } // create if doesn't exist
        );
        return NextResponse.json({ success: true, cart });

      }

      if(merch_id){
        const merchObjectId = new Types.ObjectId(merch_id)
        const cart = await Cart.findOneAndUpdate(
          { user_id },
          { $addToSet: { merchandise: merchObjectId } }, // prevents duplicates
          { new: true, upsert: true } // create if doesn't exist
          
        );
        return NextResponse.json({ success: true, cart });

      }
   

  
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
  const item = req.nextUrl.searchParams.get('item_id');

  if (!user_id) {
    return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
  }

  if (item) {

    const cart = await Cart.findOne({ user_id });
    
    
    const objectId = new mongoose.mongo.ObjectId(item);

    const inTextbooks = cart?.textbooks?.some((bookId: any) => bookId.equals(objectId));
    const inMerchandise = cart?.merchandise?.some((merchId: any) => merchId.equals(objectId));

      if (inTextbooks) {
        await Cart.updateOne(
          { user_id },
          { $pull: { textbooks: objectId } }
        );
      }
      
      if (inMerchandise) {
        await Cart.updateOne(
          { user_id },
          { $pull: { merchandise: objectId } }
        );
      }

      return NextResponse.json(cart || { message: 'Cart not found' });
  


  } 
  else {
    // Delete the whole cart
    await Cart.findOneAndDelete({ user_id });
    return NextResponse.json({ message: 'Cart deleted' });
  }
}