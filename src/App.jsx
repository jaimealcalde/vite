import { useEffect, useState } from 'react'
import { TwitterUsers } from './components/TwitterUsers.jsx'
import { Square } from './components/Square.jsx'
import { WinnerModal } from './components/WinnerModal.jsx'
import { TURNS, WINNER_COMBOS } from './constants.js'
import './App.css'

function App () {
  const [board, setBoard] = useState(() => {
    const boardStorage = window.localStorage.getItem('board')
    if (boardStorage) return JSON.parse(boardStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnStorage = window.localStorage.getItem('turn')
    return turnStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const turnX = () => {
    if (turn === TURNS.X) return 'square is-selected'
    if (turn === TURNS.O) return 'square'
  }

  const turnO = () => {
    if (turn === TURNS.O) return 'square is-selected'
    if (turn === TURNS.X) return 'square'
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    window.localStorage.setItem('board', JSON.stringify(board))

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    window.localStorage.setItem('turn', turn)

    const checkWinner = () => {
      for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (newBoard[a] &&
          newBoard[a] === newBoard[b] &&
          newBoard[a] === newBoard[c]) {
          return newBoard[a]
        }
      }
      return null
    }
    const checkEndGame = (newBoard) => {
      return newBoard.every((square) => square !== null)
    }
    if (checkWinner) {
      setWinner(checkWinner)
    } else if (checkEndGame) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <>
      <h1>Vite + React</h1>
      <section className='App'>
        <TwitterUsers />
      </section>
      <main className='board'>
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className='game'>
          {
            board.map((square, index) => (
              <Square className='square' updateBoard={updateBoard} index={index} key={index}>
                {square}
              </Square>
            ))
          }
        </section>
        <section className='turn'>
          <Square className={turnX()}>
            {TURNS.X}
          </Square>
          <Square className={turnO()}>
            {TURNS.O}
          </Square>
        </section>
        <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </>
  )
}

export default App
