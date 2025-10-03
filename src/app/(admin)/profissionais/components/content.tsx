"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Trash, Edit } from "lucide-react"
import { IProfessional } from "@/types/user"
import Link from "next/link"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function MedicosContent({ professionals: data }: { professionals: Array<IProfessional> }) {
  const router = useRouter()
  const columns = []

  const table = useReactTable({
    data,
    columns: [
      {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => <div></div>
      },
      {
        accessorKey: "name",
        header: "Nome",
      },
      {
        accessorKey: "type",
        header: "Tipo",
      },
      {
        accessorKey: "specialties",
        header: "Especialidades",
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
        accessorKey: "cellphone",
        header: "Contato",
      },
      {
        id: "actions",
        enableHiding: false,
        size: 1,
        header: () => <div className="max-w-20 whitespace-nowrap">Ações</div >,
        cell: ({ row }) => {
          const value = data[row.id];
          return <div className="flex gap-2 max-w-20">
            <Button size="icon" variant="outline" onClick={() => router.push(`/estabelecimentos/editar/${value.id}`)}><Edit /></Button>
            <Button size="icon" variant="outline"><Trash /></Button>
          </div>
        },
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
          <h1 className="text-2xl font-bold">Profissionais</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie a equipe médica da clínica
          </p>
        </div>
        <Link href={'/profissionais/novo'}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Médico
          </Button>
        </Link>
      </div>

      {/* Buscar Médicos */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Médicos</CardTitle>
          <CardDescription>
            Encontre médicos por nome, especialidade ou CRM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-4 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome, especialidade ou CRM..." className="pl-8" />
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