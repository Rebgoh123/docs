<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormData extends Model
{

    protected $table = 'form_data';
    protected $guarded = ['id', 'created_at', 'updated_at'];
}
