const utils = require('./utils')
const expect = require('expect')

it('should add two numbers', () => {
  var res = utils.add(33, 11)
  expect(res).toBe(44).toBeA('number')
})

it('should square the number', () => {
  var res = utils.square(11)
  expect(res).toBe(121).toBeA('number')
})

it('should verify user\'s first and last name', () => {
  var user = {}
  var res = utils.setName(user, "Giorgi Ghviniashvili")
  expect(res).toInclude({
    firstName: 'Giorgi',
    lastName: 'Ghviniashvili'
  })
})

it('should async add two numbers', (done) => {
  utils.asyncAdd(4, 3, (sum) => {
    expect(sum).toBe(7).toBeA('number')
    done()
  })
})

it('should async square a number', (done) => {
  utils.asyncSquare(3, (square) => {
    expect(square).toBe(9).toBeA('number')
    done()
  })
})

// it('should expect some values', () => {
  // expect(12).toNotBe(11)
  // expect({
  //   name: 'Giorgi'
  // })
  // .toNotEqual({
  //   name: 'Giorgi'
  // })
  // expect([10, 12, 13])
  //   .toExclude(1)
  // expect({
  //   name: 'Giorgi',
  //   age: 25,
  //   location: 'Tbilisi'
  // }).toInclude({
  //   age: 24
  // })
// })
