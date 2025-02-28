import { useState } from 'react'

import { ArticleDrawer } from '@/components/ArticleDrawer'
import { HeroTitle } from '@/components/HeroTitle'
import { NewsGrid } from '@/components/NewsGrid'
import { SelectSource } from '@/components/SelectSource'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Drawer } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { useDateRangePicker } from '@/hooks/useDateRangePicker'
import { useQuery } from '@/hooks/useQuery'
import { useUrlSearchParams } from '@/hooks/useUrlSearchParams'
import { getDataFromNewsApiSource } from "@/services/newsapi.service"
import type { Article, Source } from './models/newsaggregator.types'
import { getDataFromNYTimesSource } from './services/new-york-times.service'
import { getDataFromTheGuardiansApiSource } from './services/the-guardian.service'


function App() {
    const [articleSelected, setArticleSelected]= useState<Article>()
    const [keywordValues, setKeywordValues]= useState('')
    const [category, setCategory] = useState('')
    const [sourceSelected, setSourceSelected] = useState<Source>('news-api')

    const { dateRange, onChangeRange } = useDateRangePicker();
    const { search } = useUrlSearchParams({
        keywords: keywordValues,
        source: 'news-api',
        category: category,
        dateRange: dateRange
    });
    const {
        data: newsData,
        isLoading: isLoadingNewsApi,
        fetch: fetchNewsApi
    } = useQuery(getDataFromNewsApiSource)

    const {
        data: guardianData,
        isLoading: isLoadingGuardian,
        fetch: fetchGuardians
    } = useQuery(getDataFromTheGuardiansApiSource)

    const {
        data: nyTimesData,
        isLoading: isLoadingNYTimes,
        fetch: fetchNYTimes
    } = useQuery(getDataFromNYTimesSource)

    const handleClickSearch = () => {
        search();
        if (sourceSelected === 'news-api') fetchNewsApi()
        if (sourceSelected === 'guardian') fetchGuardians()
        if (sourceSelected === 'new-york-times') fetchNYTimes()
    }

    const handleOnChangeSource = (source: Source) => setSourceSelected(source)

    const handleChangeKeywords = (keywords: string) => setKeywordValues(keywords)
    const onChangeCategory = (category: string) => setCategory(category)

    const handleSelectArticle = (article: Article) => setArticleSelected(article)

    const data = {
        'news-api': newsData?.articles,
        'guardian': guardianData?.articles,
        'new-york-times': nyTimesData?.articles
    }

    const articles = data[sourceSelected] ?? []

    return (
        <main className='container mx-auto px-5'>
            <HeroTitle className='mb-40' />
            <section
                className='grid grid-cols-1 sm:grid-cols-3 xl:flex xl:flex-wrap xl:items-center gap-5 mb-10'
            >
                <SelectSource
                    className="w-full xl:w-[180px]"
                    value={sourceSelected}
                    onChange={handleOnChangeSource}
                />
                <Input
                    placeholder='Search by keyword...'
                    className='w-full xl:w-[300px]'
                    value={keywordValues ?? ''}
                    onChange={(event) => handleChangeKeywords(event.target.value)}
                />
                <Input
                    placeholder='Type a category or section'
                    className='w-full xl:w-[300px]'
                    value={category ?? ''}
                    onChange={(event) => onChangeCategory(event.target.value)}
                />
                <DateRangePicker className='col-span-1 sm:col-span-2 w-full xl:col-span-1 xl:w-[300px]' date={dateRange} onChangeRange={onChangeRange} />
                <Button
                    className='xl:ml-auto'
                    onClick={handleClickSearch}
                >
                            Search
                </Button>
            </section>
            <Drawer open={!!articleSelected} onClose={() => setArticleSelected(undefined)}>
                <NewsGrid
                    articles={articles}
                    isLoading={isLoadingNewsApi || isLoadingGuardian || isLoadingNYTimes}
                    onSelectArticle={handleSelectArticle}
                />
                <ArticleDrawer articleSelected={articleSelected} />
            </Drawer>
        </main>
    )
}

export default App
