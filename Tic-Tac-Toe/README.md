# Tic-Tac-Toe
A simple and interactive Tic Tac Toe game built with HTML, CSS, and JavaScript.

## Features
- **Two-player mode**: Play with a friend.
- **Single-player mode**: Challenge an AI opponent.

## Demo
[Check out the live demo here!](https://gopika4112.github.io/Tic-Tac-Toe/)  

## How to Play
1. Choose the game mode:
   - **Two-player**: Both players take turns.
   - **Single-player**: Play against an AI opponent.
2. Click on an empty cell to make a move.
3. The game ends when a player forms a winning combination or all cells are filled (resulting in a draw).
4. Reset the game to play again!

# ✨ JavaScript Basics Cheat Sheet

This cheat sheet explains the JavaScript functions and code used in the Tic Tac Toe game, in simple words.

---

## 🧱 Getting Things from the Page

### `document.getElementById('id')`
- Finds one element using its **id**.
- 📌 Example: `document.getElementById('board')` gets the game board.

### `document.querySelector('thing')`
- Finds the **first** matching thing (like a tag or class).
- 📌 Example: `document.querySelector('.cell')` gets the first box.

### `document.querySelectorAll('thing')`
- Finds **all** matching things (like all buttons).
- 📌 Example: `document.querySelectorAll('.mode-button')` gets both mode buttons.

---

## ✏️ Changing What's on the Page

### `.textContent`
- Changes the text inside an element.
- 📌 Example: `status.textContent = "X's turn"` shows the current player.

### `.classList.add('class-name')`
- Adds a style (CSS class).
- 📌 Example: `cell.classList.add('winner')` highlights winning boxes.

### `.classList.remove('class-name')`
- Removes a style (CSS class).

### `.setAttribute('name', value)`
- Adds extra data to an element.
- 📌 Example: `cell.setAttribute('data-index', i)` gives each box a number.

### `.getAttribute('name')`
- Gets the value you added using `setAttribute()`.

---

## 🧠 Reacting to Clicks

### `.addEventListener('click', someFunction)`
- Runs some code when a user clicks.
- 📌 Example: `cell.addEventListener('click', handleCellClick)`

---

## 📋 Arrays and List Actions

### `Array(9).fill('')`
- Makes a list with 9 empty items.

### `.every(...)`
- Checks if **all** items in a list meet a condition.
- 📌 Example: `gameBoard.every(cell => cell !== '')` checks if board is full.

### `.some(...)`
- Checks if **any** item matches something.

### `.map(...)`
- Changes every item in a list.

### `.filter(...)`
- Keeps only items that match.


---

## 🎲 Random and Math

### `Math.random()`
- Gives a random number between 0 and 1.

### `Math.floor(number)`
- Rounds a number down (removes decimal).

---

## ⏰ Wait Before Doing Something

### `setTimeout(function, timeInMs)`
- Waits and then runs code.
- 📌 Example: `setTimeout(makeAIMove, 500)` waits 0.5 seconds.

---

## ❓ Switching Between Values

### `currPlayer === 'X' ? 'O' : 'X'`
- If `currPlayer` is X, it becomes O. Otherwise, it becomes X.

---

Happy Hacking!

