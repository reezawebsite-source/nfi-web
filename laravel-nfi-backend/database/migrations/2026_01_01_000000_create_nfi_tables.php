<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for PT Nusantara Film Indonesia (NFI).
     */
    public function up(): void
    {
        // 1. Portfolios Table
        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category');
            $table->string('client');
            $table->integer('year');
            $table->string('thumbnail');
            $table->string('video_url')->nullable();
            $table->text('synopsis');
            $table->longText('credits'); // director, producer, dop, editor
            $table->longText('awards')->nullable();
            $table->boolean('featured')->default(false);
            $table->string('status')->default('Published');
            $table->timestamps();
        });

        // 2. News & Press Posts
        Schema::create('news_posts', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category');
            $table->string('author');
            $table->string('featured_image');
            $table->text('excerpt');
            $table->longText('content');
            $table->longText('tags')->nullable();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->timestamp('published_at')->useCurrent();
            $table->timestamps();
        });

        // 3. Service Offerings
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->text('short_description');
            $table->longText('full_description');
            $table->longText('deliverables');
            $table->string('sample_image');
            $table->string('icon')->default('Film');
            $table->timestamps();
        });

        // 4. Team Members & Directors
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->string('position');
            $table->string('department'); // Direksi & Eksekutif, Produser, etc.
            $table->text('biography');
            $table->string('photo');
            $table->integer('order')->default(1);
            $table->longText('socials')->nullable(); // email, instagram, linkedin
            $table->timestamps();
        });

        // 5. Contact Inquiries (Inbox)
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('subject');
            $table->text('message');
            $table->enum('office_target', ['Jakarta', 'Surabaya']);
            $table->enum('status', ['Unread', 'Replied', 'Archived'])->default('Unread');
            $table->timestamps();
        });

        // 6. Media Files Storage
        Schema::create('media_files', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('url');
            $table->integer('size_kb');
            $table->string('format')->default('webp');
            $table->string('folder')->default('cinematic-local');
            $table->string('dimensions')->default('1920 x 1080');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_files');
        Schema::dropIfExists('inquiries');
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('services');
        Schema::dropIfExists('news_posts');
        Schema::dropIfExists('portfolios');
    }
};
