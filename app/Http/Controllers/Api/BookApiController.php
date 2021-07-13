<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use \DB;

class BookApiController extends Controller
{
    public function booksAuthor($id){
        return Book::select('books.*')->finalPrice()->where('books.author_id','=',$id)->get();
    }

    public function booksCategory($id){
        return Book::select('books.*')->finalPrice()->where('books.category_id','=',$id)->get();
    }

    public function booksRanking($n){
        return Book::leftJoin('reviews','reviews.book_id','books.id')
                    ->select('books.*',DB::raw('sum(cast(reviews.rating_start as integer))/count(*) as avg_ranking'))
                    ->finalPrice()
                    ->groupBy('books.id')
                    ->havingRaw('sum(cast(reviews.rating_start as integer))/count(*) = ?',[$n])
                    ->get();

    }

    public function booksOnSales(Request $req){
        //limit = 10 for onSales section
        return Book::subPrice()
                    ->finalPrice()
                    ->orderBy('sub_price')
                    ->limit($req->query('limit')?$req->query('limit'):null)
                    ->get();
    }

    public function booksRecommended(Request $req){
        //limit = 8 for recommened section
        return Book::leftJoin('reviews','reviews.book_id','books.id')
                    ->select('books.*',DB::raw('sum(cast(reviews.rating_start as integer))/count(*) as avg_ranking'))
                    ->subPrice()
                    ->finalPrice()
                    ->groupBy('books.id')
                    ->avgStar()
                    ->orderByRaw('-sum(cast(reviews.rating_start as integer))/count(*)')
                    ->limit($req->query('limit')?$req->query('limit'):null)
                    ->get();
    }

}
