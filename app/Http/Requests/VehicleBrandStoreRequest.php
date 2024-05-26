<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class VehicleBrandStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'vehicle' => 'required|string',
            'brand' => ['required','string', Rule::unique('vehicle_brands')->where('name', $this->name)],
            'name' => ['required','string', Rule::unique('vehicle_brands')->where('brand', $this->brand)],
        ];
    }
}
