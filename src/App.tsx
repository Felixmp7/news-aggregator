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

    const handleClickSearch = () => {
        search();
        if (sourceSelected === 'news-api') fetchNewsApi()
        if (sourceSelected === 'guardian') fetchGuardians()
    }

    const handleOnChangeSource = (source: Source) => setSourceSelected(source)

    const handleChangeKeywords = (keywords: string) => setKeywordValues(keywords)
    const onChangeCategory = (category: string) => setCategory(category)

    const handleSelectArticle = (article: Article) => setArticleSelected(article)

    const articles = sourceSelected === 'news-api' ? newsData?.articles : guardianData?.articles

    return (
        <main>
            <HeroTitle className='mb-40' />
            <section className='flex items-center justify-between gap-20 container mx-auto mb-10'>
                <Input
                    placeholder='Search by keyword...'
                    value={keywordValues ?? ''}
                    onChange={(event) => handleChangeKeywords(event.target.value)}
                />
                <div className='flex items-center gap-5'>
                    <SelectSource value={sourceSelected} onChange={handleOnChangeSource} />
                    <Input
                        placeholder='Type a category or section'
                        value={category ?? ''}
                        onChange={(event) => onChangeCategory(event.target.value)}
                    />
                    <DateRangePicker date={dateRange} onChangeRange={onChangeRange} />
                    <Button onClick={handleClickSearch}>Search</Button>
                </div>
            </section>
            <Drawer open={!!articleSelected} onClose={() => setArticleSelected(undefined)}>
                <NewsGrid
                    articles={articles}
                    isLoading={isLoadingNewsApi || isLoadingGuardian}
                    onSelectArticle={handleSelectArticle}
                />
                <ArticleDrawer articleSelected={articleSelected} />
            </Drawer>
        </main>
    )
}

export default App
