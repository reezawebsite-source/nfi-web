<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Portfolio;
use Illuminate\Support\Str;

class PortfolioController extends Controller
{
    public function index()
    {
        return response()->json(Portfolio::orderBy('year', 'desc')->get());
    }

    public function show($slug)
    {
        $portfolio = Portfolio::where('slug', $slug)->firstOrFail();
        return response()->json($portfolio);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'client' => 'required|string',
            'year' => 'required|integer',
            'thumbnail' => 'required|string',
            'video_url' => 'nullable|string',
            'synopsis' => 'required|string',
            'credits' => 'required|array',
            'awards' => 'nullable|array',
            'featured' => 'nullable|boolean',
            'status' => 'nullable|string',
        ]);

        $portfolio = Portfolio::create($validated);

        return response()->json($portfolio, 201);
    }

    public function update(Request $request, $id)
    {
        $portfolio = Portfolio::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string',
            'client' => 'sometimes|required|string',
            'year' => 'sometimes|required|integer',
            'thumbnail' => 'sometimes|required|string',
            'video_url' => 'nullable|string',
            'synopsis' => 'sometimes|required|string',
            'credits' => 'sometimes|required|array',
            'awards' => 'nullable|array',
            'featured' => 'nullable|boolean',
            'status' => 'nullable|string',
        ]);

        if (isset($validated['title']) && $validated['title'] !== $portfolio->title) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $portfolio->update($validated);

        return response()->json($portfolio);
    }

    public function destroy($id)
    {
        $portfolio = Portfolio::findOrFail($id);
        $portfolio->delete();

        return response()->json(['message' => 'Portfolio deleted successfully.']);
    }
}
