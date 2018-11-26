<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormAttributesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('form_attributes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('Form_id');
            $table->string('name',255);
            $table->string('type',50);
            $table->longText('value')->nullable();
            $table->integer('key');
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
        Schema::dropIfExists('form_attributes');
    }
}
