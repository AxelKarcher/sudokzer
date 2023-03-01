import {useState, useEffect} from 'react'
import {makepuzzle} from 'sudoku'

import './App.scss'

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

const bIdx = [
	[0, 1, 2, 9, 10, 11, 18, 19, 20],
	[3, 4, 5, 12, 13, 14, 21, 22, 23],
	[6, 7, 8, 15, 16, 17, 24, 25, 26],
	[27, 28, 29, 36, 37, 38, 45, 46, 47],
	[30, 31, 32, 39, 40, 41, 48, 49, 50],
	[33, 34, 35, 42, 43, 44, 51, 52, 53],
	[54, 55, 56, 63, 64, 65, 72, 73, 74],
	[57, 58, 59, 66, 67, 68, 75, 76, 77],
	[60, 61, 62, 69, 70, 71, 78, 79, 80]
]

const App = () => {

  const [grid, setGrid] = useState(Array(81).fill())
  const [currNb, setCurrNb] = useState('0')
  const [isCandidate, setIsCandidate] = useState(false)

	useEffect(() => {
		let puzzle = makepuzzle()

		setGrid(puzzle?.map((elem) => {
			if (!elem) {
				return {content: [], isCandidate: false}
			} else {
				return {content: [elem?.toString()]}
			}
		}))
	}, [])

  const handleCellClick = (i) => {
		setGrid((old) =>
			old.map((elem, idx) => {
				if (idx === i && elem?.isCandidate !== undefined) {
					let newContent

					if (currNb === '0') {
						newContent = []
					} else if (isCandidate && elem?.isCandidate) {
						if (elem?.content?.includes(currNb)) {
							newContent = elem?.content?.filter((nb) => {return nb !== currNb})
						} else {
							newContent = elem?.content?.concat(currNb)?.sort()
						}
					} else {newContent = [currNb]}

					return {...elem, content: newContent, isCandidate: isCandidate}
				}
				return elem
			}
		))
  }

  return (
    <div id='app-container'>
      <div id='grid' className='panel-base'>
				{Array(9).fill()?.map((_elem1, i1) => (
					<div className='block' key={i1} style={{borderRadius: 16}}>
						{bIdx[i1]?.map((idx, i2) => (
							<div
								key={i2}
								className={
									'cell' +
									(grid[idx]?.isCandidate ? ' candidates' : '') +
									(grid[idx]?.isCandidate === undefined ? ' default' : '')
								}
								onClick={() => handleCellClick(idx)}
							>
								{grid[idx]?.content?.map((digit, i3) => (
									<div key={i3}>{digit}</div>))
								}
							</div>
						))}
					</div>
				))}
      </div>
      <div id='panel' className='panel-base'>
				<div id='numbers'>
					{numbers?.map((elem, i) => (
						<div
							key={i}
							className={'cell' + (elem === currNb ? ' selected' : '')}
							onClick={() => setCurrNb(elem)}
						>
							{elem === '0' ? 'X' : elem}
						</div>
					))}
				</div>
				<div
					id='candidate'
					onClick={() => setIsCandidate((old) => !old)}
				>
					{isCandidate ? 'Candidate' : 'Real'}
				</div>
      </div>
    </div>
  )
}

export default App
