import { useEffect, useState } from 'react'
import AddItem from './AddItem'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import SearchItem from './SearchItem'

function App() {
	const API_URL = 'http://localhost:3500/items'

	const [items, setItems] = useState([])
	const [newItem, setNewItem] = useState('')
	const [search, setSearch] = useState('')
	const [fetchError, setFetchError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await fetch(API_URL)
				if (!response.ok) {
					throw Error('Did not receive expected data.')
				}
				const listItems = await response.json()
				setItems(listItems)
				setFetchError(null)
			} catch (error) {
				setFetchError(error.message)
			} finally {
				setIsLoading(false)
			}
		}
		fetchItems()

		// // Simulate loading time
		// setTimeout(() => {
		// 	fetchItems()
		// }, 2000)
	}, [])

	const addItem = (item) => {
		const newListItem = {
			id: items?.length ? items[items.length - 1].id + 1 : 1,
			checked: false,
			item,
		}
		const listItems = [...items, newListItem]
		setItems(listItems)
		setNewItem('')
	}

	const handleCheck = (id) => {
		const listItems = items.map((item) =>
			item.id === id ? { ...item, checked: !item.checked } : item
		)
		setItems(listItems)
	}

	const handleDelete = (id) => {
		const listItems = items.filter((item) => item.id !== id)
		setItems(listItems)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!newItem) {
			return
		}
		addItem(newItem)
	}

	return (
		<div className='App'>
			<Header title='Grocery List' />
			<AddItem
				newItem={newItem}
				setNewItem={setNewItem}
				handleSubmit={handleSubmit}
			/>
			<SearchItem search={search} setSearch={setSearch} />
			<main>
				{isLoading ? (
					<p>Loading items....</p>
				) : fetchError ? (
					<p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>
				) : (
					<Content
						items={items.filter((item) =>
							item.item.toLowerCase().includes(search.toLowerCase())
						)}
						setItems={setItems}
						handleCheck={handleCheck}
						handleDelete={handleDelete}
						fetchError={fetchError}
					/>
				)}
			</main>
			<Footer length={items?.length ?? 0} />
		</div>
	)
}

export default App
