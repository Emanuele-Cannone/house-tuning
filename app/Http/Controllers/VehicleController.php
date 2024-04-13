<?php

namespace App\Http\Controllers;

use App\Http\Requests\VehicleStoreRequest;
use App\Http\Requests\VehicleUpdateRequest;
use App\Models\Vehicle;
use Inertia\Inertia;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Vehicle/Index', [
            'vehicles' => Vehicle::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Vehicle/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VehicleStoreRequest $request)
    {
        $validated = $request->validated();

        Vehicle::create(collect($validated));

        return to_route('Vehicle.Index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vehicle $vehicle)
    {
        return Inertia::render('Vehicle/Edit', [
            'vehicle' => $vehicle
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VehicleUpdateRequest $request, Vehicle $vehicle)
    {
        $validated = $request->validated();

        $vehicle->update($validated);

        return to_route('Vehicle.Index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return to_route('Vehicle.Index');
    }
}
