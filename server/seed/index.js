'use strict'

// Testing faker library.
import faker from 'faker'
import { User, Project, Customer } from './../sqldb'

function getUser () {
  return {
    'email': faker.internet.email(),
    // 'password': faker.internet.password(),
    'password': 'defaultPassword',
    'first_name': faker.name.firstName(),
    'last_name': faker.name.lastName()
  }
}

function getCustomer () {
  return {
    'email': faker.internet.email(),
    'company': faker.company.companyName(),
    'first_name': faker.name.firstName(),
    'last_name': faker.name.lastName(),
    'address': faker.address.streetAddress(),
    'postal_code': faker.address.zipCode(),
    'city': faker.address.city(),
    'state': faker.address.state(),
    'country': faker.address.country(),
    'phone_number': faker.phone.phoneNumber()
  }
}

function getProject () {
  return {
    'name': faker.company.companyName(),
    'description': faker.company.catchPhrase(),
    'budget': faker.random.number()
  }
}

function bulkUsers (count = 5) {
  let values = Array(count).fill().map(index => getUser())
  return User.bulkCreate(values, {
    individualHooks: true
  })
}

function bulkCustomers (count = 5) {
  let values = Array(count).fill().map(index => getCustomer())
  return Customer.bulkCreate(values)
}

function bulkProjects (count = 5) {
  let values = Array(count).fill().map(index => getProject())
  return Project.bulkCreate(values)
}

export default function (bulk = false) {
  if (bulk) {
    return bulkCustomers()
            .then(bulkUsers())
            .then(bulkProjects())
  } else return Promise.resolve(true)
}
