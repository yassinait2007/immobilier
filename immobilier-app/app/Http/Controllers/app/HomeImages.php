<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use App\utils\JsonResponses;
use Illuminate\Http\Request;

class HomeImages extends Controller
{
    use JsonResponses;
    public function index()
    {
        $slider = Slider::where("is_active", true)->first();
        if ($slider && $slider->getMedia("images")->count() > 0) {
            $images = $slider->getMedia("images")->collect()->map(function ($media) {
                return $media->original_url;
            });
        } else {
            $images = [
                asset("storage/slides/slider1.png"),
                asset("storage/slides/slider2.png"),
                asset("storage/slides/slider3.png"),
            ];
        }
        return $this->jsonResponse(true, self::SUCCESS, 200, $images);
    }
}
