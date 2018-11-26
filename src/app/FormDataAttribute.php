<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormDataAttribute extends Model
{
    protected $table = 'form_data_attributes';
    protected $guarded = ['created_at', 'updated_at'];
}
