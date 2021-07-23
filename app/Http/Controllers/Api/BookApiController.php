<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use \DB;
use App\Models\Author;
use App\Models\Category;

class BookApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req)
    {
        if($req->has('exist')){
            $r = Book::where('id',$req->get('exist'))->get()->count();
            return response([
                'checkExist' => $r
            ]);
        }
        $page = $req->has('page') ? $req->get('page') : 1;
        $limit = $req->has('limit') ? $req->get('limit') : 15;
        $orderByNumReviews = $req->has('orderReviews')? $req->get('orderReviews'):null;
        $orderByFinalPrice = $req->has('orderFPrice')? $req->get('orderFPrice'):null;
        $orderBySubPrice = $req->has('orderSPrice')? $req->get('orderSPrice'):null;
        $orderByRate = $req->has('orderRate')? $req->get('orderRate'):null;
        $filterByAuthor = $req->has('author')? $req->get('author'):0;
        $filterByCategory = $req->has('category')? $req->get('category'):0;
        $filterByRate = $req->has('rate')? $req->get('rate'):0;
        $result =  Book::select('books.id','books.book_title','authors.author_name','books.book_price','books.book_cover_photo')
                    ->avgStar()
                    ->allPrice()
                    ->groupBy('books.id','authors.author_name')
                    ->filterAuthor($filterByAuthor)
                    ->filterCate($filterByCategory)
                    ->filterRate($filterByRate)
                    ->orderRate($orderByRate)
                    ->orderByNumReviews($orderByNumReviews)
                    ->orderByFinalPrice($orderByFinalPrice)
                    ->orderBySubPrice($orderBySubPrice)
                    ->orderBy('books.book_title')
                    ->leftJoin('authors','authors.id','books.author_id');
        $total = $result->get()->count();
        return response([
            'total' => $total,
            'page' => $page,
            'totalPages' => ceil($total/$limit),
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
        $b =  Book::select('books.id','books.book_price','books.book_title','books.book_summary','books.book_cover_photo')
                    ->where('books.id','=',$book->id)
                    ->allPrice()
                    ->avgStar()
                    ->groupBy('books.id')
                    ->get();
        
        $author = Author::find($book->author_id);
        $category = Category::find($book->category_id);

        return response([
            'book' => $b->first(),
            'author' => $author,
            'category' =>$category
        ]);
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
