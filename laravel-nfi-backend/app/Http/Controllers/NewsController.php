<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\NewsPost;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    public function index()
    {
        return response()->json(NewsPost::orderBy('published_at', 'desc')->get());
    }

    public function show($slug)
    {
        $post = NewsPost::where('slug', $slug)->firstOrFail();
        return response()->json($post);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'author' => 'required|string',
            'featured_image' => 'required|string',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'tags' => 'nullable|array',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'published_at' => 'nullable|date',
        ]);

        if (empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $post = NewsPost::create($validated);

        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $post = NewsPost::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string',
            'author' => 'sometimes|required|string',
            'featured_image' => 'sometimes|required|string',
            'excerpt' => 'sometimes|required|string',
            'content' => 'sometimes|required|string',
            'tags' => 'nullable|array',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'published_at' => 'nullable|date',
        ]);

        if (isset($validated['title']) && $validated['title'] !== $post->title) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $post->update($validated);

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = NewsPost::findOrFail($id);
        $post->delete();

        return response()->json(['message' => 'News post deleted successfully.']);
    }
}
