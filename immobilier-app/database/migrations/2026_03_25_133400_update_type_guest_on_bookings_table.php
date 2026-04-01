<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Use raw SQL to alter enum if on MySQL, or use Change if supported
        // For portability and robustness in Laravel migrations:
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('type_guest', 50)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->enum("type_guest",["Males","Family","Professional visitors","Females"])->change();
        });
    }
};
