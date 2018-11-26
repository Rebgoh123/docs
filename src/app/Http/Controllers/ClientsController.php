<?php

namespace App\Http\Controllers;

use App\Clients;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;

use DB;

class ClientsController extends Controller
{
    public function allClient()
    {
        $clients = Clients::orderBy('id','ASC')->get();

        foreach ($clients as $client) {
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



        return response()->json(['status' => 'Successful',  'clients' => $clients,], 200);
    }

    public function idClient($id)
    {
        $client = Clients::find($id);

            if($client['AddressTypeID'] == 1) {
                $client['addressType'] ='Mailing Address';
            }else if ($client['AddressTypeID'] == 2){
                $client['addressType'] = 'Registered Address';
            } else {
                $client['AddressTypeID'] = 0;
                $client['addressType'] = 'Not Available';
            }

        if($client['Status'] == 1) {
            $client['statusType'] ='Active';
        }else {
            $client['statusType'] = 'Inactive';
            $client['Status'] = '0';
        }

        $client['Address'] = $client['Address1'] . "\r\n"
            . $client['Address2'] . "\r\n"
            . $client['Address'];

        return response()->json(['status' => 'Successful',  'client' => $client,], 200);
    }

    public function update(Request $request, $id)
    {

        try {

           if($request->get('AddressTemplateID') == null){

               DB::table('tblAddressTemplate')->insert([
                   'AddLine1' =>request('AddLine1'),
                   'AddLine2' =>request('AddLine2'),
                   'AddLine3' =>request('AddLine3'),
                   'PostalCode' =>request('PostalCode'),
                   'CountryId' =>request('CountryId')
               ]);

               DB::table('tblAddress')->insert([
                   'EntityId' =>$id,
                   'AddressTemplateId' =>DB::getPdo()->lastInsertId(),
                   'EffectiveOn' =>  date("Y/m/d") ,
                   'AddressTypeId' =>request('AddressTypeID'),
               ]);

               $client = Clients::find($id);

           } else {

                DB::table('tblAddressTemplate')
                   ->where('AddressTemplateID',$request->get('AddressTemplateID'))
                   ->update(
                       ['AddLine1' => request('AddLine1'),
                        'AddLine2' => request('AddLine2'),
                        'AddLine3' => request('AddLine3'),
                        'PostalCode' => request('PostalCode'),
                        'CountryId' => request('CountryId')]
                   );

               DB::table('tblAddress')
                   ->where('AddressID',$request->get('AddressID'))
                   ->update(
                       ['AddressTypeID' => request('AddressTypeID')]
                   );

               $this->updateIdStatusClient($id,request('Status'));

               $client = Clients::find($id);
           }


        } catch (\Illuminate\Database\QueryException $exception) {
            $errorInfo = $exception->errorInfo;

            return response()->json([ $errorInfo[2]], 422);
        }

        return response()->json(['status' => 'Successful', 'client' => request('Status')], 200);

    }

    public function updateIdStatusClient($id,$status)
    {
        try {

            DB::table('tblEntity')
                ->where('EntityID',$id)
                ->update(
                    ['Status' => $status]
                );

            $client = Clients::find($id);

        } catch (\Illuminate\Database\QueryException $exception) {
            $errorInfo = $exception->errorInfo;

            return response()->json([ $errorInfo[2]], 422);
        }

        return response()->json(['status' => 'Successful', 'client' =>$client], 200);
    }

}
