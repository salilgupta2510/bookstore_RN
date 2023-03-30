import { create } from 'zustand'

interface BookStore {
    loading: boolean;
    bookList: [];
    fetchBookListByName: Function;
    cleanList: Function;
    endOfList: boolean;
}

interface FetchParams {
    title: string;
    pageNumber: number;
}

export const useStore = create<BookStore>((set) => ({
    loading: false,
    bookList: [],
    endOfList: false,
    fetchBookListByName: ({ title, pageNumber }: FetchParams) => {
        set({ loading: true });
        fetch(`https://openlibrary.org/search.json?title=${title}&page=${pageNumber}`)
        .then((response) => response.json())
        .then((data) => {
            set({ endOfList: data.docs.length == 0 })
            set((state) => {
                const newData = [...state.bookList, ...data.docs]
                return { bookList: newData }
            })
            set({ loading: false })

        })
    },
    cleanList: () => set({bookList: []})
}))