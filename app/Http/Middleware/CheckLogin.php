<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CheckLogin
{
    public function handle(Request $request, Closure $next)
    {
        if (!Session::has('usuario_logueado')) {
            return redirect('/login')->withErrors(['error' => 'Debe iniciar sesión']);
        }
        
        return $next($request);
    }
}