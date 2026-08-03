<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| PT Nusantara Film Indonesia (NFI) - API Routes (Laravel 11)
|--------------------------------------------------------------------------
*/

// Public Endpoints (Situs Utama / Visitor)
Route::get('/health', function () {
    return response()->json(['status' => 'online', 'company' => 'PT Nusantara Film Indonesia', 'timestamp' => now()]);
});

Route::get('/portfolio', [PortfolioController::class, 'index']);
Route::get('/portfolio/{slug}', [PortfolioController::class, 'show']);

Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{slug}', [NewsController::class, 'show']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/team', [TeamController::class, 'index']);

Route::post('/inquiries', [InquiryController::class, 'store']);

// CMS Admin Authentication
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected CMS Admin Endpoints (Mandatory Domain @nfi.co.id + Token Bearer)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Portfolio CRUD
    Route::post('/portfolio', [PortfolioController::class, 'store']);
    Route::put('/portfolio/{id}', [PortfolioController::class, 'update']);
    Route::delete('/portfolio/{id}', [PortfolioController::class, 'destroy']);

    // News CRUD
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{id}', [NewsController::class, 'update']);
    Route::delete('/news/{id}', [NewsController::class, 'destroy']);

    // Services CRUD
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // Team CRUD
    Route::post('/team', [TeamController::class, 'store']);
    Route::put('/team/{id}', [TeamController::class, 'update']);
    Route::delete('/team/{id}', [TeamController::class, 'destroy']);

    // Inquiries Inbox
    Route::get('/inquiries', [InquiryController::class, 'index']);
    Route::patch('/inquiries/{id}/status', [InquiryController::class, 'updateStatus']);
    Route::delete('/inquiries/{id}', [InquiryController::class, 'destroy']);

    // Media Manager (Direct Local Storage & Base64 / Multipart)
    Route::get('/media', [MediaController::class, 'index']);
    Route::post('/media/upload', [MediaController::class, 'upload']);
    Route::delete('/media/{id}', [MediaController::class, 'destroy']);
});
