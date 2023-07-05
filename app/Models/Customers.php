<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class Customers extends Model
{
    use HasFactory;
    use HasUuids;
    use Billable;
    use Notifiable;

    protected $fillable = ['name', 'email', 'phone', 'stripe_id'];

    public function orders()
    {
        return $this->hasMany(Orders::class);
    }
}
