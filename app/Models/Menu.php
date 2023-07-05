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
                $item['media'] = $this->add_media($item);
                $item->dishes->each(function ($dish) {
                    $dish['media'] = $this->add_media($dish);
                    unset($dish['pivot']);
                    return $dish;
                });
                $item->options->each(function ($option) {
                    $option['media'] = $this->add_media($option);
                    unset($option['pivot']);
                    return $option;
                });
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

    private function add_media($item)
    {
        return array_map(function ($media) {
            return [
                'id' => $media['id'],
                'url' => $media['file_url'],
            ];
        }, $item->fetchAllMedia()->toArray());
    }
}
