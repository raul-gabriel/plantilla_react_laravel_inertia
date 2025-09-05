
import { Input, Select } from "@/Components/ui/CampoForm";
import { Modal } from "@/Components/ui/Modal";
import { Usuario } from "@/types/typeGlobales";
import { useForm } from "@inertiajs/react";




export default function FormularioUsuario({ user, onClose, isOpen }: { user: Usuario | null; onClose: () => void; isOpen: boolean }) {
    const { post, put, data, setData, processing, errors } = useForm({
        nombres: user?.nombres || '',
        correo: user?.correo || '',
        dni: user?.dni || '',
        celular: user?.celular || '',
        rol: user?.rol || 'administrador',
        estado: user?.estado || 'activo',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
            put(route('usuarios.update', user.id), { onSuccess: onClose });
        } else {
            post(route('usuarios.store'), { onSuccess: onClose });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={user ? 'Editar Usuario' : 'Crear Usuario'} size="lg">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Input
                        type="text"
                        label="nombres"
                        name="nombres"
                        value={data.nombres}
                        onChange={e => setData('nombres', e.target.value)}
                        error={errors.nombres}
                        placeholder="Ingrese su nombres"
                        required
                    />
                </div>

                <div>

                    <Input
                        type="email"
                        label="correo"
                        name="correo"
                        value={data.correo}
                        onChange={e => setData('correo', e.target.value)}
                        error={errors.correo}
                        placeholder="Ingrese su email"
                        required
                    />


                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        type="text"
                        label="DNI"
                        name="dni"
                        value={data.dni}
                        onChange={e => setData('dni', e.target.value)}
                        error={errors.dni}
                        placeholder="Ingrese su DNI"
                        required
                    />


                    <Input
                        type="text"
                        label="Celular"
                        name="celular"
                        value={data.celular}
                        onChange={e => setData('celular', e.target.value)}
                        error={errors.celular}
                        placeholder="Ingrese su celular"
                        required
                    />


                </div>

                <div className="grid grid-cols-2 gap-4">

                    <Select
                        label="Rol"
                        name="rol"
                        value={data.rol}
                        onChange={e => setData('rol', e.target.value)}
                        options={[
                            { value: 'visitante', label: 'visitante' },
                            { value: 'administrador', label: 'administrador' },

                        ]}
                        error={errors.rol}
                    />

                    <Select
                        label="Estado"
                        name="estado"
                        value={data.estado}
                        onChange={e => setData('estado', e.target.value)}
                        options={[
                            { value: 'activo', label: 'activo' },
                            { value: 'inactivo', label: 'inactivo' },
                            { value: 'suspendido', label: 'suspendido' },
                        ]}
                        error={errors.estado}
                    />
                </div>

                {/* Si es creación, pedir contraseña */}
                {!user && (
                    <>
                        <div>
                            <label className="block text-sm font-medium mb-1">Contraseña</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                                required={!user}
                            />
                            {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Confirmar Contraseña</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full border rounded-md px-3 py-2"
                                required={!user}
                            />
                        </div>
                    </>
                )}

                <div className="flex justify-end gap-2 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/70 disabled:opacity-50"
                    >
                        {processing ? 'Guardando...' : user ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>

        </Modal>
    );
}