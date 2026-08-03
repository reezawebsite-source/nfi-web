<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(Service::orderBy('id', 'asc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_description' => 'required|string',
            'full_description' => 'required|string',
            'deliverables' => 'required|array',
            'sample_image' => 'required|string',
            'icon' => 'nullable|string',
        ]);

        $service = Service::create($validated);

        return response()->json($service, 201);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'short_description' => 'sometimes|required|string',
            'full_description' => 'sometimes|required|string',
            'deliverables' => 'sometimes|required|array',
            'sample_image' => 'sometimes|required|string',
            'icon' => 'nullable|string',
        ]);

        if (isset($validated['title']) && $validated['title'] !== $service->title) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $service->update($validated);

        return response()->json($service);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json(['message' => 'Service deleted successfully.']);
    }
}
