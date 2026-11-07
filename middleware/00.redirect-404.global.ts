export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/') {
    return
  }

  if (to.matched.length === 0) {
    return navigateTo('/', { redirectCode: 302, replace: true })
  }

  if (typeof to.meta?.validate === 'function') {
    const isValid = await Promise.resolve(to.meta.validate(to))
    if (isValid !== true) {
      return navigateTo('/', { redirectCode: 302, replace: true })
    }
  }
})

