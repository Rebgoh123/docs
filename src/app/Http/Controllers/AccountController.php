<?php

namespace App\Http\Controllers;

use App\Account;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;

use DB;

class AccountController extends Controller
{
    public function allAccount()
    {
        $accounts = Account::orderBy('id','ASC')->get();

        foreach ($accounts as $client) {
            $client['address'] = $client['Address1'] . ' '. $client['Address2'] . ' ' . $client['Address3'];

            if($client['Status'] == 1) {
                $client['statusType'] ='Active';
            }else {
                $client['statusType'] = 'Inactive';
                $client['Status'] = 0;
            }

            if($client['AddressTypeID'] == 1) {
                $client['addressType'] ='Mailing Address';
            }else if ($client['AddressTypeID'] == 2){
                $client['addressType'] = 'Registered Address';
            } else {
                $client['addressType'] = 'Not Available';
            }
        }


        return response()->json(['status' => 'Successful',  'accounts' => $accounts,], 200);
    }

    public function idAccount($id)
    {
        $account= Account::find($id);


        $account['Address'] = $account['Address1'] . ' '. $account['Address2'] . ' ' . $account['Address3'];

            if($account['Status'] == 1) {
                $account['statusType'] ='Active';
            }else {
                $account['statusType'] = 'Inactive';
                $account['Status'] = 0;
            }

            if($account['AddressTypeID'] == 1) {
                $account['addressType'] ='Mailing Address';
            }else if ($account['AddressTypeID'] == 2){
                $account['addressType'] = 'Registered Address';
            } else {
                $account['addressType'] = 'Not Available';
            }


//        $url = URL::temporarySignedRoute('frs116/acknowledgement', now()->addDays(7), ['user' =>$client->id]);
//        $client['url'] = $url;

        return response()->json(['status' => 'Successful',  'account' => $account,], 200);
    }

}
