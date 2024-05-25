<?php

use App\Http\Requests\VehicleBrandStoreRequest;
use App\Models\Vehicle;
use App\Models\VehicleBrand;
use App\Services\VehicleBrandService;
use function Pest\Laravel\assertDatabaseCount;
use function Pest\Laravel\assertDatabaseHas;

test('create brand', function () {

    $service = new VehicleBrandService();

    $vehicle = Vehicle::factory()
        ->create();

    $request = mock(VehicleBrandStoreRequest::class);

    $request->shouldReceive('validated')
        ->withNoArgs()
        ->andReturn(
            [
                'vehicle' => $vehicle->name,
                'brand' => 'testBrand',
                'name' => 'testName',
            ]
        );

    $service->create($request);

    assertDatabaseCount(VehicleBrand::class, 1);

});
