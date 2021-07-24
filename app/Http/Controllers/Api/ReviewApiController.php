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
        $limit = $request->has('limit') ? $request->get('limit') : 5;
        $rate = $request->has('rate')? $request->get('rate'):0;
        $order = $request->has('orderDate')?$request->get('orderDate'):0;
        
        $reviews =  Review::where('book_id',$id)
            ->filterStar($rate)
            ->orderDate($order);

        $total = $reviews->get()->count();

        $star1 = Review::where('book_id',$id)
                ->where('rating_start','1')->get()->count();
        $star2 = Review::where('book_id',$id)
                ->where('rating_start','2')->get()->count();
        $star3 = Review::where('book_id',$id)
                ->where('rating_start','3')->get()->count();
        $star4 = Review::where('book_id',$id)
                ->where('rating_start','4')->get()->count();
        $star5 = Review::where('book_id',$id)
                ->where('rating_start','5')->get()->count();


        return response([
            'total' => $total,
            'page' => $page,
            'totalPages' => ceil($total/$limit),
            'from' => ($limit*$page-$limit)+1,
            'to' => ($limit*$page)>$total?$total:($limit*$page),
            'data' => $reviews->limit($limit)
                                ->offset(($page - 1) * $limit)
                                ->get(),
            'star1' =>$star1,
            'star2' => $star2,
            'star3' => $star3,
            'star4' => $star4,
            'star5' => $star5
        ]);
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
            'bookId'=>'required|exists:books,id',
            'title'=>'required|max:120',
            'rate' =>'required|max:1|in:1,2,3,4,5',
            'details'=>'nullable'
        ]);

        $review = new Review();
        $review->book_id = $request->post('bookId');
        $review->review_title = $request->post('title');
        $review->rating_start = $request->post('rate');
        $review->review_details = $request->post('details');
        $review->review_date = Carbon::now()->format('Y-m-d H:m:s');
        
        if($review->save()){
            return response([
                'data' => $review
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
