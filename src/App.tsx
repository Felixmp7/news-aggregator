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
import type { NewsapiArticle } from '@/models/newsapi.types'
import { getDataFromNewsApiSource } from "@/services/newsapi.service"


function App() {
    const [articleSelected, setArticleSelected]= useState<NewsapiArticle>()
    const [keywordValues, setKeywordValues]= useState('')
    const [category, setCategory] = useState('')

    const { dateRange, onChangeRange } = useDateRangePicker();
    const { search } = useUrlSearchParams({
        keywords: keywordValues,
        source: 'news-api',
        category: category,
        dateRange: dateRange
    });
    const { data, isLoading, fetch } = useQuery(getDataFromNewsApiSource)

    const handleClickSearch = () => {
        search();
        fetch()
    }

    const handleChangeKeywords = (keywords: string) => setKeywordValues(keywords)
    const onChangeCategory = (category: string) => setCategory(category)

    const handleSelectArticle = (article: NewsapiArticle) => setArticleSelected(article)

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
                    <SelectSource />
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
                    articles={data?.articles}
                    isLoading={isLoading}
                    onSelectArticle={handleSelectArticle}
                />
                <ArticleDrawer articleSelected={articleSelected} />
            </Drawer>
        </main>
    )
}

export default App
