<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MediaFile;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function index()
    {
        return response()->json(MediaFile::orderBy('created_at', 'desc')->get());
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|image|max:10240', // Max 10MB image
            'folder' => 'nullable|string',
        ]);

        $file = $request->file('file');
        $folder = $request->input('folder', 'cinematic-local');

        $path = $file->store($folder, 'public');
        $url = Storage::url($path);

        // Get dimensions if it is an image
        $dimensions = 'N/A';
        $imageSize = @getimagesize($file);
        if ($imageSize) {
            $dimensions = "{$imageSize[0]} x {$imageSize[1]}";
        }

        $mediaFile = MediaFile::create([
            'name' => $file->getClientOriginalName(),
            'url' => $url,
            'size_kb' => round($file->getSize() / 1024),
            'format' => $file->getClientOriginalExtension(),
            'folder' => $folder,
            'dimensions' => $dimensions,
        ]);

        return response()->json($mediaFile, 201);
    }

    public function destroy($id)
    {
        $mediaFile = MediaFile::findOrFail($id);

        // Extract path to delete from storage if it exists in public disk
        $parsedUrl = parse_url($mediaFile->url);
        if (isset($parsedUrl['path'])) {
            $storagePrefix = '/storage/';
            if (str_starts_with($parsedUrl['path'], $storagePrefix)) {
                $relativePath = substr($parsedUrl['path'], strlen($storagePrefix));
                Storage::disk('public')->delete($relativePath);
            }
        }

        $mediaFile->delete();

        return response()->json(['message' => 'Media file deleted successfully.']);
    }
}
