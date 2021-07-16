<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Review;
use \Carbon\Carbon;
use Mockery\Undefined;

class ReviewApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id, Request $request)
    {
        $page = $request->has('page') ? $request->get('page') : 1;
        $limit = $request->has('limit') ? $request->get('limit') : 10;
        $rate = $request->has('rate')? $request->get('rate'):0;
        $order = $request->has('orderDate')?$request->get('orderDate'):0;
        
        return Review::where('book_id',$id)
            ->filterStar($rate)
            ->orderDate($order)
            ->limit($limit)
            ->offset(($page - 1) * $limit)
            ->get();
        
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $review = new Review();
        $review->book_id = $request->post('bookId');
        $review->review_title = $request->post('title');
        $review->rating_start = $request->post('rate');
        $review->rating_details = $request->post('details');
        $review->review_date = Carbon::now()->format('Y-m-d H:m:s');
        $review->save();
        return $review;
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
