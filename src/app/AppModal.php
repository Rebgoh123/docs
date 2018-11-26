<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppModal extends Model
{
    protected $table = 'app_models';
    protected $guarded = ['id', 'created_at', 'updated_at'];

}
