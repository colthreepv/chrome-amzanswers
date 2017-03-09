// global css
import './theme/theme.scss'

import { button } from 'elementx'

import { findEl } from './find-el'
import { loadAll } from './reviews'
// classes you want to use immediately
console.info('Amazon Answers extension')

const searchBtn = button({
  onClick: loadAll,
}, 'Search Test')

findEl('.askWidgetHeader').then((anchor) => {
  anchor.appendChild(searchBtn)
})
