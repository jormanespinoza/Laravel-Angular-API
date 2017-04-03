<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class ApiAuthController extends Controller
{
  public function userAuth(Request $request) {
    $credentials = $request->only('email', 'password');
    $token = null;

    try {
      if (!$token = JWTAuth::attempt($credentials)) {
        return response()->json(['error' => 'Invalid credentials']);
      }
    }catch(JWTException $ex) {
      return response()->json(['error' => 'Something went wrong'], 500);
    }

    return response()->json(compact('token'));
  }
}
