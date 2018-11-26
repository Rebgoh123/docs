<?php

namespace App\Http\Controllers;

use App\Form;
use App\FormModal;
use App\FormData;
use App\FormDataAttribute;
use App\FormDataAttributeSelect;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Carbon\Carbon;

class FormDataController extends Controller
{

    public function formDataExist(Request $request){

        $formData = FormData::where(['Entity_Id'=>$request->entityId,'Form_Id'=>$request->formId])->get();

        return response()->json(['status' => 'Successful',  'form' => $formData], 200);
    }

    public function idFormData(Request $request)
    {

        $form = DB::table('forms')->where('id',$request->formID)->get();
        $formsAttribute = DB::table('form_attributes')->where('Form_id',$request->formID)->get();

        $formsDataAttribute = DB::table('form_data_attributes')->where('formData_id',$request->formDataID)->get();

        $formDataId = $formsDataAttribute[0]->FormData_id;
        foreach ($formsAttribute as $formAttribute) {

            foreach ($formsDataAttribute as $formDataAttribute) {
                if ($formAttribute->id == $formDataAttribute->FormAttribute_id) {
                    $formAttribute->value = $formDataAttribute->value;
                    break;
                }
            }

            if ($formAttribute->type == 'Select' || $formAttribute->type == 'Radio' )
            {
                $formAttributeSelect = DB::table('form_attribute_selects')->where('FormAttribute_id', $formAttribute->id)->get();
                $formAttribute->select = $formAttributeSelect;

                $selects = $formAttribute->select;
                foreach ($selects as $select) {
                    if ($select->checked == '0') {
                        $select->checked = false;
                    } else {
                        $select->checked = true;
                    }
                }

            } else if ($formAttribute->type == 'Checkbox') {
                $formAttributeSelect = DB::table('form_data_attributes_select')->where('FormData_id', $formDataId)->where('FormAttribute_id', $formAttribute->id)->get();
                $formAttribute->select = $formAttributeSelect;

                $selects = $formAttribute->select;
                foreach ($selects as $select) {
                    if ($select->checked == '0') {
                        $select->checked = false;
                    } else {
                        $select->checked = true;
                    }
                }
            }
        }
        $formDetails['form']=$form;
        $formDetails['formAttributes']=$formsAttribute;
        $formDetails['formDataId'] = $formsDataAttribute[0]->FormData_id;
        $formDetails['data'] = true;

        return response()->json(['status' => 'Successful',  'form' => $formDetails], 200);
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            //create a data entry for each value
            $values = $request->value;


            $formData = formData::create([
                'Form_id' => $request->formID,
                'Entity_id' => $request->entityID,
            ]);

            foreach ($values as $value) {

            $formDataAttribute = formDataAttribute::create([
                'FormData_id' => $formData->id,
                'FormAttribute_id' => $value['id'],
                'value' => $value['value'],
            ]);

            if($value['type']=='Checkbox'){
                foreach ($value['select'] as $valueSelect) {
                    $formDataAttributeSelect = FormDataAttributeSelect::create([
                        'FormData_id' => $formData->id,
                        'FormAttribute_id' => $valueSelect['FormAttribute_id'],
                        'key' => $valueSelect['key'],
                        'label' => $valueSelect['label'],
                        'value' => $valueSelect['value'],
                        'checked' => $valueSelect['checked'],
                    ]);
                }
            }

                }

            DB::commit();
        }
        catch
            (\Illuminate\Database\QueryException $exception) {
                DB::rollBack();

                $errorInfo = $exception->errorInfo;

                if ($errorInfo[1] == 1062) {

                    return response()->json(['error' => 'Duplicate Form'], 422);

                }
                return response()->json([$errorInfo[2]], 422);
            }
        return response()->json(['status' => 'Successful', 'form' => $formData], 201);

    }

    public function update(Request $request,$idl)
    {
        try {
            DB::beginTransaction();
            //create a data entry for each value
            $values = $request->value;

            foreach ($values as $value) {

                $formData= formDataAttribute::where(['formData_id'=>$idl,'FormAttribute_id'=>$value['id']])
                    ->update(['value'=>$value['value']]);

                if($value['type']=='Checkbox'){
                    foreach ($value['select'] as $valueSelect) {
                        $formDataAttributeSelect = FormDataAttributeSelect::where([
                            'FormData_id' => $idl,
                            'FormAttribute_id' => $valueSelect['FormAttribute_id'],
                            'key' => $valueSelect['key']])
                        ->update([
                            'checked' => $valueSelect['checked'],
                        ]);
                    }
                }
            }

            DB::commit();
        }
        catch
        (\Illuminate\Database\QueryException $exception) {
            DB::rollBack();

            $errorInfo = $exception->errorInfo;

            if ($errorInfo[1] == 1062) {

                return response()->json(['error' => 'Duplicate Form'], 422);

            }
            return response()->json([$errorInfo[2]], 422);
        }
        return response()->json(['status' => 'Successful', 'form' => $formData], 201);
    }
}
