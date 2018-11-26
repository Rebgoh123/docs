<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('templates', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',255)->unique();
            $table->string('description',500)->nullable();
            $table->integer('type');
            $table->longText('content');
            $table->tinyInteger('status')->default(1);;
            $table->timestamps();
        });

        Schema::create('template_modals', function (Blueprint $table) {
            $table->integer('template_id');
            $table->integer('modal_id');
            $table->primary(['template_id','modal_id']);
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('templates');
        Schema::dropIfExists('template_modals');
    }
}
