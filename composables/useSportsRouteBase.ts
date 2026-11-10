export function useSportsRouteBase() {
  const route = useRoute()
  return computed(() => {
    const match = route.path.match(/^\/(?:explore\/)?sports\/(popular|basketball|baseball|soccer|football|tennis)(?=\/|$)/)
    return match ? `/sports/${match[1]}` : ''
  })
}
