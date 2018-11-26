<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormAttributeSelectTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('form_attribute_selects', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('FormAttribute_id');
            $table->integer('key');
            $table->string('label',255);
            $table->longText('value');
            $table->boolean('checked')->nullable();
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
        Schema::dropIfExists('form_attribute_selects');
    }
}
