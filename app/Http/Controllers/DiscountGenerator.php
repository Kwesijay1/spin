<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Exception;

class DiscountGenerator extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email',
            'phone_number' => 'required',
        ]);
        try {
            DB::beginTransaction();
            if($this->checkIfCanSpin($request->email, $request->phone_number) <= 0){
                //user qualifies to spin
                $dayNumber = Carbon::today()->dayOfWeekIso;
                $lastTwoDigits = (int)substr($request->phone_number, -2);
                if(($dayNumber %2 === 0) === ($lastTwoDigits %2 === 0)){
                    //won
                    $discountValue = random_int(10, 50);
                    Discount::create([
                        'name' => $request->name,
                        'email' => $request->email,
                        'phone_number' => $request->phone_number,
                        'discount_amount' => $discountValue
                    ]);
                    DB::commit();
                    return response()->json(['alertType' => 'success', 'message' => 'Congratulations! You have won a discount of '. $discountValue.'%. Kindly contact us for your voucher. Thank You!']);
                } else{
                    Discount::create([
                        'name' => $request->name,
                        'email' => $request->email,
                        'phone_number' => $request->phone_number,
                        'discount_amount' => 0
                    ]);
                    DB::commit();
                    return response()->json(['alertType' => 'info', 'message' => 'Sorry! You do not qualify for a discount today, Kindly try again tomorrow. Thank You!']);
                }

            } else{
                //user has spin already today
                return response()->json(['alertType' => 'warning', 'message' => 'Sorry! You have already spin for today, Kindly try again tomorrow. Thank You!']);
            }
        } catch (Exception $exception){
            DB::rollBack();
            return response()->json(['alertType' => 'error', 'message' => 'Sorry! Something went wrong, Please try again later.']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * check if user has spin already today
    */
    public function checkIfCanSpin($email, $phone_number){
        return Discount::whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') = ?", Carbon::today()->format('Y-m-d'))->where(function ($query) use($email, $phone_number){
            $query->where('email', $email)->orWhere('phone_number', $phone_number);
        })->count();
    }
}
