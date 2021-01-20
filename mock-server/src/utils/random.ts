import {random} from 'faker'

/**
 * Return a random key from an `enumeration`.
 * 
 * @param enumeration
 */
export const enumKey = <T>(enumeration: T): string => {
  const keys = Object.keys(enumeration).filter(k => !(Math.abs(Number.parseInt(k)) + 1))
  return random.arrayElement(keys)
}

/**
 * Returns a random value from an `enumeration`. 
 * 
 * @param enumeration 
 */
export const enumValue = <T>(enumeration: T): string => {
  const keys = Object.values(enumeration)
  return random.arrayElement(keys)
}