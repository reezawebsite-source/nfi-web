<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NewsPost extends Model
{
    use HasFactory;

    protected $table = 'news_posts';

    protected $fillable = [
        'uuid',
        'title',
        'slug',
        'category',
        'author',
        'author_role',
        'author_avatar',
        'featured_image',
        'featured',
        'summary',
        'excerpt',
        'content',
        'reading_time_minutes',
        'tags',
        'seo_title',
        'seo_description',
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'featured' => 'boolean',
        'published_at' => 'datetime',
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
