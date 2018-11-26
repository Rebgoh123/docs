<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('form_data', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('Entity_Id');
            $table->integer('Form_Id');
            $table->timestamps();
        });

        Schema::create('form_data_attributes', function (Blueprint $table) {
            $table->integer('FormData_id');
            $table->integer('FormAttribute_id');
            $table->longText('value');
            $table->timestamps();
        });

        Schema::create('form_data_attributes_select', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('FormData_id');
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
        Schema::dropIfExists('form_data');
        Schema::dropIfExists('form_data_attributes');
        Schema::dropIfExists('form_data_attributes_select');
    }
}
