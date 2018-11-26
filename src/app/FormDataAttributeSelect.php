<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FormDataAttributeSelect extends Model
{
    protected $table = 'form_data_attributes_select';
    protected $guarded = ['created_at', 'updated_at'];
}
