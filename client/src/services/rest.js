import { config, get, post } from '../utils'


export async function getBusiness(category) {
  let result = get(`${config.api}us/business?category=${category}`)
  return result
}

export async function getNumbers(category) {
  let result = get(`${config.api}us/numbers?category=${category}`)
  return result
}

export async function getNumbersCategory(state) {
  let result = get(`${config.api}us/numbers/category?state=${state}`)
  return result
}

export async function getStars(category) {
  let result = get(`${config.api}us/stars?category=${category}`)
  return result
}

export async function getReviews(category) {
  let result = get(`${config.api}us/reviews?category=${category}`)
  return result
}

export async function getHours(state, category) {
  let result = get(`${config.api}us/hours?state=${state}&category=${category}`)
  return result
}

export async function getCheckIns(state, category) {
  let result = get(`${config.api}us/checkin?state=${state}&category=${category}`)
  return result
}

export async function getAttributes(state, category) {
  let result = get(`${config.api}us/attributes?state=${state}&category=${category}`)
  return result
}