<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('charges', function (Blueprint $table) {
            $table->string('status')->default('pending')->after('amount'); // pending, paid, cancelled
            $table->string('type')->default('fixed')->after('status'); // fixed, variable
            $table->string('verification_document')->nullable()->after('document');
        });
    }

    public function down(): void
    {
        Schema::table('charges', function (Blueprint $table) {
            $table->dropColumn(['status', 'type', 'verification_document']);
        });
    }
};
