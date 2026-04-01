<?php

namespace App\Http\Controllers\dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppResources\ClientProfileResource;
use App\Http\Resources\DashboardResource\ClientResource;
use App\Models\User;
use App\Models\UserType;
use App\utils\JsonResponses;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Throwable;

class ClientController extends Controller
{
    use JsonResponses;
    public function index()
    {
        $clients = User::whereHas("type", function ($query) {
            $query->where("code", "=", "client")
                ->where("from_platform", "=", "0");
        })->get();
        $response = ClientResource::collection($clients);
        return $this->successResponse($response);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => ["nullable", "email", "unique:users,email"],
            "firstName" => ["required"],
            "lastName" => ["required"],
            "documents" => ["array"],
            "tel" => ["regex:/^\d{10,}$/"],
            "documentsProvided" => ["array"],
            "documents.*" => ["image", "mimes:png,jpg,jpeg"]
        ]);
        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }
        $data = $validator->validated();
        $data["first_name"] = $data["firstName"];
        $data["last_name"] = $data["lastName"];
        $data["email"] = isset($data["email"]) ? $data["email"] : $data["firstName"] . $data["lastName"] . time() . "@gmail.com";
        $data["password"] = Hash::make($data["firstName"] . $data["lastName"]);

        $type = UserType::where("code", "=", "client")->first();
        $data["type_id"] = $type->id;
        $data["from_platform"] = 0;
        $data["documents"] = implode(";", $request->input("documentsProvided"));

        DB::beginTransaction();

        try {
            $client = User::create($data);
            $documents = $request->file("documents");
            if (isset($documents)) {
                for ($i = 0; $i < count($documents); $i++) {
                    $image = $documents[$i];
                    $ext = $image->getClientOriginalExtension();
                    $fileName = ($i + 1) . "." . $ext;
                    $client->addMedia($image)->usingFileName($fileName)->toMediaCollection("documents");
                }
            }
            DB::commit();
            return $this->successResponse(new ClientResource($client));
        } catch (Throwable $th) {
            DB::rollBack();
            Log::error($th);
            return $this->serverErrorResponse(null);
        }
    }

    public function show(Request $request, $id)
    {
        $client = User::with("bookings.realestate")->find($id);
        $response = new ClientResource($client);
        return $this->successResponse($response);
    }

    public function update(Request $request, $id)
    {
        $client = User::findOrFail($id);
        $validator = Validator::make($request->all(), [
            "email" => ["sometimes", "email", "unique:users,email," . $id],
            "firstName" => ["sometimes"],
            "lastName" => ["sometimes"],
            "tel" => ["sometimes", "regex:/^\d{10,}$/"],
            "documentsProvided" => ["sometimes", "array"],
            "trashDocuments" => ["sometimes", "array"],
            "trashDocuments.*" => ["sometimes", "integer"],
            "documents" => ["sometimes", "array"],
            "documents.*" => ["image", "mimes:png,jpg,jpeg"]
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        $data = $validator->validated();
        if (isset($data["firstName"])) $data["first_name"] = $data["firstName"];
        if (isset($data["lastName"])) $data["last_name"] = $data["lastName"];
        if (isset($data["documentsProvided"])) $data["documents"] = implode(";", $data["documentsProvided"]);

        DB::beginTransaction();

        try {
            $client->update($data);

            // Add new documents
            $documents = $request->file("documents");
            if (isset($documents)) {
                $start = $client->getMedia("documents")->max("id") ?? 0;
                foreach ($documents as $i => $image) {
                    $ext = $image->getClientOriginalExtension();
                    $fileName = (++$start) . "." . $ext;
                    $client->addMedia($image)->usingFileName($fileName)->toMediaCollection("documents");
                }
            }

            // Delete documents
            if ($request->has("trashDocuments")) {
                foreach ($request->input("trashDocuments") as $docId) {
                    $client->getMedia("documents")->where("id", $docId)->first()?->delete();
                }
            }

            DB::commit();
            return $this->successResponse(new ClientResource($client));
        } catch (Throwable $th) {
            DB::rollBack();
            Log::error($th);
            return $this->serverErrorResponse(null);
        }
    }
}
