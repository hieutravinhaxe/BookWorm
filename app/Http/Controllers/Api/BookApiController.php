<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use \DB;

class BookApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req)
    {
        $page = $req->has('page') ? $req->get('page') : 1;
        $limit = $req->has('limit') ? $req->get('limit') : 10;
        $orderByNumReviews = $req->has('orderReviews')? $req->get('orderReviews'):null;
        $orderByFinalPrice = $req->has('orderFPrice')? $req->get('orderFPrice'):null;
        $orderBySubPrice = $req->has('orderSPrice')? $req->get('orderSPrice'):null;
        $filterByAuthor = $req->has('author')? $req->get('author'):0;
        $filterByCategory = $req->has('category')? $req->get('category'):0;
        $filterByRate = $req->has('rate')? $req->get('rate'):0;
        $result =  Book::select('books.id','books.author_id','books.category_id','books.book_price')
                    ->avgStar()
                    ->allPrice()
                    ->groupBy('books.id')
                    ->filterAuthor($filterByAuthor)
                    ->filterCate($filterByCategory)
                    ->filterRate($filterByRate)
                    ->orderByNumReviews($orderByNumReviews)
                    ->orderByFinalPrice($orderByFinalPrice)
                    ->orderBySubPrice($orderBySubPrice);
        $total = $result->get()->count();
        return response([
            'total' => $total,
            'page' => $page,
            'from' => ($limit*$page-$limit)+1,
            'to' => ($limit*$page)>$total?$total:($limit*$page),
            'data' => $result->limit($limit)
                                ->offset(($page - 1) * $limit)
                                ->get()
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Book $book)
    {
        return $book;
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
