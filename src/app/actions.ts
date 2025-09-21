'use server'
 
import { cookies } from 'next/headers'
 
export async function setCookies(name: string, data: string) {
  const c = await cookies();
  c.set(name, data);
}

export async function deleteCookies(name: string) {
  const c = await cookies();
  c.delete(name)
}