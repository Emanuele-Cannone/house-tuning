<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class VehicleException extends Exception
{
    /**
     * Render the exception into an HTTP response.
     */
    public function render(): RedirectResponse
    {
        return Redirect::route('vehicle.create')->with('message', 'Operazione Fallita!');
    }
}
