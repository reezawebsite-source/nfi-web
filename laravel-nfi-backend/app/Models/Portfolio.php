<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'title',
        'slug',
        'category',
        'client',
        'year',
        'thumbnail',
        'gallery',
        'video_url',
        'description',
        'synopsis',
        'director',
        'cast',
        'credits',
        'awards',
        'featured',
        'status',
    ];

    protected $casts = [
        'gallery' => 'array',
        'cast' => 'array',
        'credits' => 'array',
        'awards' => 'array',
        'featured' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
            if (empty($model->slug)) {
                $model->slug = Str::slug($model->title);
            }
        });
    }
}
