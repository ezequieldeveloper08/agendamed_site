'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Plus, Search, Trash } from "lucide-react";
import Link from "next/link";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

export function EstabelecimentosContent({ data }) {
    const columns = []

    const table = useReactTable({
        data,
        columns: [
            {
                accessorKey: "name",
                header: "Nome",
            },
            {
                accessorKey: "type",
                header: "Tipo",
            },
            {
                accessorKey: "address.name",
                header: "Endereço",
            },
            {
                accessorKey: "address.city",
                header: "Cidade",
            },
            {
                accessorKey: "address.uf",
                header: "UF",
            },
            {
                accessorKey: "address.phone",
                header: "Contato",
            },
            {
                id: "actions",
                enableHiding: false,
                size: 1,
                header: () => <div  className="max-w-20 whitespace-nowrap">Ações</div >,
                cell: ({ row }) => (
                    <div className="flex gap-2 max-w-20">
                        <Button size="icon" variant="outline"><Edit /></Button>
                        <Button size="icon" variant="outline"><Trash /></Button>
                    </div>
                ),
            },
        ],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Estabelecimentos</h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie seus estabelecimentos
                    </p>
                </div>
                <Link href={'/estabelecimentos/novo'}>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Novo Estabelecimento
                    </Button>
                </Link>
            </div>

            {/* Buscar Médicos */}
            <Card>
                <CardHeader>
                    <CardTitle>Buscar Estabelecimentos</CardTitle>
                    <CardDescription>
                        Encontre estabelecimentos por nome, categoria ou especialidade
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar por nome, categoria ou especialidade..." className="pl-8" />
                    </div>
                </CardContent>
            </Card>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}