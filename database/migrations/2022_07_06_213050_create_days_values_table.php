<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDaysValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('days_values', function (Blueprint $table) {
            $table->id();
            $table->string('day')->unique();
            $table->integer('value');
            $table->unsignedBigInteger('matching_discount_id')->nullable();
            $table->unsignedBigInteger('opposite_discount_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('days_values');
    }
}
