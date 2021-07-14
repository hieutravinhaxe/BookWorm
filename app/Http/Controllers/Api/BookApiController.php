<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use \DB;

class BookApiController extends Controller
{
    // public function booksAuthor($id){
    //     return Book::select('books.*')->finalPrice()->where('books.author_id','=',$id)->get();
    // }

    // public function booksCategory($id){
    //     return Book::select('books.*')->finalPrice()->where('books.category_id','=',$id)->get();
    // }

    // public function booksRanking($n){
    //     return Book::leftJoin('reviews','reviews.book_id','books.id')
    //                 ->select('books.*',DB::raw('sum(cast(reviews.rating_start as integer))/count(*) as avg_ranking'))
    //                 ->finalPrice()
    //                 ->groupBy('books.id')
    //                 ->havingRaw('sum(cast(reviews.rating_start as integer))/count(*) = ?',[$n])
    //                 ->get();

    // }

    // public function booksOnSales(Request $req){
    //     //limit = 10 for onSales section
    //     return Book::subPrice()
    //                 ->finalPrice()
    //                 ->orderBy('sub_price')
    //                 ->limit($req->query('limit')?$req->query('limit'):null)
    //                 ->get();
    // }

    // public function booksRecommended(Request $req){
    //     //limit = 8 for recommened section
    //     return Book::leftJoin('reviews','reviews.book_id','books.id')
    //                 ->select('books.*',DB::raw('sum(cast(reviews.rating_start as integer))/count(*) as avg_ranking'))
    //                 ->subPrice()
    //                 ->discountPrice()
    //                 ->avgStar()
    //                 ->finalPrice()
    //                 ->groupBy('books.id','discounts.id','reviews.id')
    //                 ->orderByRaw('-sum(cast(reviews.rating_start as integer))/count(*)')
    //                 ->orderBy('final_price')
    //                 ->limit($req->query('limit')?$req->query('limit'):null)
    //                 ->where('books.id','=','44')
    //                 ->get();

    // }

    // public function showBook($id){
    //     return Book::avgStar()
    //                 ->where('books.id','=',$id)
    //                 ->get();
    // }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Book::select('books.id','books.author_id','books.category_id','books.book_price')
                    ->avgStar()
                    ->allPrice()
                    ->groupBy('books.id')
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
        //
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
