import { create } from 'zustand'

interface BookStore {
    loading: boolean;
    bookList: [];
    searchBy: string;
    searchString: string;
    setSearchBy: Function;
    fetchBookList: Function;
    cleanList: Function;
    setSearchString: Function;
    endOfList: boolean;
}

interface FetchParams {
    title: string;
    pageNumber: number;
    searchBy: string;
}

export const useStore = create<BookStore>((set) => ({
    loading: false,
    bookList: [],
    endOfList: false,
    searchBy: 'search',
    searchString: 'Harry Potter',
    setSearchString: (val: string) => set({ searchString: val}),
    setSearchBy: (val: string) => set({ searchBy: val }),
    fetchBookList: ({ title, pageNumber, searchBy }: FetchParams) => {
        set({ loading: true });
        console.log("============", `https://openlibrary.org/search.json?${searchBy === 'authors' ? 'author&': ''}q=${title}&page=${pageNumber}`)
        fetch(`https://openlibrary.org/search.json?${searchBy === 'authors' ? 'author=': 'q='}${title}&page=${pageNumber}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("data ====", data)
                set({ endOfList: data.docs.length == 0 })
                set((state) => {
                    const newData = [...state.bookList, ...data.docs]
                    return { bookList: newData }
                })
                set({ loading: false })

            })
            .catch(err => {
                console.log("Error ====", err)
                set({ loading: false })
            })
    },
    cleanList: () => set({ bookList: [] })
}))