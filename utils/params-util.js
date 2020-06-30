import { COMPONENT_NAME as PAGINATION_COMPONENT_NAME } from '../extends/pagination'
import { COMPONENT_NAME as SCREEN_FORM_COMPONENT_NAME } from '../extends/screen-form'
import { parse } from './router-params'
export default {
  computed: {
    $_params () {
      const o = {}
      Object.keys(this.$route.query).forEach(v => {
        if (`${PAGINATION_COMPONENT_NAME}.` === v.substr(0, PAGINATION_COMPONENT_NAME.length + 1) || `${SCREEN_FORM_COMPONENT_NAME}.` === v.substr(0, SCREEN_FORM_COMPONENT_NAME.length + 1)) {
          const c = v.split('.')
          o[c[1]] = { ...o[c[1]], ...parse(c[0], c[1], this.$route.query) }
        }
      })
      return o
    }
  }
}
