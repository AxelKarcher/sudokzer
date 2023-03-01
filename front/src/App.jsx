import {useState} from 'react'
import axios from 'axios'

import './App.scss'

const numbers = [
	{label: '1', value: '1'},
	{label: '2', value: '2'},
	{label: '3', value: '3'},
	{label: '4', value: '4'},
	{label: '5', value: '5'},
	{label: '6', value: '6'},
	{label: '7', value: '7'},
	{label: '8', value: '8'},
	{label: '9', value: '9'},
	{label: 'X', value: '0'}
]

const App = () => {

  const [grid, setGrid] = useState(Array(81).fill({content: [], isCandidate: false}))
  const [currNb, setCurrNb] = useState('0')
  const [isCandidate, setIsCandidate] = useState(false)

  const handleCellClick = (i) => {
		setGrid((old) =>
			old.map((elem, idx) => {
				if (idx === i) {
					if (currNb === '0') {
						return {...elem, content: []}
					}
					if (isCandidate && elem?.isCandidate) {
						if (elem?.content?.includes(currNb)) {
							return {...elem, content: elem?.content?.filter((nb) => {
								return nb !== currNb
							})}
						} else {
							return {...elem, content: elem?.content?.concat(currNb)?.sort()}
						}
					} else {
						return {...elem, content: [currNb], isCandidate: isCandidate}
					}
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
						{grid?.slice(i1 * 9, i1 * 9 + 9)?.map((elem2, i2) => (
							<div
								key={i2}
								className={'cell' + (elem2?.isCandidate ? ' candidates' : '')}
								onClick={() => handleCellClick(i2 + i1 * 9)}
							>
								{elem2?.content?.map((elem2, i2) => (<div key={i2}>{elem2}</div>))}
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
							className='cell'
							onClick={() => setCurrNb(elem?.value)}
							style={{backgroundColor: elem?.value === currNb ? 'black' : 'white',
								color: elem?.value === currNb ? 'white' : 'black'
							}}
						>
							{elem?.label}
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
