
import _ from "lodash"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { bottomTabs } from "../components/organisms/BottomNav"

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
      scrollPositions.current = [...scrollPositions.current, { index: new Date().getTime(), url: `${url}${router.query.id}`, position: window.scrollY }]
    }
    const onRouteChangeComplete = (url: any) => {
      const target = scrollPositions.current[_.findLastIndex(scrollPositions.current, el => el.url === `${router.pathname}${router.query.id}`)]
      if ((isBack.current || bottomTabs.flatMap(el => el.value).includes(router.pathname)) && scrollPositions.current.length > 0) {
        if (target) {
          window.scroll({
            top: target.position,
            behavior: "auto",
          })
        }
      }
      if (scrollPositions.current.length > 0 && target) {
        scrollPositions.current = _.filter(scrollPositions.current, el => el.index !== target.index)
      }
      isBack.current = false
    }
    router.events.on("routeChangeStart", onRouteChangeStart)
    router.events.on("routeChangeComplete", onRouteChangeComplete)
    console.log(scrollPositions)
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