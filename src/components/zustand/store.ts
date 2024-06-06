import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CountState {
  count1: number
  count2: number
  increase1: (by: number) => void
  increase2: (by: number) => void
}

export const useCountStore = create<CountState>()(
  devtools(
    persist(
      (set) => ({
        count1: 0,
        count2: 0,
        increase1: (by) => set((state) => ({count1: state.count1 + by})),
        increase2: (by) => set((state) => ({count2: state.count2 + by})),
      }),
      {
        name: 'count-storage',
      }
    )
  )
)