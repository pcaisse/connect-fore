var assert = require('assert')
var express = require('express')
var Nightmare = require('nightmare')

var nightmare = Nightmare()

var start = require('../lib/start')


var YELLOW = "rgb(255, 255, 0)"
var RED = "rgb(255, 0, 0)"


describe('ui tests', function() {
  var port = 3001
  var server, url
  before(function() {
    server = start(port)
    url = 'http://localhost:' + port
  })
  after(function() {
    server.close()
  })
  it('test disc dropping and colors', function(done) {
    // Player 1's disc is yellow and drops to last free cell in column
    // Plyaer 2's disc is red and when played in same column drops on top
    nightmare
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
})
