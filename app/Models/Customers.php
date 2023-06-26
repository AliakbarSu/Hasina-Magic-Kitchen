<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Cashier\Billable;

class Customers extends Model
{
    use HasFactory;
    use HasUuids;
    use Billable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'stripe_id'
    ];
}
