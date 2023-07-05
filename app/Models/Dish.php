<?php

namespace App\Models;

use CloudinaryLabs\CloudinaryLaravel\MediaAlly;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dish extends Model
{
    use HasFactory;
    use HasUuids;
    use MediaAlly;
    protected $fillable = ['name', 'description', 'price'];
    protected $hidden = ['category_id'];

    public function get_menus_with_media()
    {
        return $this::with(['category', 'menus'])
            ->get()
            ->each(function ($item) {
                $item['media'] = $this->add_media($item);
                return $item;
            });
    }
    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    protected function grtCategoryAttribute()
    {
        return [];
    }

    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'dish_menu');
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
