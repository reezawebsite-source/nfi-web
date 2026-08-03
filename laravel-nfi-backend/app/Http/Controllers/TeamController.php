<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TeamMember;

class TeamController extends Controller
{
    public function index()
    {
        return response()->json(TeamMember::orderBy('order', 'asc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'biography' => 'required|string',
            'photo' => 'required|string',
            'order' => 'nullable|integer',
            'socials' => 'nullable|array',
        ]);

        $member = TeamMember::create($validated);

        return response()->json($member, 201);
    }

    public function update(Request $request, $id)
    {
        $member = TeamMember::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|required|string|max:255',
            'department' => 'sometimes|required|string|max:255',
            'biography' => 'sometimes|required|string',
            'photo' => 'sometimes|required|string',
            'order' => 'nullable|integer',
            'socials' => 'nullable|array',
        ]);

        $member->update($validated);

        return response()->json($member);
    }

    public function destroy($id)
    {
        $member = TeamMember::findOrFail($id);
        $member->delete();

        return response()->json(['message' => 'Team member deleted successfully.']);
    }
}
