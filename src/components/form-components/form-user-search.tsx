/* import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Control } from "react-hook-form";
import { Input } from "../ui/input";
import { Skeleton } from "./skeleton";
import { IUser } from "@/models/users";

interface Props {
  control: Control<any, any>;
  label?: string;
  name: string;
  placeholder?: string;
  description?: string;
  rules?: {
    required?: boolean | string;
  };
  disabled?: boolean;
  initialItems?: IUser[];
}

export function FormUserSearch({ control, label, name, placeholder, description, rules, disabled, initialItems }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return [];
      const response = await api.get(`users?input=${debouncedSearch}&limit=20`);
      return response.data.data;
    },
    enabled: !!debouncedSearch,
  });

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} defaultValue={field.value?.toString()} disabled={disabled}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder ?? "Selecione um usuário"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <div className="p-2">
                <Input
                  placeholder="Buscar usuários..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full mb-2"
                />
              </div>

              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : data?.length > 0 ? (
                data.map((user: any) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.name}
                  </SelectItem>
                ))
              ) : initialItems?.length > 0 ? initialItems.filter((user, index, self) =>
                index === self.findIndex((u) => u.id === user.id)
              ).map((user: any) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.name}
                </SelectItem>
              )) : (
                <p className="text-gray-500 text-sm p-2">Nenhum usuário encontrado.</p>
              )}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
 */