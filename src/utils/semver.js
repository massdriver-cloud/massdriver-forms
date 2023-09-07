import semver from 'semver'

const ORDER_MAP = {
  asc: semver?.compare,
  desc: semver?.rcompare
}

export const sort = (versions, order = 'asc') => {
  if (!(versions instanceof Array)) {
    throw new Error('It is not an array')
  }

  if (!ORDER_MAP[order]) {
    throw new Error('Cannot sort in ', order, ' order')
  }

  return [...versions].sort((v1, v2) =>
    ORDER_MAP[order](
      semver.valid(semver.coerce(v1)),
      semver.valid(semver.coerce(v2))
    )
  )
}

export const lt = (val1, val2) =>
  semver.lt(semver.coerce(val1), semver.coerce(val2))

export default {
  sort,
  lt
}
