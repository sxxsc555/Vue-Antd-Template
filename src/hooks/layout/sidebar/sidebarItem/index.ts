import { reactive } from 'vue'

export interface stateTypes {
  onlyOneChild: Array<string> | object
  subMenus: Array<string>
}

function sidebarItem(props: any) {
  const state: stateTypes = reactive({
    onlyOneChild: [],
    subMenus: []
  })

  function resolvePath(routePath: string) {
    let path = ''

    if(props.path.includes(routePath)) {
      path = props.path
    } else {
      if((routePath.indexOf('/') !== -1) || (props.path === '/')) {
        path = props.path + routePath
      } else {
        path = props.path + '/' + routePath
      }
    }
    
    return path
  }

  function hasOneShowingChild(children = [], parent: object) {
    const showChildren = children.filter((item: any) => {
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
      state.onlyOneChild = {...parent, path: ''}
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