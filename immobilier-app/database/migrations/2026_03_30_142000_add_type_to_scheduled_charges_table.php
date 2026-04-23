<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('scheduled_charges', function (Blueprint $table) {
            $table->string('type')->default('fixed')->after('amount'); // fixed, variable
        });
    }

    public function down(): void
    {
        Schema::table('scheduled_charges', function (Blueprint $table) {
            $table->dropColumn(['type']);
        });
    }
};
