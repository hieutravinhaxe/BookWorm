<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Book;
use App\Http\Controllers\api\BookApiController;
use App\Http\Controllers\Api\ReviewApiController;
use App\Http\Controllers\Api\AuthorApiController;
use App\Http\Controllers\Api\CategoryApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


//Route::get('books/authors/{id}',[BookApiController::class,'booksAuthor']);
//Route::get('books/categories/{id}',[BookApiController::class,'booksCategory']);
// Route::get('books/ranking/{n}',[BookApiController::class,'booksRanking']);
// Route::get('books/onSales',[BookApiController::class,'booksOnSales']);
// Route::get('books/recommended',[BookApiController::class,'booksRecommended']);
// Route::get('books/{id}',[BookApiController::class,'showBook']);
Route::apiResource('books/{id}/reviews',ReviewApiController::class);
Route::apiResource('authors',AuthorApiController::class);
Route::apiResource('categories',CategoryApiController::class);
Route::apiResource('books',BookApiController::class);


