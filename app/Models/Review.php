<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function books(){
        return $this->hasOne(Book::class);
    }

    public function scopeFilterStar($query, $star){
        if($star==0){
            return $query->whereNotNull('rating_start');
        }
        else{
            return $query->where('rating_start','=',$star);
        }
    }

    public function scopeOrderDate($query, $by){
        if($by==0){
            return $query->orderByRaw('review_date');
        }
        else{
            return $query->orderByRaw('review_date DESC');
        }
    }
}
