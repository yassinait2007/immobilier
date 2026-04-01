<?php

use App\Http\Controllers\app\CategoryController;
use App\Http\Controllers\app\CityController;
use App\Http\Controllers\app\EtatController;
use App\Http\Controllers\app\FeaturesController;
use App\Http\Controllers\app\PublicRealEstateController;
use App\Http\Controllers\app\RegionController;
use App\Http\Controllers\app\TransactionTypeController;
use App\Http\Controllers\dashboard\AnounceController;
use App\Http\Controllers\dashboard\AuthController;
use App\Http\Controllers\dashboard\BookingController;
use App\Http\Controllers\dashboard\ChargeController;
use App\Http\Controllers\dashboard\ClientController;
use App\Http\Controllers\dashboard\ContractsController;
use App\Http\Controllers\dashboard\ManagerController;
use App\Http\Controllers\dashboard\OwnerController;
use App\Http\Controllers\dashboard\RapportController;
use App\Http\Controllers\dashboard\RealestateController;
use App\Http\Controllers\dashboard\ScheduledChargeController;
use App\Http\Controllers\dashboard\SlidesController;
use App\Http\Controllers\dashboard\StatistiquesController;
use App\Http\Controllers\dashboard\TransfersController;
use Illuminate\Support\Facades\Route;


Route::get("/dashboard-test", function () {
    return "dashboard-test";
});

Route::prefix("transactions")->group(function () {
    Route::post("/", [TransfersController::class, "addTransfert"]);
})->middleware("auth:sanctum");

Route::post("login", [AuthController::class, "login"]);


Route::prefix("realestates")->group(function () {
    Route::get("/categories", [CategoryController::class, "index"]);
    Route::get("/transaction-types", [TransactionTypeController::class, "index"]);
    Route::get("/etats", [EtatController::class, "index"]);
});
Route::get("/regions", [RegionController::class, "index"]);
Route::get("/cities", [CityController::class, "index"]);
Route::get("/features", [FeaturesController::class, "index"]);



Route::group(["middleware" => ["auth:managers"]], function () {
    Route::get("/me", [AuthController::class, "me"]);
    Route::resource("realestates", RealestateController::class);
    Route::post("realestates/{id}", [RealestateController::class, 'update']);
    Route::resource("owners", OwnerController::class);
    Route::get("realestates/{id}", [RealestateController::class, "index"]);
    Route::get("/bookings", [BookingController::class, 'index']);
    Route::post("/bookings", [BookingController::class, 'store']);
    //Route::post("/clients", [ClientController::class, 'store']);
    Route::resource('clients', ClientController::class);
    Route::post("clients/{id}", [ClientController::class, 'update']);
    Route::resource("contracts", ContractsController::class);
    Route::resource("charges", ChargeController::class);
    Route::resource("scheduled-charges", ScheduledChargeController::class);
    Route::get("/stats", [StatistiquesController::class, "stats"]);
    Route::get("/global-stats", [StatistiquesController::class, "globalStats"]);
    Route::get("/sliders", [SlidesController::class, "index"]);
    Route::post("/sliders", [SlidesController::class, "store"]);
    Route::patch("/sliders/{id}/activate", [SlidesController::class, "activate"]);
    Route::resource("managers", ManagerController::class);
    Route::get("/anounces", [AnounceController::class, "index"]);
    Route::patch("/anounces/{id}/accept", [AnounceController::class, "acceptAnounce"]);
    Route::patch("/anounces/{id}/refuse", [AnounceController::class, "refuseAnounce"]);
    Route::resource("rapports", RapportController::class);

    Route::patch("/realestates/{id}/confirm-depart", [RealestateController::class, "confirmDepart"]);
    Route::patch("/realestates/{id}/confirm-checkin", [RealestateController::class, "confirmCheckin"]);
    Route::patch("/realestates/{id}/finish-cleaning", [RealestateController::class, "finishCleaning"]);
    Route::get("/realestates-overview", [RealestateController::class, "realestatesOverview"]);

    Route::get("/roles", [ManagerController::class, 'roles']);

    Route::post("/bookings/{id}/extend", [BookingController::class, "extendBooking"]);
    Route::post("/bookings/{id}/shrink", [BookingController::class, "shrink"]);
    Route::delete("/bookings/{id}", [BookingController::class, "destroy"]);

    Route::put("/managers/{id}", [ManagerController::class, "update"]);
    Route::delete("/managers/{id}", [ManagerController::class, "destroy"]);
    Route::get("/managers/{id}", [ManagerController::class, "show"]);
});
