import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Define las rutas públicas (no requieren autenticación)
  const publicPaths = ['/', '/proyectos', '/sobre-nosotros', '/contacto', '/admin/login']
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith('/proyectos/')
  )
  
  // Verifica si es una ruta de administración (excepto login)
  const isAdminPath = path.startsWith('/admin') && !path.startsWith('/admin/login')
  
  // Obtiene el token de autenticación
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })
  
  // Si es una ruta de administración y no hay token, redirige al login
  if (isAdminPath && !token) {
    const url = new URL('/admin/login', request.url)
    url.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(url)
  }
  
  // Si intenta acceder al login pero ya está autenticado, redirige al dashboard
  if (path === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  
  return NextResponse.next()
}

// Configura en qué rutas debe ejecutarse el middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}