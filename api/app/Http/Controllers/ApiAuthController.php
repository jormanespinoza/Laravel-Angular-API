<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Hash;

class ApiAuthController extends Controller
{
  public function userAuth(Request $request) {
    $credentials = $request->only('email', 'password');
    $token = null;
    $user = null;

    try {
      if (!$request->has('password')) {
        $user = User::where('email', $request->input('email'))->first();
        if (empty($user)) {
          $user = User::create([
            'name'     => $request->input('name'),
            'email'    => $request->input('email'),
            'avatar'   => $request->input('avatar'),
            'password' => Hash::make('12345678')
          ]);
        }

        if (!$token = JWTAuth::fromUser($user)) {
          return response()->json(['error' => 'Invalid credentials'], 500);
        }
      }else {
        if (!$token = JWTAuth::attempt($credentials)) {
          return response()->json(['error' => 'Invalid credentials'], 500);
        }

        $user = JWTAuth::toUser($token); // Ubica los datos del usuario que coincidan con el token
      }
    }catch(JWTException $ex) {
      return response()->json(['error' => 'Something went wrong'], 500);
    }

    return response()->json(compact('token', 'user')); // Retorna los datos de sesión
  }
}
