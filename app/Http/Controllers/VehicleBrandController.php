<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\VehicleBrand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class VehicleBrandController extends Controller
{
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
        return Inertia::render('Brand/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
