<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scheduled_charges', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->double('amount');
            $table->string('recurrence_type'); // weekly, monthly, yearly
            $table->string('recurrence_value')->nullable(); // day of week, day of month, etc.
            $table->foreignId('realestate_id')->constrained('realstates');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scheduled_charges');
    }
};
