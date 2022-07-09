<?php

namespace App\Http\Controllers;

use App\Models\DaysValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DaysValueController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $daysValue = DaysValue::all();
        return response()->json($daysValue);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $this->validate($request, ['day' => 'required', 'value' => 'required']);
        $day = DaysValue::where('day', $request->day)->get();
        if(count($day) > 0){
            return response()->json(['message' => ucfirst($request->day).' Already Exist'], 400);
        }
        try {
            DB::beginTransaction();
            DaysValue::create($request->all());
            DB::commit();
            return response()->json(['message' => 'Record Added Successfully']);
        } catch (\Exception $exception){
            DB::rollBack();
            return response()->json(['message' => 'Something Went Wrong, Please Try Again Later'], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DaysValue  $daysValue
     * @return \Illuminate\Http\Response
     */
    public function show(DaysValue $daysValue)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DaysValue  $daysValue
     * @return \Illuminate\Http\Response
     */
    public function edit(DaysValue $daysValue)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DaysValue  $daysValue
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, DaysValue $daysValue)
    {
        $this->validate($request, ['day' => 'required', 'value' => 'required']);
        try {
            DB::beginTransaction();
            $daysValue->update($request->all());
            DB::commit();
            return response()->json(['message' => 'Record Updated Successfully']);
        } catch (\Exception $exception){
            DB::rollBack();
            return response()->json(['message' => 'Something Went Wrong, Please Try Again Later'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DaysValue  $daysValue
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(DaysValue $daysValue)
    {
        try {
            DB::beginTransaction();
            $daysValue->delete();
            DB::commit();
            return response()->json(['message' => 'Record Deleted Successfully']);
        } catch (\Exception $exception){
            DB::rollBack();
            return response()->json(['message' => 'Something Went Wrong, Please Try Again Later'], 400);
        }
    }
}
