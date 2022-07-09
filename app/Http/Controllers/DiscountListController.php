<?php

namespace App\Http\Controllers;

use App\Models\DiscountList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DiscountListController extends Controller
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
        $discountList = DiscountList::all();
        return response()->json($discountList);
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
        $this->validate($request, ['rate' => 'required']);
        try {
            DB::beginTransaction();
            DiscountList::create($request->all());
            DB::commit();
            return response()->json(['message' => 'Discount Rate Added Successfully']);
        } catch (\Exception $exception){
            DB::rollBack();
            return response()->json(['message' => $exception->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DiscountList  $discountList
     * @return \Illuminate\Http\Response
     */
    public function show(DiscountList $discountList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DiscountList  $discountList
     * @return \Illuminate\Http\Response
     */
    public function edit(DiscountList $discountList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DiscountList  $discountList
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, DiscountList $discountList)
    {
        $this->validate($request, ['rate' => 'required']);
        try {
            DB::beginTransaction();
            $discountList->update($request->all());
            DB::commit();
            return response()->json(['message' => 'Discount Rate Updated Successfully']);
        } catch (\Exception $exception){
            DB::rollBack();
            return response()->json(['message' => 'Something Went Wrong, Please Try Again Later'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DiscountList  $discountList
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(DiscountList $discountList)
    {
        try {
            DB::beginTransaction();
            $discountList->delete();
            DB::commit();
            return response()->json(['message' => 'Discount Rate Deleted Successfully']);
        } catch (\Exception $exception){
            DB::rollBack();
            return response()->json(['message' => 'Something Went Wrong, Please Try Again Later'], 400);
        }
    }
}
