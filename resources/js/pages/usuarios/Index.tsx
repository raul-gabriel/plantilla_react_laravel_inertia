import React, { useEffect, useState } from 'react';
import { Head, router, usePage, useForm } from '@inertiajs/react';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import FormularioUsuario from './FormularioUsuario';
import { Table } from '@/Components/ui/table';
import { Pagination } from '@/Components/ui/Pagination';
import { Usuario } from '@/types/typeGlobales';




interface Props {
    usuarios: {
        data: Usuario[];
        links: any[];
        total: number;
    };
    filters: {
        search?: string;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Index() {



    const { usuarios, filters, flash } = usePage<any>().props;

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<Usuario | null>(null);
    const [search, setSearch] = useState(filters.search || '');


    function buscar(e: React.KeyboardEvent<HTMLInputElement>, search: string) {
        if (e.key === 'Enter') {
            e.preventDefault();
            router.get(route('usuarios.index'), { search }, { preserveState: true, replace: true });
        }
    }


    const handleEdit = (user: Usuario) => {
        setEditingUser(user);
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Eliminar usuario?')) {
            router.delete(route('usuarios.destroy', id), {
                preserveState: false, // Así sí se recargan las props y llega el flash
            });
        }
    };


    return (
        <AdminLayout>
            <div className="p-6">



                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
                        {flash.error}
                    </div>
                )}

                <Head title="Usuarios" />




                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Usuarios ({usuarios.total})</h1>
                    <button
                        onClick={() => {
                            setEditingUser(null);
                            setShowModal(true);
                        }}
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/70 flex items-center gap-2"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Nuevo Usuario
                    </button>
                </div>

                {/* Search */}
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={e => buscar(e, search)}
                    placeholder="Buscar usuarios..."
                    className="border rounded-md px-3 py-2 w-full max-w-md"
                />



                {/* Table */}
                <Table
                    headers={[
                        { key: 'nombre', label: 'Nombres' },
                        { key: 'correo', label: 'Correo' },
                        { key: 'dni', label: 'DNI' },
                        { key: 'estado', label: 'Estado', align: 'center' },
                        { key: 'acciones', label: 'Acciones', align: 'right' },
                    ]}
                >
                    {usuarios.data.map((usuario: Usuario) => (
                        <Table.Row key={usuario.id}>
                            <Table.Cell>{usuario.nombres}</Table.Cell>
                            <Table.Cell>{usuario.correo}</Table.Cell>
                            <Table.Cell>{usuario.dni}</Table.Cell>
                            <Table.Cell align="center">
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${usuario.estado === 'activo'
                                        ? 'bg-green-100 text-green-800'
                                        : usuario.estado === 'suspendido'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {usuario.estado}
                                </span>
                            </Table.Cell>
                            <Table.Cell align="right">
                                <button onClick={() => handleEdit(usuario)} className="text-blue-600 hover:text-blue-900 mr-3">
                                    <PencilIcon />
                                </button>
                                <button onClick={() => handleDelete(usuario.id)} className="text-red-600 hover:text-red-900">
                                    <TrashIcon />
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table>
                <Pagination links={usuarios.links} />

                {/* Modal */}
                {showModal && <FormularioUsuario user={editingUser} onClose={() => setShowModal(false)} isOpen={showModal} />}
            </div>
        </AdminLayout>
    );
}




