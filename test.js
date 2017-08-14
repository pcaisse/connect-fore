const { spawn } = require('child_process')
var assert = require('assert')
var express = require('express')
var Nightmare = require('nightmare')

var YELLOW = "rgb(255, 255, 0)"
var RED = "rgb(255, 0, 0)"
var WINNER = "WINNER!"


describe('ui tests', function() {
  var port = process.env.PORT || 3001
  var url = 'http://localhost:' + port
  var logValue

  beforeEach(function() {
    logValue = ''
  })

  before(function() {
    env = Object.assign({}, process.env, {PORT: port})
    child = spawn('node', ['index.js'], {env})

    child.stdout.on('data', function(data) {
      console.log('stdout: ' + data)
    })

    child.stderr.on('data', function(data) {
      console.log('stderr: ' + data)
    })
  })

  after(function() {
    child.kill()
  })

  it('test player 1 is yellow', function(done) {
    // Player 1's disc is yellow and drops to last free cell in column
    new Nightmare()
      .goto(url)
      .click('table tr:nth-child(2) td:nth-child(4)')
      .wait(10)
      .evaluate(function() {
        return window.getComputedStyle(
          document.querySelector('table tr:nth-child(6) td:nth-child(4)')
        ).getPropertyValue("background-color")
      })
      .end()
      .then(function(color) {
        assert(color === YELLOW)
        done()
      })
  })

  it('test disc dropping and colors', function(done) {
    // Player 1's disc is yellow and drops to last free cell in column
    // Player 2's disc is red and when played in same column drops on top
    new Nightmare()
      .goto(url)
      .click('table tr:nth-child(2) td:nth-child(4)')
      .click('table tr:nth-child(2) td:nth-child(4)')
      .wait(100)
      .evaluate(function() {
        return {
          player1CellBgColor: window.getComputedStyle(
            document.querySelector('table tr:nth-child(6) td:nth-child(4)')
          ).getPropertyValue("background-color"),
          player2CellBgColor: window.getComputedStyle(
            document.querySelector('table tr:nth-child(5) td:nth-child(4)')
          ).getPropertyValue("background-color")
        }
      })
      .end()
      .then(function(result) {
        assert(result.player1CellBgColor === YELLOW)
        assert(result.player2CellBgColor === RED)
        done()
      })
  })

  it('test vertical win', function(done) {
    // Player 1 drops all discs in first column
    // Player 2 drops all discs in second column
    new Nightmare()
      .on('console', function(log, msg) {
        logValue = msg
      })
      .goto(url)
      .click('table tr:nth-child(1) td:nth-child(1)')
      .click('table tr:nth-child(1) td:nth-child(2)')
      .click('table tr:nth-child(1) td:nth-child(1)')
      .click('table tr:nth-child(1) td:nth-child(2)')
      .click('table tr:nth-child(1) td:nth-child(1)')
      .click('table tr:nth-child(1) td:nth-child(2)')
      .click('table tr:nth-child(1) td:nth-child(1)')
      .wait(100)
      .evaluate(function() {
        return {
          player1CellBgColors: [
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(1)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(1)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(4) td:nth-child(1)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(3) td:nth-child(1)')
            ).getPropertyValue("background-color")
          ],
          player2CellBgColors: [
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(2)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(2)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(4) td:nth-child(2)')
            ).getPropertyValue("background-color")
          ]
        }
      })
      .end()
      .then(function(result) {
        assert(result.player1CellBgColors.every(function(bgColor) {
          return bgColor === YELLOW
        }))
        assert(result.player2CellBgColors.every(function(bgColor) {
          return bgColor === RED
        }))
        assert(logValue === WINNER)
        done()
      })
  })

  it('test horizontal win', function(done) {
    // Players 1 and 2 drop both discs straight across columns
    new Nightmare()
      .on('console', function(log, msg) {
        logValue = msg
      })
      .goto(url)
      .click('table tr:nth-child(1) td:nth-child(1)')
      .click('table tr:nth-child(1) td:nth-child(1)')
      .click('table tr:nth-child(1) td:nth-child(2)')
      .click('table tr:nth-child(1) td:nth-child(2)')
      .click('table tr:nth-child(1) td:nth-child(3)')
      .click('table tr:nth-child(1) td:nth-child(3)')
      .click('table tr:nth-child(1) td:nth-child(4)')
      .wait(100)
      .evaluate(function() {
        return {
          player1CellBgColors: [
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(1)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(2)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(3)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(4)')
            ).getPropertyValue("background-color")
          ],
          player2CellBgColors: [
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(1)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(2)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(3)')
            ).getPropertyValue("background-color")
          ]
        }
      })
      .end()
      .then(function(result) {
        assert(result.player1CellBgColors.every(function(bgColor) {
          return bgColor === YELLOW
        }))
        assert(result.player2CellBgColors.every(function(bgColor) {
          return bgColor === RED
        }))
        assert(logValue === WINNER)
        done()
      })
  })

  it('test diagonal win (bottom left to top right)', function(done) {
    new Nightmare()
      .on('console', function(log, msg) {
        logValue = msg
      })
      .goto(url)
      .click('table tr:nth-child(6) td:nth-child(3)')
      .click('table tr:nth-child(6) td:nth-child(4)')
      .click('table tr:nth-child(6) td:nth-child(4)')
      .click('table tr:nth-child(6) td:nth-child(5)')
      .click('table tr:nth-child(6) td:nth-child(6)')
      .click('table tr:nth-child(6) td:nth-child(5)')
      .click('table tr:nth-child(6) td:nth-child(5)')
      .click('table tr:nth-child(6) td:nth-child(6)')
      .click('table tr:nth-child(6) td:nth-child(7)')
      .click('table tr:nth-child(6) td:nth-child(6)')
      .click('table tr:nth-child(6) td:nth-child(6)')
      .wait(100)
      .evaluate(function() {
        return {
          player1CellBgColors: [
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(3)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(4)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(4) td:nth-child(5)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(3) td:nth-child(6)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(6)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(7)')
            ).getPropertyValue("background-color")
          ],
          player2CellBgColors: [
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(4)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(5)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(5)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(6)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(4) td:nth-child(6)')
            ).getPropertyValue("background-color")
          ]
        }
      })
      .end()
      .then(function(result) {
        assert(result.player1CellBgColors.every(function(bgColor) {
          return bgColor === YELLOW
        }))
        assert(result.player2CellBgColors.every(function(bgColor) {
          return bgColor === RED
        }))
        assert(logValue === WINNER)
        done()
      })
  })

  it('test diagonal win (top left to bottom right)', function(done) {
    new Nightmare()
      .on('console', function(log, msg) {
        logValue = msg
      })
      .goto(url)
      .click('table tr:nth-child(6) td:nth-child(7)')
      .click('table tr:nth-child(6) td:nth-child(6)')
      .click('table tr:nth-child(6) td:nth-child(6)')
      .click('table tr:nth-child(6) td:nth-child(5)')
      .click('table tr:nth-child(6) td:nth-child(4)')
      .click('table tr:nth-child(6) td:nth-child(5)')
      .click('table tr:nth-child(6) td:nth-child(5)')
      .click('table tr:nth-child(6) td:nth-child(4)')
      .click('table tr:nth-child(6) td:nth-child(4)')
      .click('table tr:nth-child(6) td:nth-child(3)')
      .click('table tr:nth-child(6) td:nth-child(4)')
      .wait(100)
      .evaluate(function() {
        return {
          player1CellBgColors: [
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(7)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(6)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(4) td:nth-child(5)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(3) td:nth-child(4)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(4) td:nth-child(4)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(4)')
            ).getPropertyValue("background-color")
          ],
          player2CellBgColors: [
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(3)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(5)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(6)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(4)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(5)')
            ).getPropertyValue("background-color")
          ]
        }
      })
      .end()
      .then(function(result) {
        assert(result.player1CellBgColors.every(function(bgColor) {
          return bgColor === YELLOW
        }))
        assert(result.player2CellBgColors.every(function(bgColor) {
          return bgColor === RED
        }))
        assert(logValue === WINNER)
        done()
      })
  })

  it('test dropping of discs', function(done) {
    // Players 1 and 2 drop both discs in the same column.
    // Discs should fill up in alternating colors and not
    // change from extra clicks once full.
    new Nightmare()
      .on('console', function(log, msg) {
        logValue = msg
      })
      .goto(url)
      .click('table tr:nth-child(3) td:nth-child(3)')
      .click('table tr:nth-child(3) td:nth-child(3)')
      .click('table tr:nth-child(3) td:nth-child(3)')
      .click('table tr:nth-child(3) td:nth-child(3)')
      .click('table tr:nth-child(3) td:nth-child(3)')
      .click('table tr:nth-child(3) td:nth-child(3)')
      .click('table tr:nth-child(3) td:nth-child(3)')
      .wait(100)
      .evaluate(function() {
        return {
          player1CellBgColors: [
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(6) td:nth-child(3)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(4) td:nth-child(3)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(2) td:nth-child(3)')
            ).getPropertyValue("background-color")
          ],
          player2CellBgColors: [
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(5) td:nth-child(3)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(3) td:nth-child(3)')
            ).getPropertyValue("background-color"),
            window.getComputedStyle(
              document.querySelector('table tr:nth-child(1) td:nth-child(3)')
            ).getPropertyValue("background-color")
          ]
        }
      })
      .end()
      .then(function(result) {
        assert(result.player1CellBgColors.every(function(bgColor) {
          return bgColor === YELLOW
        }))
        assert(result.player2CellBgColors.every(function(bgColor) {
          return bgColor === RED
        }))
        assert(logValue === '')
        done()
      })
  })
})
