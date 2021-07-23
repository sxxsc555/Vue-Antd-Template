import { reactive } from 'vue'

function sidebarItem(props: any) {
  const data = reactive({
    onlyOneChild: [],
    subMenus: []
  })

  function resolvePath(routePath: any) {
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

  function hasOneShowingChild(children = [], parent: any) {
    const showChildren = children.filter((item) => {
      if(item.meta.hidden) {
        return false
      } else {
        data.onlyOneChild = item
        return true
      }
    })

    if(showChildren.length === 1) {
      return true
    }

    if(showChildren.length === 0) {
      data.onlyOneChild = {...parent, path: ''}
      return true
    }

    return false
  }

  return {
    data,
    resolvePath,
    hasOneShowingChild
  }
}

export default sidebarItem