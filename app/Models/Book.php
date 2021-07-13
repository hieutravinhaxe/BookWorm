<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use \DB;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;


    public function author(){
        return $this->hasOne(Author::class);
    }

    public function reviews(){
        return $this->hasMany(Review::class);
    }

    public function category(){
        return $this->hasOne(Category::class);
    }

    public function discounts(){
        return $this->hasMany(Discount::class)->latest('discount_start_date');
    }

    public function scopeAvgStar($query)
    {
        return $query->addSelect([
            'avg_star' => Review::select(DB::raw('sum(cast(rating_start as integer)) / count(*) as avg_star'))
                ->whereColumn('book_id', 'books.id')
        ]);
    }

    public function scopeFinalPrice($query){
        return $query->addSelect([
            'discount_price' => Discount::select('discount_price')
                ->available()
                ->whereColumn('book_id', 'books.id')
                ->limit(1) 
        ]);
    }

    public function scopeSubPrice($query){
        return $query->addSelect([
            'sub_price' => Discount::selectRaw('books.book_price - discounts.discount_price')
                ->available()
                ->whereColumn('book_id', 'books.id')
                ->limit(1),
        ]);
    }
}
