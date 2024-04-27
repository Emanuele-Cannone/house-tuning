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
        session()->flash('failed', 'Veicolo non creato/aggiornato');
        return Redirect::route('vehicle.create');
    }
}
