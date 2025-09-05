<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;


class UsuarioController extends Controller
{
    public function index(Request $request)
    {
        $query = Usuario::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nombres', 'like', "%{$request->search}%")
                    ->orWhere('correo', 'like', "%{$request->search}%")
                    ->orWhere('dni', 'like', "%{$request->search}%");
            });
        }

        $usuarios = $query->paginate(15);

        return Inertia::render('usuarios/Index', [
            'usuarios' => $usuarios,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombres' => 'required|string|max:255',
            'correo' => 'required|email|unique:usuarios',
            'dni' => 'required|unique:usuarios',
            'celular' => 'required|unique:usuarios',
            'rol' => 'required|in:administrador,usuario,moderador',
            'estado' => 'required|in:activo,inactivo,suspendido',
            'password' => 'required|min:6|confirmed',
        ]);

        $data = $request->all();
        $data['password'] = DB::raw("SHA2('{$data['password']}', 256)");

        Usuario::create($data);

        return redirect()->route('usuarios.index')->with('success', 'Usuario creado');
    }

    public function update(Request $request, Usuario $usuario)
    {
        $request->validate([
            'nombres' => 'required|string|max:255',
            'correo' => 'required|email|unique:usuarios,correo,' . $usuario->id,
            'dni' => 'required|unique:usuarios,dni,' . $usuario->id,
            'celular' => 'required|unique:usuarios,celular,' . $usuario->id,
            'rol' => 'required|in:administrador,usuario,moderador',
            'estado' => 'required|in:activo,inactivo,suspendido',
        ]);

        $data = $request->only(['nombres', 'correo', 'dni', 'celular', 'rol', 'estado']);

        if ($request->password) {
            $data['password'] = DB::raw("SHA2('{$request->password}', 256)");
        }

        $usuario->update($data);

        return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado');
    }

    public function destroy(Usuario $usuario)
    {
        try {
            $usuario->delete();
            return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado correctamente.');
        } catch (\Exception $e) {
            return redirect()->route('usuarios.index')->with('error', 'Error al eliminar usuario.');
        }
    }
}
