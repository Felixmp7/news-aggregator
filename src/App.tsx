import { useQuery } from '@tanstack/react-query'

import { HeroTitle } from './components/HeroTitle'
import { NewsGrid } from './components/NewsGrid'
import { getNews } from "./services/newsapi.service"

function App() {
    const { data, isFetching, isLoading } = useQuery({ queryKey: ['news'], queryFn: getNews })

    return (
        <main>
            <HeroTitle className='mb-40' />
            <NewsGrid articles={data?.articles} isLoading={isFetching || isLoading} />
        </main>
    )
}

export default App
