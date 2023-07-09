<?php

namespace App\Services\TaxCalculations;

use Nette\Utils\Floats;

class TaxCalculations
{
    protected $gst = 0.15;
    public function calculateGST(float $total): float
    {
        return Floats::round($total * $this->gst, 2);
    }

    public function afterTax(float $total): float
    {
        return Floats::round($total + $this->calculateGST($total), 2);
    }
}
