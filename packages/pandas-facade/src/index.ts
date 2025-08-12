import { installPandasJsHelpers } from './new-features'
export { Series, DType, DataFrame } from 'pandas-js'

// Side-effect: augment pandas-js prototypes with groupBy/sortValues
installPandasJsHelpers()