<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OrderItem;

class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'orderId'=>'required|exists:orders,id',
            'bookId'=>'required|exists:books,id',
            'quanlity'=>'required|max:1|in:1,2,3,4,5,6,7,8',
            'price'=>'required'
        ]);

        $itemOrder = new OrderItem();
        $itemOrder->order_id=$request->post('orderId');
        $itemOrder->book_id=$request->post('bookId');
        $itemOrder->quantity=$request->post('quanlity');
        $itemOrder->price=$request->post('price');
        if($itemOrder->save()){
            return response([
                'data'=>$itemOrder
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
