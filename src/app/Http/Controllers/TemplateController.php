<?php

namespace App\Http\Controllers;

use App\Template;
use App\TemplateModal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

use Carbon\Carbon;
use File;
use Storage;
use DB;

class TemplateController extends Controller
{

    public function allTemplate()
    {
        $templates = Template::orderBy('id', 'ASC')->get();

        foreach ($templates as $template) {
            if ($template['status'] == "1") {
                $template['statusType'] = 'Active';
            } else {
                $template['statusType'] = 'Inactive';
            }

        }

        return response()->json(['status' => 'Successful', 'templates' => $templates,], 200);
    }


    public function idTemplate($id)
    {
        $template = Template::find($id)
            ->leftJoin('template_modals', 'template_modals.template_id', '=', 'templates.id')
            ->where('id',$id)->get();


        $template[0]->modal= (int)$template[0]->modal_id;

        return response()->json(['status' => 'Successful', 'template' => $template,], 200);
    }

    public function idModalTemplate($id)
    {
        $template = DB::table('templates')
        ->leftJoin('template_modals', 'template_modals.template_id', '=', 'templates.id')
        ->where('template_modals.modal_id', '=', $id)
        ->get();

        return response()->json(['status' => 'Successful', 'template' => $template,], 200);
    }


    public function store(Request $request)
    {
        try {
            $title = $request->name;
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

            DB::beginTransaction();

            $template = Template::create([
                'name' => $title,
                'description' => $request->description,
                'type' =>  $request->type,
                'content' => $template_content
            ]);

            $templateModal = TemplateModal::create([
                'template_id' => $template->id,
                'modal_id'=> $request->modal
            ]);

            DB::commit();

        } catch
        (\Illuminate\Database\QueryException $exception) {
            DB::rollBack();

            $errorInfo = $exception->errorInfo;

            if ($errorInfo[1] == 1062) {
                return response()->json(['error' => 'Duplicate Template'], 422);
            }
            return response()->json([$errorInfo[2]], 422);
        }

        return response()->json(['status' => 'Successful', 'template' =>$template], 201);

    }

    public function update(Request $request,$id)
    {
        try {
            $title = $request->name;

            $old_title =  $request->title;

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

                        //delete old directory
                        if($old_title != $title){
                            $oldPath = 'public/templateImage/' . $old_title . '/';
                            Storage::deleteDirectory($oldPath);
                        }

                      $contentArray['entityMap'][$key]['data']['src'] = '/storage/templateImage/' . $title . '/' . $image_name;
                    }
                }
            }
            $template_content = json_encode($contentArray, JSON_UNESCAPED_UNICODE);

            DB::beginTransaction();

            $template = Template::find($id);
            $template->name =  $title;
            $template->description = $request->description;
            $template->type = $request->type;
            $template->content = $template_content;
            $template->status =1;
            $template->updated_at = Carbon::now();
            $template->save();

            DB::commit();

        } catch
        (\Illuminate\Database\QueryException $exception) {
            DB::rollBack();

            $errorInfo = $exception->errorInfo;

            if ($errorInfo[1] == 1062) {
                return response()->json(['error' => 'Duplicate Template'], 422);
            }
            return response()->json([$errorInfo[2]], 422);
        }

        return response()->json(['status' => 'Successful', 'template' =>$template], 201);

    }

}