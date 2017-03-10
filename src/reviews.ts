import toArray from 'arrayify'
import { html } from 'elementx'

function getProductId () {
  const regex = /\/product\/(.*)\//
  const matcher = regex.exec(window.location.pathname)
  if (matcher != null && matcher[1] != null) return matcher[1]
  return null
}

function parseResponse (page: string) {
  const htmlPage: HTMLElement = html()
  htmlPage.innerHTML = page

  // question container div is like <div id="question-IDLONGID">
  const questions = toArray(htmlPage.querySelectorAll('.askTeaserQuestions > div'))

  const answers = {}
  const missing = []

  questions.forEach((question) => {
    // extrapolate informations from DOM, each question
    try {
      const SUBSTR_LEN = 'question-'.length

      const questionId = question.querySelector('[id^=question]').id.substr(SUBSTR_LEN)
      const questionText = question.querySelector('.a-link-normal').textContent.trim()
      const answerText = question.querySelector('.a-col-right > span').textContent.trim()
      const fromWho = question.querySelector('.a-color-tertiary').textContent.trim()
      const hasMoreAnswers = question.querySelector('a[data-questionid]')

      answers[questionId] = [{
        question: questionText,
        answer: answerText,
        from: fromWho,
        // date: 'TO BE DONE'
      }]

      // if such question requires an AJAX call, attach another meta-question to the array
      if (hasMoreAnswers) missing.push(questionId)
    } catch (e) {}
  })

  return [answers, missing]

  // example return value
  // return {
  //   'Si è rotto?': [{
  //     answer: 'Si però non è proprio distrutto',
  //     from: 'giorgiano mariano in data 2015',
  //     date: '12/07/2016',
  //     fetchAnswers: 'Tx13NUSJ5837TJJ'
  //   }],
  // }
}

function parseAnswers (page) {
  return ['YEAH, SOON']
}

// uses side-effects on 'answersObj' object
function attachAnswersTo (answerId, answersObj) {
  return function (fetchedAnswers) {
    fetchedAnswers.forEach(answer => answersObj[answerId].push(answer))
    return fetchedAnswers
  }
}

function fetchAdditional (answerId, answersObj, pageId = 1) {
  return fetch(`/ask/answers/inline/${answerId}/${pageId}`)
    // convert from Blob to text
    .then(res => res.text())
    // convert from HTML to an array like [{ question: '', answer: '', from: '', date: '' }]
    .then(parseAnswers)
    // fill answersObj with the received answers
    .then(attachAnswersTo(answerId, answersObj))
    // check for more
    .then(answers => answers.thereAreMore && fetchAdditional(answerId, answersObj, pageId + 1))
}

function fetchAnswers ([answers, missing]) {
  const missingPromises = Promise.all(
    missing.map(
      id => fetchAdditional(id, answers)
    )
  )

  return missingPromises.then(() => answers)
}

function loadAll () {
  const pid = getProductId()
  fetch(`/ask/questions/inline/${pid}/1`).then(res => res.text())
  .then(parseResponse)
  .then(fetchAnswers)
  .then(answers => {
    console.log('got page!')
    console.log(answers)
  })
}

export { loadAll }
