// store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  size: string | null
  color: string | null
}

interface CartStore {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

function calculateTotals(items: CartItem[]) {
  return {
    itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemCount: 0,
      subtotal: 0,

      addItem: (newItem) => {
        const items = get().items
        const existingIdx = items.findIndex(
          (i) => i.id === newItem.id && i.size === newItem.size && i.color === newItem.color
        )

        let updated: CartItem[]
        if (existingIdx >= 0) {
          updated = items.map((item, i) =>
            i === existingIdx ? { ...item, quantity: item.quantity + newItem.quantity } : item
          )
        } else {
          updated = [...items, newItem]
        }

        set({ items: updated, ...calculateTotals(updated) })
      },

      removeItem: (id) => {
        const updated = get().items.filter((i) => i.id !== id)
        set({ items: updated, ...calculateTotals(updated) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        const updated = get().items.map((i) => (i.id === id ? { ...i, quantity } : i))
        set({ items: updated, ...calculateTotals(updated) })
      },

      clearCart: () => set({ items: [], itemCount: 0, subtotal: 0 }),
    }),
    {
      name: 'aura-cart',
    }
  )
)
