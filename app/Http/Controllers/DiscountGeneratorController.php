<?php

namespace App\Http\Controllers;

use App\Models\DaysValue;
use App\Models\Discount;
use App\Models\DiscountList;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PHPUnit\Exception;

class DiscountGeneratorController extends Controller
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
            'discount_amount' => 'required',
        ]);
        try {
            DB::beginTransaction();
            Discount::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'discount_amount' => $request->discount_amount
            ]);
            DB::commit();
            return response()->json(['alertType' => 'success', 'message' => 'Congratulations! You have won a discount of '. $request->discount_amount.'%. Kindly contact us for your voucher. Thank You!']);
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

    public function ConfirmUserCanSpin(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email',
            'phone_number' => 'required',
        ]);
        try {
            if($this->checkIfCanSpin($request->email, $request->phone_number) <= 0){
                //user qualifies to spin
                $dayName = strtolower(Carbon::today()->format('l'));
                $day = DaysValue::where('day', $dayName)->first();
                if(empty($day)){
                    return response()->json(['alertType' => 'info', 'message' => 'Sorry! You do not qualify for a discount today, Kindly try again tomorrow. Thank You!', 'canSpin' => 'false']);
                }
                $dayNumber = $day->value;
                $lastTwoDigits = (int)substr($request->phone_number, -2);
                $discountId = null;
                if(($dayNumber %2 === 0) === ($lastTwoDigits %2 === 0)){
                    if($day->matchingDiscount === null){
                        return response()->json(['alertType' => 'info', 'message' => 'Sorry! No discount available today, Kindly try again tomorrow. Thank You!', 'canSpin' => 'false', 'day' => $day]);
                    }
                    //won
                    $discountId = $day->matching_discount_id;

                } else{
                    if($day->oppositeDiscount === null){
                        return response()->json(['alertType' => 'info', 'message' => 'Sorry! No discount available today, Kindly try again tomorrow. Thank You!', 'canSpin' => 'false', 'day' => $day]);
                    }
                    //won
                    $discountId = $day->opposite_discount_id;
                }

                $discounts = DiscountList::all()->collect();
                $discounts->map(function ($discount) use ($discountId){
                    if($discount->id === $discountId){
                        $discount->probability = 100;
                    } else {
                        $discount->probability = 0;
                    }
                    $discount->weight = 1;
                    $discount->bgColor = $discount->bg_color;
                    $discount->value = $discount->rate;
                });
                return response()->json(['alertType' => 'success', 'message' => 'User can spin ', 'canSpin' => 'true', 'discountList' => $discounts]);


            } else{
                //user has spin already today
                return response()->json(['alertType' => 'warning', 'message' => 'Sorry! You have already spin for today, Kindly try again tomorrow. Thank You!', 'canSpin' => 'false']);
            }
        } catch (Exception $exception){
            return response()->json(['alertType' => 'error', 'message' => 'Sorry! Something went wrong, Please try again later.']);
        }
    }

    /**
     * check if user has spin already today
    */
    public function checkIfCanSpin($email, $phone_number){
        return Discount::whereDate('created_at', Carbon::today())->where(function ($query) use($email, $phone_number){
            $query->where('email', $email)->orWhere('phone_number', $phone_number);
        })->count();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDiscountList(){
        $discountList = DiscountList::all();
        return response()->json($discountList);
    }
}
