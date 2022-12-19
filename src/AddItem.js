import React from 'react'
import { FaPlus } from 'react-icons/fa'

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
	return (
		<form className='addForm' onSubmit={handleSubmit}>
			<label htmlFor='addItem'>Add Item</label>
			<input
				autoFocus
				id='addItem'
				type='text'
				placeholder='Add Item'
				required
				value={newItem}
				onChange={(e) => setNewItem(e.target.value)}
			/>
			<button type='submit' aria-label='Add Item'>
				<FaPlus />
			</button>
		</form>
	)
}

export default AddItem

// import React, { useState } from 'react'
// import { FaPlus } from 'react-icons/fa'
// import { nanoid } from 'nanoid'

// const AddItem = ({ addShoppingItem }) => {
//   const [item, setItem] = useState('')

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const shoppingItem = {
//       id: nanoid(),
//       checked: false,
//       item,
//     }
//     addShoppingItem(shoppingItem)
//     setItem('')
//   }

//   return (
//     <form className='addForm' onSubmit={handleSubmit}>
//       <label htmlFor='addItem'>Add Item</label>
//       <input
//         autoFocus
//         id='addItem'
//         type='text'
//         placeholder='Add Item'
//         required
//         value={item}
//         onChange={(e) => {
//           setItem(e.target.value)
//         }}
//       />
//       <button type='submit' aria-label='Add Item'>
//         <FaPlus />
//       </button>
//     </form>
//   )
// }

// export default AddItem
