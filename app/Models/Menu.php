<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use CloudinaryLabs\CloudinaryLaravel\MediaAlly;

class Menu extends Model
{
    use MediaAlly;
    use HasFactory;
    use HasUuids;

    protected $fillable = ['name', 'description', 'price'];

    public function get_menus_with_media()
    {
        return $this->with(['dishes', 'options'])
            ->get()
            ->each(function ($item) {
                $item['media'] = array_map(function ($media) {
                    return [
                        'id' => $media['id'],
                        'url' => $media['file_url'],
                    ];
                }, $item->fetchAllMedia()->toArray());
                return $item;
            });
    }

    public function dishes()
    {
        return $this->belongsToMany(Dish::class, 'dish_menu');
    }

    public function options()
    {
        return $this->belongsToMany(Dish::class, 'menu_options');
    }
}
