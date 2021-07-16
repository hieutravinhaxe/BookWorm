<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use \DB;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;


    public function author()
    {
        return $this->hasOne(Author::class,'book_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function category()
    {
        return $this->hasOne(Category::class);
    }

    public function discounts()
    {
        return $this->hasMany(Discount::class)->latest('discount_start_date');
    }

    public function scopeAvgStar($query)
    {
        return $query->addSelect(DB::raw('coalesce(sum(cast(reviews.rating_start as integer))/count(*),0) as avg_rate'))
                    ->addSelect(DB::raw('coalesce(count(*),0) as num_reviews'))
                    ->leftJoin('reviews', 'reviews.book_id', 'books.id');
    }

    public function scopeAllPrice($query)
    {
        return $query->leftJoin('discounts', function ($join) {
            $join->on('discounts.book_id', '=', 'books.id')
                ->whereNotNull('discounts.discount_start_date')
                ->where(function ($query) {
                    $query->whereNotNull('discounts.discount_end_date')
                        ->orWhere('discounts.discount_end_date', '>=', 'now()');
                });
        })
            ->groupBy('discounts.discount_price')
            ->addSelect(DB::raw('coalesce(discounts.discount_price,0) as discount_price'))
            ->addSelect(DB::raw('coalesce(books.book_price - discounts.discount_price,books.book_price) as sub_price'))
            ->addSelect(DB::raw('coalesce(discounts.discount_price, books.book_price) as final_price'));
        
    }

    public function scopeFilterAuthor($query, $id){
        ($id===0)?$query:$query->having('books.author_id','=',$id);
    }
    
    public function scopeFilterCate($query, $id){
        ($id===0)?$query:$query->having('books.category_id','=',$id);
    }

    public function scopeFilterRate($query, $star){
        ($star===0)?$query:$query->having(DB::raw('coalesce(sum(cast(reviews.rating_start as integer))/count(*),0)'),'=',$star);
    }

    public function scopeOrderByFinalPrice($query, $order){
        //($order===null)?(($order===0)?$query->orderByRaw('final_price'):$query->orderByRaw('final_price DESC')):$query;
        if($order==null){
            return $query;
        }
        else if($order==0){
            return $query->orderByRaw('final_price');
        }
        else{
            return $query->orderByRaw('final_price DESC');
        }
    }

    public function scopeOrderBySubPrice($query,$order){
        //($order===null)?(($order===0)?$query->orderByRaw('sub_price'):$query->orderByRaw('sub_price DESC')):$query;
        if($order===null){
            return $query;
        }
        else if($order==0){
            return $query->orderByRaw('sub_price');
        }
        else{
            return $query->orderByRaw('sub_price DESC');
        }
    }

    public function scopeOrderByNumReviews($query, $order){
        if($order===null){
            return $query;
        }
        else if($order==0){
            return $query->orderByRaw('num_reviews');
        }
        else{
            return $query->orderByRaw('num_reviews DESC');
        }
    }
}
