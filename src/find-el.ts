const STD_TIMEOUT = 300

function findEl (selector) {
  const anchor = document.querySelector(selector)
  if (anchor) return Promise.resolve(anchor)

  return new Promise(resolve => {
    // console.info('searching again in', STD_TIMEOUT, 'msec')
    setTimeout(() => resolve(findEl(selector)), STD_TIMEOUT)
  })
}

export { findEl }
