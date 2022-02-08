import { reactive } from 'vue'
import { isExternal } from '@/utils/validate'

export interface stateTypes {
  onlyOneChild: Array<string> | Object
  subMenus: Array<string>
}

function sidebarItem(props: object | any) {
  const state: stateTypes = reactive({
    onlyOneChild: [],
    subMenus: []
  })

  function resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath
    }

    if(!isExternal(props.path) && props.path.includes(routePath)) {
      return props.path
    } else {
      if((routePath.indexOf('/') !== -1) || (props.path === '/')) {
        return props.path + routePath
      } else {
        return props.path + '/' + routePath
      }
    }
  }

  function hasOneShowingChild(children = [], parent: object) {
    const showChildren = children.filter((item: object | any) => {
      // 过滤掉隐藏的路由
      if(item.meta?.hidden) {
        return false
      } else {
        state.onlyOneChild = item
        return true
      }
    })
    
    if(showChildren.length === 1) {
      return true
    }

    if(showChildren.length === 0) {
      state.onlyOneChild = {...parent, path: '', noShowingChildren: true}
      return true
    }

    return false
  }

  return {
    state,
    resolvePath,
    hasOneShowingChild
  }
}

export default sidebarItem