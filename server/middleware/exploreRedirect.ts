import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const pathname = url.pathname

  if (pathname === '/explore' || pathname === '/explore/') {
    return sendRedirect(event, '/', 301)
  }

  if (pathname.startsWith('/explore/')) {
    const cleanPath = pathname.replace(/^\/explore/, '') || '/'
    const target = cleanPath + (url.search || '')
    return sendRedirect(event, target, 301)
  }
})
