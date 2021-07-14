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
        return $this->hasOne(Author::class);
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
                    ->addSelect(DB::raw('coalesce(sum(cast(reviews.rating_start as integer)),0) as num_reviews'))
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
   
}
