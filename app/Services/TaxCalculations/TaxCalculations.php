<?php

namespace App\Services\TaxCalculations;

class TaxCalculations
{
    protected $gst = 0.15;
    public function calculateGST($total)
    {
        return round((float) $total * $this->gst, 2);
    }

    public function afterTax($total)
    {
        return round((float) $total + $this->calculateGST($total), 2);
    }
}
