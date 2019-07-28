const createdTimestamp = 'createdTimestamp'
const lastUpdatedTimestamp = 'createdTimestamp'
const version = 'version'

const createItem = (data) => {
  data[createdTimestamp] = Date.now()
  data[version] = 1
  return data
}

const updateItem = (data) => {
  data[lastUpdatedTimestamp] = Date.now()
  data[version]++
  return data
}

module.exports = {
  createItem,
  updateItem,
}