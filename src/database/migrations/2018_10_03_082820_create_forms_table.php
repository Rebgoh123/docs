<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',255)->unique();
            $table->string('description',500)->nullable();
            $table->integer('type');
            $table->integer('size');
            $table->tinyInteger('status')->default(1);
            $table->boolean('online');
            $table->integer('day');
            $table->timestamps();
        });

        Schema::create('form_modals', function (Blueprint $table) {
            $table->integer('modal_id');
            $table->integer('Form_id');
            $table->primary(['form_id','modal_id']);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forms');
        Schema::dropIfExists('form_modals');
    }
}
