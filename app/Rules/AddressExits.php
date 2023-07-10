<?php

namespace App\Rules;

use App\Http\Controllers\OrdersController;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\DataAwareRule;

class AddressExits implements DataAwareRule, ValidationRule
{
    protected $data = [];
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(
        string $attribute,
        mixed $value,
        Closure $fail
    ): void {
        $isValid = OrdersController::google_address_validator($value);
        if (!$isValid) {
            $fail('The :attribute is not valid.');
        }
    }

    /**
     * Set the data under validation.
     *
     * @param  array<string, mixed>  $data
     */
    public function setData(array $data): static
    {
        $this->data = $data;

        return $this;
    }
}
