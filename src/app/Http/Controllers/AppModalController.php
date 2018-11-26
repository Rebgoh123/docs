<?php

namespace App\Http\Controllers;

use App\AppModal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AppModalController extends Controller
{
    public function allClientActive()
    {
        $modals = AppModal::orderBy('id','ASC')->where('Status', '=', 1)->get();

        foreach ($modals as $modal) {
            $modal['value'] = $modal['id'];
            $modal['label'] = $modal['name'];

            if($modal['Status'] == 1) {
                $modal['statusType'] ='Active';
            }else {
                $modal['statusType'] = 'Inactive';
            }
        }

        return response()->json(['status' => 'Successful',  'modals' => $modals,], 200);
    }

}
