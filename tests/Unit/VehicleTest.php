<?php

use App\Exceptions\VehicleException;
use function Pest\Laravel\{actingAs, delete, put, post, assertDatabaseCount, assertDatabaseHas, assertDatabaseMissing};


beforeEach(function () {
    $this->user = App\Models\User::create([
        'name' => 'Test',
        'email' => 'test@test.it',
        'password' => 'prova123'
    ]);
});

test('create vehicle', function () {

    actingAs($this->user)
        ->get('dashboard')
        ->assertOk();

    post(route('vehicle.store', [
        'name' => 'TEST'
    ]))
        ->assertRedirect(route('vehicle.index'));

    assertDatabaseCount('vehicles', 1);
    assertDatabaseHas('vehicles', [
        'name' => 'TEST'
    ]);

});

test('exception on create duplicated vehicle', function () {

    actingAs($this->user)
        ->get('dashboard')
        ->assertOk();

    post(route('vehicle.store', [
        'name' => 'TEST'
    ]))
        ->assertRedirect(route('vehicle.index'));

    post(route('vehicle.store', [
        'name' => 'TEST'
    ]))
        ->assertStatus(302)
        ->withException(new VehicleException());

    assertDatabaseCount('vehicles', 1);
    assertDatabaseHas('vehicles', [
        'name' => 'TEST'
    ]);

});

test('edit vehicle', function () {

    actingAs($this->user)
        ->get('dashboard')
        ->assertOk();

    post(route('vehicle.store', [
        'name' => 'TEST'
    ]))
        ->assertRedirect(route('vehicle.index'));

    put(route('vehicle.update', [
        'name' => 'TEST-UPDATE',
        'vehicle' => \App\Models\Vehicle::where('name', 'TEST')->first()
    ]))
        ->assertRedirect(route('vehicle.index'));


    assertDatabaseCount('vehicles', 1);
    assertDatabaseHas('vehicles', [
        'name' => 'TEST-UPDATE'
    ]);
});

test('edit vehicle with same info', function () {

    actingAs($this->user)
        ->get('dashboard')
        ->assertOk();

    post(route('vehicle.store', [
        'name' => 'TEST'
    ]))
        ->assertRedirect(route('vehicle.index'));

    put(route('vehicle.update', [
        'name' => 'TEST',
        'vehicle' => \App\Models\Vehicle::where('name', 'TEST')->first()
    ]))
        ->assertRedirect(route('vehicle.index'));


    assertDatabaseCount('vehicles', 1);
    assertDatabaseHas('vehicles', [
        'name' => 'TEST'
    ]);

});

test('exception on edit vehicle with existing item', function () {

    actingAs($this->user)
        ->get('dashboard')
        ->assertOk();

    post(route('vehicle.store', [
        'name' => 'TEST'
    ]))
        ->assertRedirect(route('vehicle.index'));

    post(route('vehicle.store', [
        'name' => 'OTHER-TEST'
    ]))
        ->assertRedirect(route('vehicle.index'));

    put(route('vehicle.update', [
        'name' => 'OTHER-TEST',
        'vehicle' => \App\Models\Vehicle::where('name', 'TEST')->first()
    ]))
        ->assertStatus(302)
        ->withException(new VehicleException());

    assertDatabaseCount('vehicles', 2);

    expect(\App\Models\Vehicle::where('name', 'TEST')->first())
        ->toMatchArray(
            [
                'name' => 'TEST'
            ]
        );

});

test('delete vehicle', function() {

    actingAs($this->user)
        ->get('dashboard')
        ->assertOk();

    post(route('vehicle.store', [
        'name' => 'TEST'
    ]))
        ->assertRedirect(route('vehicle.index'));

    $vehicle = \App\Models\Vehicle::where('name', 'TEST')->first();

    delete(route('vehicle.destroy', [
        'vehicle' => $vehicle
    ]))
        ->assertRedirect(route('vehicle.index'));

    assertDatabaseMissing('vehicles', [$vehicle]);

});
