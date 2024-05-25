<?php

namespace App\Http\Controllers;

use App\Exceptions\VehicleException;
use App\Http\Requests\VehicleBrandStoreRequest;
use App\Models\Vehicle;
use App\Models\VehicleBrand;
use App\Services\VehicleBrandService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class VehicleBrandController extends Controller
{

    public function __construct(private readonly VehicleBrandService $service)
    {
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Brand/Index', [
            'brands' => VehicleBrand::with('vehicle')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Brand/Create', [
            'brands' => VehicleBrand::with('vehicle')->get(),
            'vehicles' => Vehicle::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * @param VehicleBrandStoreRequest $request
     * @return RedirectResponse
     * @throws VehicleException
     */
    public function store(VehicleBrandStoreRequest $request): RedirectResponse
    {
        $this->service->create($request);

        return redirect()->route('brand.index')->with('message', 'Brand creato correttamente!');
    }

    /**
     * Display the specified resource.
     */
    public function show(VehicleBrand $vehicleBrand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VehicleBrand $vehicleBrand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VehicleBrand $vehicleBrand)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VehicleBrand $vehicleBrand)
    {
        //
    }
}
