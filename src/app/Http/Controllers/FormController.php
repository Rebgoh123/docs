<?php

namespace App\Http\Controllers;

use App\Form;
use App\Template;
use App\TemplateModal;
use App\FormModal;
use App\FormTemplate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use DB;
use Carbon\Carbon;
use Storage;

class FormController extends Controller
{



    public function formType()
    {
        $types = DB::table('form_types')->where('status', '=', 1)->get();

        foreach ($types as $type) {
            $type->value = $type->id;
            $type->label = $type->name;

        }

        return response()->json(['status' => 'Successful',  'forms' => $types,], 200);

    }


    public function allForm()
    {
        $forms = form::orderBy('id','ASC')->get();

        foreach ($forms as $form) {

            if($form['online'] == 1) {
                $form['onlineType'] = 'Offline';
            }else {
                $form['onlineType'] = 'Online';
            }

        }

        return response()->json(['status' => 'Successful',  'forms' => $forms,], 200);
    }

    public function idForm($id)
    {

      $form = DB::table('forms')
          ->leftJoin('form_modals', 'form_modals.form_id', '=', 'forms.id')
//          ->leftJoin('form_templates', 'form_templates.form_id', '=', 'forms.id')
          ->where('id',$id)->get();

        if($form[0]->online == 1) {
            $form[0]->online = false;
        }else {
            $form[0]->online = true;
        }

        $form[0]->modal= (int)$form[0]->modal_id;

      $formsAttribute = DB::table('form_attributes')->where('Form_id',$id)->get();

        foreach ($formsAttribute as $formAttribute) {

          if($formAttribute->type == 'Select' || $formAttribute->type == 'Radio'  || $formAttribute->type == 'Checkbox')
          {
              $formAttributeSelect = DB::table('form_attribute_selects')->where('FormAttribute_id',$formAttribute->id)->get();
              $formAttribute->select = $formAttributeSelect;

              $selects = $formAttribute->select;
              foreach ($selects as $select) {
                  if($select->checked == '0'){
                      $select->checked=false;
                  }else{
                      $select->checked=true;
                  }
              }
          }

        }

        $formDetails['form']=$form;
        $formDetails['formAttributes']=$formsAttribute;
        $formDetails['data'] = false;

        return response()->json(['status' => 'Successful',  'form' => $formDetails, 'data'=>false], 200);
    }

    public function idFormTemplate($id)
    {
        $forms = DB::table('form_templates')
            ->where('form_templates.form_id', '=', $id)
            ->get();

        return response()->json(['status' => 'Successful', 'form' => $forms,], 200);
    }

    public function idModalForm(Request $request)
    {
        $forms = DB::table('forms')
            ->select(DB::raw('distinct forms.*, form_data.id as form_data_id, form_data.updated_at as form_data_last_updated , CASE WHEN form_data.id is null THEN \'Incompleted\' ELSE \'Completed\' END as FormStatus'))
            ->leftJoin('form_modals', 'form_modals.form_id', '=', 'forms.id')
            ->leftJoin(
                DB::raw('(select * from form_data where form_data.entity_id = ? )form_data'), 'form_data.form_id', '=', 'forms.id'
            )
            ->addBinding($request->entity_id, 'select')
            ->where('form_modals.modal_id', '=', $request->modal_id)
            ->get();


        foreach ($forms as $form) {

            if($form->online !== 1) {
                $url =   URL::temporarySignedRoute('form',now()->addDays($form->day), [
                    'id' => $request->entity_id,
                    'formId' => $form->id,
                    'name' => $form->name,
                    'day' => $form->day,
                ]);

                $form->url = $url;
            }

        }




        return response()->json(['status' => 'Successful', 'form' => $forms,], 200);
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $online = $request->online === true ? 0 : 1;

            //create form
            $form = form::create([
                'name' => $request->name,
                'description' => $request->description,
                'type' => $request->type,
                'size' => $request->size,
                'online' => $online,
                'day' => $request->day,
            ]);

            $formModal = FormModal::create([
                'form_id' => $form->id,
                'modal_id'=> $request->modal
            ]);

            $attributes = request('attributes');

            foreach ($attributes as $attribute) {
                switch ($attribute['type']) {
                    default:
                        DB::table('form_attributes')->insert([
                            'Form_id' => $form->id,
                            'name' =>$attribute['name'],
                            'type' =>$attribute['type'],
                            'value' => $attribute['value'],
                            'key' => $attribute['key'],
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now()
                        ]);
                        break;
                    case "Checkbox":
                    case "Select":
                    case "Radio":
                    DB::table('form_attributes')->insert([
                        'Form_id' => $form->id,
                        'name' =>$attribute['name'],
                        'type' =>$attribute['type'],
                        'value' => $attribute['value'],
                        'key' => $attribute['key'],
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ]);

                    $formAttributeId = DB::getPdo()->lastInsertId();
                    $attributesSelect = $attribute['select'];

                    foreach ($attributesSelect as $attributeSelect) {
//                      $checked= isset($attributeSelect['checked']) ? $attributeSelect['checked'] : 1;

                        $check = isset($attributeSelect['checked']) ? $attributeSelect['checked'] : false; // pull post data from form

                        if ($check) {
                            $checked = $check;
                        } else {
                            $checked = false;
                        }

                    DB::table('form_attribute_selects')->insert([
                        'FormAttribute_id' =>$formAttributeId,
                        'key' =>$attributeSelect['key'],
                        'label' =>  $attributeSelect['label'] ,
                        'value' =>$attributeSelect['value'],
                        'checked' =>$checked,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ]);

                }
                    break;
                    case "PDF":
                    case "Image":

                        $data = $attribute['value'];
                        $check = substr($data,0,4);

                        if($check == 'data') {
                            list($type, $data) = explode(';', $data);
                            list(, $data) = explode(',', $data);

                            $data = base64_decode($data);

                        } else {
                            $data = Storage::get('public' . substr($data,8));
                        }

                        if($attribute['type']==='Image') {
                            $image_name = time() . '.png';
                        }else {
                            $image_name = time() . '.pdf';
                        }

                        //create new directory
                        $path = 'public/form/'.$attribute['type'].'/' . $request->name . '/';
                        $result = Storage::makeDirectory($path);

                        if ($result) {
                            $path = 'public/form/'.$attribute['type'].'/' .  $request->name . '/' . $image_name;

                        } else {
                            'public/form/'.$attribute['type'].'/' . $image_name;
                        }

                        Storage::put($path, $data);

                        $attribute['value'] = '/storage/form/'.$attribute['type'].'/' . $request->name . '/' . $image_name;

                        DB::table('form_attributes')->insert([
                            'Form_id' => $form->id,
                            'name' =>$attribute['name'],
                            'type' =>$attribute['type'],
                            'value' => $attribute['value'],
                            'key' => $attribute['key'],
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now()
                        ]);
                        break;
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
        return response()->json(['status' => 'Successful', 'form' => $form], 201);

    }

    public function storeFormTemplate(Request $request){
        try {
            DB::beginTransaction();

            $online = $request->online === true ? 0 : 1;
            //create form
            $form = form::create([
                'name' => $request->formName,
                'description' => $request->formDescription,
                'type' => $request->type,
                'size' => $request->size,
                'online' => $online,
                'day' => $request->day,
            ]);

            $formModal = FormModal::create([
                'form_id' => $form->id,
                'modal_id'=> $request->formModal
            ]);

            $attributes = request('attributes');

            foreach ($attributes as $attribute) {
                switch ($attribute['type']) {
                    default:
                        DB::table('form_attributes')->insert([
                            'Form_id' => $form->id,
                            'name' =>$attribute['name'],
                            'type' =>$attribute['type'],
                            'value' => $attribute['value'],
                            'key' => $attribute['key'],
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now()
                        ]);
                        break;
                    case "Checkbox":
                    case "Select":
                    case "Radio":
                        DB::table('form_attributes')->insert([
                            'Form_id' => $form->id,
                            'name' =>$attribute['name'],
                            'type' =>$attribute['type'],
                            'value' => $attribute['value'],
                            'key' => $attribute['key'],
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now()
                        ]);

                        $formAttributeId = DB::getPdo()->lastInsertId();
                        $attributesSelect = $attribute['select'];

                        foreach ($attributesSelect as $attributeSelect) {
//                      $checked= isset($attributeSelect['checked']) ? $attributeSelect['checked'] : 1;

                            $check = isset($attributeSelect['checked']) ? $attributeSelect['checked'] : false; // pull post data from form

                            if ($check) {
                                $checked = $check;
                            } else {
                                $checked = false;
                            }

                            DB::table('form_attribute_selects')->insert([
                                'FormAttribute_id' =>$formAttributeId,
                                'key' =>$attributeSelect['key'],
                                'label' =>  $attributeSelect['label'] ,
                                'value' =>$attributeSelect['value'],
                                'checked' =>$checked,
                                'created_at' => Carbon::now(),
                                'updated_at' => Carbon::now()
                            ]);
                        }
                        break;
                    case "PDF":
                    case "Image":

                        $data = $attribute['value'];
                        $check = substr($data,0,4);

                        if($check == 'data') {
                            list($type, $data) = explode(';', $data);
                            list(, $data) = explode(',', $data);

                            $data = base64_decode($data);

                        } else {
                            $data = Storage::get('public' . substr($data,8));
                        }

                        if($attribute['type']==='Image') {
                            $image_name = time() . '.png';
                        }else {
                            $image_name = time() . '.pdf';
                        }

                        //create new directory
                        $path = 'public/form/'.$attribute['type'].'/' . $request->name . '/';
                        $result = Storage::makeDirectory($path);

                        if ($result) {
                            $path = 'public/form/'.$attribute['type'].'/' .  $request->name . '/' . $image_name;

                        } else {
                            'public/form/'.$attribute['type'].'/' . $image_name;
                        }

                        Storage::put($path, $data);

                        $attribute['value'] = '/storage/form/'.$attribute['type'].'/' . $request->name . '/' . $image_name;

                        DB::table('form_attributes')->insert([
                            'Form_id' => $form->id,
                            'name' =>$attribute['name'],
                            'type' =>$attribute['type'],
                            'value' => $attribute['value'],
                            'key' => $attribute['key'],
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now()
                        ]);
                        break;
                }
            }

            $title = $request->templateName;
            $content = $request->templateContent;

            $contentArray = json_decode($content, true);

            if (sizeof($contentArray['entityMap']) > 0) {
                $k = 0;
                foreach ($contentArray['entityMap'] as $key => $content) {
                    $k++;
                    if ($content['type'] == 'IMAGE') {

                        $data = $content['data']['src'];
                        $check = substr($data,0,4);

                        if($check == 'data') {
                            list($type, $data) = explode(';', $data);
                            list(, $data) = explode(',', $data);

                            $data = base64_decode($data);

                        } else {
                            $data = Storage::get('public' . substr($data,8));
                        }

                        $image_name = time() . $k . '.png';

                        //create new directory
                        $path = 'public/templateImage/' . $title . '/';
                        $result = Storage::makeDirectory($path);

                        if ($result) {
                            $path = 'public/templateImage/' . $title . '/' . $image_name;

                        } else {
                            $path = 'public/templateImage/' . $image_name;
                        }

                        Storage::put($path, $data);

                        $contentArray['entityMap'][$key]['data']['src'] = '/storage/templateImage/' . $title . '/' . $image_name;
                    }
                }
            }
            $template_content = json_encode($contentArray, JSON_UNESCAPED_UNICODE);

            $template = Template::create([
                'name' => $title,
                'description' => $request->templateDescription,
                'type' =>  $request->type,
                'content' => $template_content
            ]);

            $templateModal = TemplateModal::create([
                'template_id' => $template->id,
                'modal_id'=> $request->templateModal
            ]);

            $formTemplate = FormTemplate::create([
                'template_id' => $template->id,
                'form_id'=> $form->id
            ]);

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
        return response()->json(['status' => 'Successful', 'form' => $form], 201);

    }

    public function update(Request $request,$id)
    {
        try {
            DB::beginTransaction();

            $online = $request->get('online') === true ? 0 : 1;

            $form = form::find($id);
            $form->name = $request->get('name');
            $form->description = $request->get('description');
            $form->size = $request->get('size');
            $form->online = $online;
            $form->day =  $request->get('day');
            $form->type = $request->get('type');
            $form->updated_at = Carbon::now();
            $form->save();

            $formData= FormModal::where(['form_id'=>$form->id])
                ->update(['modal_id'=> $request->get('modal')]);




            DB::table('form_attribute_selects')
                ->whereRaw('FormAttribute_id in 
            (select distinct form_attribute_selects.FormAttribute_id 
                from form_attributes
                left join form_attribute_selects
                on form_attributes.id = form_attribute_selects.FormAttribute_id
                where form_id =' . $id . ' and FormAttribute_id is not null)')
                ->delete();

            DB::table('form_attributes')->where('Form_id', $id)->delete();

            $attributes = request('attributes');

            foreach ($attributes as $attribute) {

                switch ($attribute['type']) {
                    default:
                        DB::table('form_attributes')->insert([
                            'Form_id' => $form->id,
                            'name' =>$attribute['name'],
                            'type' =>$attribute['type'],
                            'value' => $attribute['value'],
                            'key' => $attribute['key'],
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now()
                        ]);
                        break;
                    case "Checkbox":
                    case "Select":
                    case "Radio":
                        DB::table('form_attributes')->insert([
                            'Form_id' => $form->id,
                            'name' =>$attribute['name'],
                            'type' =>$attribute['type'],
                            'value' =>  isset($attributeSelect['FormAttribute_id']),
                            'key' => $attribute['key'],
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now()
                        ]);

                        $formAttributeId = DB::getPdo()->lastInsertId();
                        $attributesSelect = $attribute['select'];

                        foreach ($attributesSelect as $attributeSelect) {

                            $check = isset($attributeSelect['checked']) ? $attributeSelect['checked'] : false; // pull post data from form

                            if ($check) {
                                $checked = $check;
                            } else {
                                $checked = false;
                            }

                            DB::table('form_attribute_selects')->insert([
                                'FormAttribute_id' =>$formAttributeId,
                                'key' =>$attributeSelect['key'],
                                'label' =>  $attributeSelect['label'] ,
                                'value' =>$attributeSelect['value'],
                                'checked' =>$checked,
                                'created_at' => Carbon::now(),
                                'updated_at' => Carbon::now()
                            ]);

                        }
                      break;
                    case "PDF":
                    case "Image":

                        $data = $attribute['value'];
                        $check = substr($data,0,4);

                        if($check == 'data') {
                            list($type, $data) = explode(';', $data);
                            list(, $data) = explode(',', $data);

                            $data = base64_decode($data);

                        } else {
                            $data = Storage::get('public' . substr($data,8));
                        }

                        if($attribute['type']==='Image') {
                            $image_name = time() . '.png';
                        }else {
                            $image_name = time() . '.pdf';
                        }

                        //create new directory
                        $path = 'public/form/'.$attribute['type'].'/' . $request->name . '/';
                        $result = Storage::makeDirectory($path);

                        if ($result) {
                            $path = 'public/form/'.$attribute['type'].'/' .  $request->name . '/' . $image_name;

                        } else {
                            'public/form/'.$attribute['type'].'/' . $image_name;
                        }

                        Storage::put($path, $data);

                        $attribute['value'] = '/storage/form/'.$attribute['type'].'/' . $request->name . '/' . $image_name;

                        DB::table('form_attributes')->insert([
                            'Form_id' => $form->id,
                            'name' =>$attribute['name'],
                            'type' =>$attribute['type'],
                            'value' => $attribute['value'],
                            'key' => $attribute['key'],
                            'created_at' => Carbon::now(),
                            'updated_at' => Carbon::now()
                        ]);
                        break;
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
        return response()->json(['status' => 'Successful', 'form' => $form], 201);

    }
}
