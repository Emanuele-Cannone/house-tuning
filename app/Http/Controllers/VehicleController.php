<?php

namespace App\Http\Controllers;

use App\Exceptions\VehicleException;
use App\Http\Requests\VehicleStoreRequest;
use App\Http\Requests\VehicleUpdateRequest;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function __construct(private readonly VehicleService $service)
    {
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Vehicle/Index', [
            'vehicles' => Vehicle::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Vehicle/Create');
    }

    /**
     * Store a newly created resource in storage.
     * @param VehicleStoreRequest $request
     * @return RedirectResponse
     * @throws VehicleException
     */
    public function store(VehicleStoreRequest $request): RedirectResponse
    {
        $this->service->create($request);

        return redirect()->route('vehicle.index')->with('message', 'Organization created.');
    }

    /**
     * Show the form for editing the specified resource.
     * @param Vehicle $vehicle
     * @return Response
     */
    public function edit(Vehicle $vehicle): Response
    {
        return Inertia::render('Vehicle/Edit', [
            'vehicle' => $vehicle
        ]);
    }

    /**
     * Update the specified resource in storage.
     * @param VehicleUpdateRequest $request
     * @param Vehicle $vehicle
     * @return RedirectResponse
     * @throws VehicleException
     */
    public function update(VehicleUpdateRequest $request, Vehicle $vehicle): RedirectResponse
    {
        $this->service->update($request, $vehicle);

        return redirect()->route('vehicle.index');

    }

    /**
     * Remove the specified resource from storage.
     * @param Vehicle $vehicle
     * @return RedirectResponse
     */
    public function destroy(Vehicle $vehicle): RedirectResponse
    {
        $vehicle->delete();

        return redirect()->route('vehicle.index');

    }
}
