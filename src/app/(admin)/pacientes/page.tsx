"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Eye,
  Edit,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CustomPagination } from "@/components/custom-pagination"

export default function PacientesPage() {
  const router = useRouter()
  const [filter, setFilter] = useState("")

  const data = [
    {
      id: 1,
      nome: "Maria Silva Santos",
      cpf: "123.456.789-00",
      idade: 45,
      telefone: "(11) 99999-9999",
      ultimaConsulta: "15/03/2024",
      status: "Ativo",
      proxima: "20/03/2024",
    },
    {
      id: 2,
      nome: "João Carlos Lima",
      cpf: "987.654.321-00",
      idade: 62,
      telefone: "(11) 88888-8888",
      ultimaConsulta: "10/03/2024",
      status: "Ativo",
      proxima: "18/03/2024",
    },
    {
      id: 3,
      nome: "Ana Paula Costa",
      cpf: "456.789.123-00",
      idade: 34,
      telefone: "(11) 77777-7777",
      ultimaConsulta: "12/03/2024",
      status: "Ativo",
      proxima: "25/03/2024",
    },
    {
      id: 4,
      nome: "Pedro Henrique Oliveira",
      cpf: "321.654.987-00",
      idade: 28,
      telefone: "(11) 66666-6666",
      ultimaConsulta: "08/03/2024",
      status: "Inativo",
      proxima: null,
    },
  ]

  const columns = [
    {
      accessorKey: "nome",
      header: "Nome",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.nome}</p>
          <p className="text-sm text-muted-foreground">{row.original.cpf}</p>
        </div>
      ),
    },
    {
      accessorKey: "idade",
      header: "Idade",
      cell: ({ row }) => <span>{row.original.idade} anos</span>,
    },
    {
      accessorKey: "telefone",
      header: "Telefone",
    },
    {
      accessorKey: "ultimaConsulta",
      header: "Última Consulta",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "Ativo" ? "default" : "secondary"}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "proxima",
      header: "Próxima Consulta",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.proxima ?? "—"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex gap-2 w-fit max-w-fit">
          <Button
            size="icon"
            variant="outline"
            onClick={() => alert(`Visualizar ${row.original.nome}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => router.push(`/pacientes/editar/${row.original.id}`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  // Filtro e tabela
  const filteredData = data.filter(
    (p) =>
      p.nome.toLowerCase().includes(filter.toLowerCase()) ||
      p.cpf.includes(filter)
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
    },
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pacientes</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie os pacientes cadastrados na clínica
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Paciente
        </Button>
      </div>

      {/* Buscar Pacientes */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Pacientes</CardTitle>
          <CardDescription>
            Encontre pacientes por nome ou CPF
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-4 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou CPF..."
              className="pl-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>
            {filteredData.length} pacientes encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
                  <TableCell colSpan={columns.length} className="text-center h-24">
                    Nenhum paciente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <CustomPagination totalPages={12} maxVisible={5}/>
        </CardContent>
      </Card>
    </div>
  )
}
