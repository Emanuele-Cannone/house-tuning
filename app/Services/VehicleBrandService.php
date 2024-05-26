<?php

namespace App\Services;

use App\Exceptions\VehicleException;
use App\Http\Requests\VehicleBrandStoreRequest;
use App\Http\Requests\VehicleStoreRequest;
use App\Http\Requests\VehicleUpdateRequest;
use App\Models\Vehicle;
use App\Models\VehicleBrand;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VehicleBrandService
{

    /**
     * @param VehicleBrandStoreRequest $request
     * @throws VehicleException
     */
    public function create(VehicleBrandStoreRequest $request): void
    {
        $validated = collect($request->validated());

        try {
            DB::beginTransaction();

            $vehicle = Vehicle::firstOrCreate([
                'name' => $validated->get('vehicle')
            ]);

            VehicleBrand::create([
                'vehicle_id' => $vehicle->id,
                'brand' => $validated->get('brand'),
                'name' => $validated->get('name')
            ]);

            DB::commit();

        } catch (Exception $e) {

            DB::rollBack();
            Log::error('Error on creation of brand', [$e->getMessage()]);
            throw new VehicleException();
        }
    }

    /**
     * @param VehicleUpdateRequest $request
     * @param Vehicle $vehicle
     * @return void
     * @throws VehicleException
     */
    public function update(VehicleUpdateRequest $request, Vehicle $vehicle): void
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            $vehicle->update($validated);

            DB::commit();

        } catch (Exception $e) {

            DB::rollBack();
            Log::error('Error on update vehicle', [$e->getMessage()]);
            throw new VehicleException();
        }
    }
}
