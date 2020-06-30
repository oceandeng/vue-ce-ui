import Form from './form/form'
import SearchForm from './form/search-form'
import FromItem from './form/form-item'
import Input from './form-item/input'
import Select from './form-item/select'
import Radio from './form-item/radio'
import Checkbox from './form-item/checkbox'
import DatePicker from './form-item/date-picker'
import Upload from './form-item/upload'
import Cascader from './form-item/cascader'
import Button from './form-item/button'
import TablePagination from './table/table-pagination'
import Page from './page/page'
import Progress from './progress'

const components = [
  Form,
  SearchForm,
  FromItem,
  Input,
  Select,
  Radio,
  Checkbox,
  DatePicker,
  Upload,
  Cascader,
  Button,
  TablePagination,
  Page,
  Progress
]

const ceui = {
  install: function (Vue, options) {
    components.map(item => {
      Vue.component(item.name, item)
    })
  }
}

export default ceui
