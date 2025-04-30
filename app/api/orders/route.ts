import { NextRequest, NextResponse } from 'next/server';
import Order, { OrderDocument } from '@/models/Order';
import { connectDB } from '@/lib/mongoose';
import Cart from '@/models/Cart';
import ShippingAddress from '@/models/ShippingAddress';
import { ObjectId } from 'mongodb';
import User, { UserDocument } from '@/models/User';
import Textbook from '@/models/Textbook';
import Merchandise, { MerchandiseDocument } from '@/models/Merchandise';
import { CartItem } from '@/app/context/CartContext';
import mongoose from 'mongoose';




export async function GET(req: NextRequest) {
    await connectDB();
  
    const user_id = req.nextUrl.searchParams.get('user_id');
    const order_id = req.nextUrl.searchParams.get('order_id');

    if(order_id){
          const objectId = new ObjectId(order_id);
      
        const order: OrderDocument = await Order.findById( objectId ).populate('textbooks').populate('merchandise').populate('shippingAddress');

        if (!order) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
          }

          return NextResponse.json({
            success: true,
            order: order
          });
    }

    if (!user_id) {
      return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
    }
    const objectId = new ObjectId(user_id);

    const user: UserDocument | null = await User.findById(objectId)

    if(!user){
      return NextResponse.json({ message: 'Orders not found' }, { status: 404 });
    }

    

    const orders: OrderDocument[] = await Order.find({user_id: user.email }).populate('textbooks').populate('merchandise').populate('shippingAddress');
  
    if (!orders) {
      return NextResponse.json({ message: 'Orders not found' }, { status: 404 });
    }
     

    return NextResponse.json({
      success: true,
      orders: orders
    });
  }
  export async function POST(req: NextRequest) {
    await connectDB();
    const body = await req.json();
    console.log(body);
    
    const cart = body.cart
    console.log(body.user_id)
    try {

      let textbooks:mongoose.Types.ObjectId[] = []
      let merch:mongoose.Types.ObjectId[] = []

      if(cart){
        for(const item of cart){
          const book:any =await Textbook.findById(item._id)

          if(!book){
            const m:any = await Merchandise.findById(item._id)

            if(m){
              merch.push(m._id)
            }
          }else{
            textbooks.push(book._id)
          }
        }
      }
  
      if (!cart) {
        return NextResponse.json({ message: "Cart not found" }, { status: 404 });
      }
  
      let address = await ShippingAddress.findOne({ 
        user_id: body.user_id, 
        address: body.address.address // fixed assuming address is an object
      });
  
      if (!address) {
        address = await ShippingAddress.create({
          name: body.address.name,
          address: body.address.address,        // 👈 corrected if body.address is an object
          address_line2: body.address.address_line2,
          zipcode: body.address.zipcode,
          city: body.address.city,
          state: body.address.state,
          country: body.address.country,
          user_id: body.user_id
        });
      }
  
      const amount = (cart.textbooks?.length || 0) + (cart.merchandise?.length || 0);
  
      const newOrder = await Order.create({
        user_id: body.user_id,
        textbooks: textbooks || [],
        merchandise: merch || [], // 🔥 fixed typo
        amount: amount,
        total: body.total,
        shippingAddress: address._id
      });


      if (cart.textbooks && cart.textbooks.length > 0) {
        await Promise.all(cart.textbooks.map(async (textbookId:ObjectId) => {
          const textbook = await Textbook.findById(textbookId);

            if (textbook) {
              const newStock = Math.max(0, textbook.stock - 1); // prevent negative
              await Textbook.findByIdAndUpdate(
                textbookId,
                {
                  stock: newStock,
                  instock: newStock > 0
                },
                { new: true }
              );
            }
        }));
      }
  
      if (cart.merchandise && cart.merchandise.length > 0) {
        await Promise.all(cart.merchandise.map(async (merchId:ObjectId) => {
          const merch = await Merchandise.findById(merchId);

          if (merch) {
            const newStock = Math.max(0, merch.stock - 1);
            await Merchandise.findByIdAndUpdate(
              merchId,
              {
                stock: newStock,
                instock: newStock > 0
              },
              { new: true }
            );
}
        }));
      }
  
      return NextResponse.json({ success: true, order: newOrder });
  
    } catch (error) {
      console.error(error);
      
      return NextResponse.json({ message: 'Error creating order', error }, { status: 500 });
    }
  }

export async function PUT(req: NextRequest) {
    await connectDB();
    const { user_id, textbook_id, merchandise_id } = await req.json();
  
    if (!user_id) {
        return NextResponse.json(
          { message: 'user_id is required' },
          { status: 400 }
        );
      }
    if (!user_id && !textbook_id && !merchandise_id) {
      return NextResponse.json(
        { message: 'user_id | textbook_id | merchandise_id are required' },
        { status: 400 }
      );
    }
    if(user_id   && !textbook_id && !merchandise_id){
        return NextResponse.json(
            { message: 'Cannot make an order with no items' },
            { status: 400 }
          );
    }
  
    try {
        if(textbook_id && ! merchandise_id){
            const order = await Order.findOneAndUpdate(
                { user_id },
                { $addToSet: { textbooks: textbook_id } },
                { new: true, upsert: true } 
            );

            return NextResponse.json({ success: true, order });
        }
        else if (merchandise_id && !textbook_id){
            const order = await Order.findOneAndUpdate(
                { user_id },
                { $addToSet: { merchandise: merchandise_id } },
                { new: true, upsert: true } 
            );

            return NextResponse.json({ success: true, order });
        }
        else if (merchandise_id && textbook_id){
            const order = await Order.findOneAndUpdate(
                { user_id },
                { $addToSet: { merchandise: merchandise_id, textbooks: textbook_id } },
                { new: true, upsert: true } 
            );

            return NextResponse.json({ success: true, order });
        }
  
      
    } catch (error) {
      return NextResponse.json(
        { message: 'Error updating order', error },
        { status: 500 }
      );
    }
  }

// DELETE: /api/order?user_id=123&textbook=abc123
export async function DELETE(req: NextRequest) {
  await connectDB();
  const user_id = req.nextUrl.searchParams.get('user_id');
  const textbook = req.nextUrl.searchParams.get('textbook');

  if (!user_id) {
    return NextResponse.json({ message: 'user_id is required' }, { status: 400 });
  }

  if (textbook) {
    // Remove a single textbook from the array
    const order = await Order.findOneAndUpdate(
      { user_id },
      { $pull: { textbooks: textbook } },
      { new: true }
    );
    return NextResponse.json(order || { message: 'Order not found' });
  } else {
    // Delete the whole order
    await Order.findOneAndDelete({ user_id });
    return NextResponse.json({ message: 'Order deleted' });
  }
}
