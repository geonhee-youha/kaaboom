
import _ from "lodash"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"

export const usePreserveScroll = () => {
  const router = useRouter()

  const scrollPositions = useRef<{ index: number, url: string, position: number }[]>([])
  const isBack = useRef(false)
  useEffect(() => {
    router.beforePopState(() => {
      isBack.current = true
      return true
    })
    const onRouteChangeStart = () => {
      const url = router.pathname
      scrollPositions.current = [...scrollPositions.current, { index: new Date().getTime(), url: url, position: window.scrollY }]
    }
    const onRouteChangeComplete = (url: any) => {
      if (scrollPositions.current.length > 0) {
        const target = scrollPositions.current[_.findLastIndex(scrollPositions.current, el => el.url === router.pathname)]
        if (target) {
          window.scroll({
            top: target.position,
            behavior: "auto",
          })
          scrollPositions.current = _.filter(scrollPositions.current, el => el.index !== target.index)
        }
      }
      isBack.current = false
    }
    router.events.on("routeChangeStart", onRouteChangeStart)
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart)
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [router])
  return { scrollPositions }
}

// export const usePreserveScroll = () => {
//   const router = useRouter()

//   const scrollPositions = useRef<{ [url: string]: number }>({})
//   const isBack = useRef(false)
//   useEffect(() => {
//     router.beforePopState(() => {
//       isBack.current = true
//       return true
//     })

//     const onRouteChangeStart = () => {
//       const url = router.pathname
//       scrollPositions.current[url] = window.scrollY
//     }

//     const onRouteChangeComplete = (url: any) => {
//       if (isBack.current && scrollPositions.current[url]) {
//         window.scroll({
//           top: scrollPositions.current[url],
//           behavior: "auto",
//         })
//       }

//       isBack.current = false
//     }

//     router.events.on("routeChangeStart", onRouteChangeStart)
//     router.events.on("routeChangeComplete", onRouteChangeComplete)

//     return () => {
//       router.events.off("routeChangeStart", onRouteChangeStart)
//       router.events.off("routeChangeComplete", onRouteChangeComplete)
//     }
//   }, [router])
//   return { scrollPositions }
// }