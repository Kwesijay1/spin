@extends('layouts.master')

@section('content')
    <header class="masthead" style="padding-top: 8.5rem; padding-bottom: 0">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <v-card style="opacity: .7">
                        <v-card-title class="justify-content-center text-center">Login</v-card-title>
                        <span class="justify-content-center text-center px-3">@include('layouts.messages')</span>
                        <form method="POST" action="{{ route('login') }}">
                            @csrf

                            <v-card-text>
                                <div class="row">
                                    <div class="col-md-12">
                                        <v-text-field
                                            type="email"
                                            label="Email"
                                            name="email"
                                            value="{{ old('email') }}"
                                            class="fields"
                                            :class="@error('email') is-invalid @enderror"
                                            filled rounded
                                            dense flat
                                            required
                                        ></v-text-field>

                                        @error('email')
                                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                        @enderror
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <v-text-field
                                            type="password"
                                            label="Password"
                                            name="password"
                                            class="fields"
                                            :class="@error('password') is-invalid @enderror"
                                            filled rounded
                                            dense flat
                                            required
                                        ></v-text-field>
                                        @error('password')
                                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                        @enderror
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-12 text-right">
                                        @if (Route::has('password.request'))
                                            <a class="btn btn-link text-md-end" href="#">
                                                {{ __('Forgot Your Password?') }}
                                            </a>

{{--                                            <a class="btn btn-link text-md-end" href="{{ route('password.request') }}">--}}
{{--                                                {{ __('Forgot Your Password?') }}--}}
{{--                                            </a>--}}
                                        @endif
                                    </div>
                                </div>
                            </v-card-text>

                            <v-card-action>
                                <div class="row mb-0 d-flex justify-content-center text-center">
                                    <div class="col-md-12 mx-5">
                                        <button type="submit" class="btn btn-primary btn-block" style="width: 150px">
                                            {{ __('Login') }}
                                        </button>

                                    </div>
                                </div>
                            </v-card-action>
                        </form>
                    </v-card>
                </div>
            </div>
        </div>
    </header>

@endsection
