import { useEffect, useState } from 'react'
import AddItem from './AddItem'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import SearchItem from './SearchItem'
import apiRequest from './apiRequest'

function App() {
  const API_URL = 'http://localhost:3500/items'

  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load data
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Please reload the app.')
        }
        const data = await response.json()
        setItems(data)
        setFetchError(null)
      } catch (error) {
        setFetchError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchItems()
  }, [])

  const addItem = async (item) => {
    const newItem = {
      id: items?.length ? items[items.length - 1].id + 1 : 1,
      checked: false,
      item,
    }
    const listItems = [...items, newItem]
    setItems(listItems)
    setNewItem('')
    // Add item to database
    const addOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    }
    const result = await apiRequest(API_URL, addOption)
    if (result) {
      setFetchError(result)
    }
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )
    setItems(listItems)
    // Update an item
    const updateOption = {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ checked: listItems.find((item) => item.id === id).checked }),
    }
    const result = await apiRequest(`${API_URL}/${id}`, updateOption)
    if (result) {
      setFetchError(result)
    }
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
    // Delete an item from database
    const deleteOption = {
      method: 'DELETE',
    }
    const result = await apiRequest(`${API_URL}/${id}`, deleteOption)
    if (result) {
      setFetchError(result)
    }
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
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading ? (
          <p>Loading items....</p>
        ) : fetchError ? (
          <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>
        ) : (
          <Content
            items={items.filter((item) => item.item.toLowerCase().includes(search.toLowerCase()))}
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

// -------------------------------------------------------------------
// import { useEffect, useState } from 'react'
// import AddItem from './AddItem'
// import Content from './Content'
// import Footer from './Footer'
// import Header from './Header'
// import SearchItem from './SearchItem'
// import apiRequest from './apiRequest'

// function App() {
//   const API_URL = 'http://localhost:3500/items'

//   const [items, setItems] = useState([])
//   const [newItem, setNewItem] = useState('')
//   const [search, setSearch] = useState('')
//   const [fetchError, setFetchError] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await fetch(API_URL)
//         if (!response.ok) {
//           throw Error('Did not receive expected data.')
//         }
//         const listItems = await response.json()
//         setItems(listItems)
//         setFetchError(null)
//       } catch (error) {
//         setFetchError(error.message)
//       } finally {
//         setIsLoading(false)
//       }
//     }
//     fetchItems()

//     // // Simulate loading time
//     // setTimeout(() => {
//     // 	fetchItems()
//     // }, 2000)
//   }, [])

//   const addItem = async (item) => {
//     const newItem = {
//       id: items?.length ? items[items.length - 1].id + 1 : 1,
//       checked: false,
//       item,
//     }
//     const listItems = [...items, newItem]
//     setItems(listItems)
//     setNewItem('')
//     // Save the item to database
//     const postOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newItem),
//     }
//     const result = await apiRequest(API_URL, postOptions)
//     if (result) {
//       setFetchError(result)
//     }
//   }

//   const handleCheck = async (id) => {
//     const listItems = items.map((item) =>
//       item.id === id ? { ...item, checked: !item.checked } : item
//     )
//     setItems(listItems)
//     // Update the item
//     const updatedItem = listItems.filter((item) => item.id === id)[0]
//     const updateOptions = {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ checked: updatedItem.checked }),
//     }
//     const result = await apiRequest(`${API_URL}/${id}`, updateOptions)
//     if (result) {
//       setFetchError(result)
//     }
//   }

//   const handleDelete = async (id) => {
//     const listItems = items.filter((item) => item.id !== id)
//     setItems(listItems)
//     // Deelet an item from database
//     const deleteOption = { method: 'DELETE' }
//     const result = await apiRequest(`${API_URL}/${id}`, deleteOption)
//     if (result) {
//       setFetchError(result)
//     }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (!newItem) {
//       return
//     }
//     addItem(newItem)
//   }

//   return (
//     <div className='App'>
//       {/* <Header title='Grocery List' /> */}
//       <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
//       <SearchItem search={search} setSearch={setSearch} />
//       <main>
//         {isLoading ? (
//           <p>Loading items....</p>
//         ) : fetchError ? (
//           <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>
//         ) : (
//           <Content
//             items={items.filter((item) => item.item.toLowerCase().includes(search.toLowerCase()))}
//             setItems={setItems}
//             handleCheck={handleCheck}
//             handleDelete={handleDelete}
//             fetchError={fetchError}
//           />
//         )}
//       </main>
//       <Footer length={items?.length ?? 0} />
//     </div>
//   )
// }

// export default App

// ------------------------------------------------------------------------------
