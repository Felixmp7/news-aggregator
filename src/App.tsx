import { ArticleDrawer } from '@/components/ArticleDrawer'
import { HeroTitle } from '@/components/HeroTitle'
import { NewsGrid } from '@/components/NewsGrid'
import { SelectSource } from '@/components/SelectSource'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Drawer } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { useNewsAggregator } from '@/hooks/useNewsAggregator'


export const App = () => {
    const {
        sourceSelected,
        keywordValues,
        category,
        articleSelected,
        articles,
        dateRange,
        isLoadingNewsApi,
        isLoadingGuardian,
        isLoadingNYTimes,
        handleChangeRange,
        handleOnChangeSource,
        handleChangeKeywords,
        handleChangeCategory,
        handleClickSearch,
        handleSelectArticle
    } = useNewsAggregator()

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
                    onChange={(event) => handleChangeCategory(event.target.value)}
                />
                <DateRangePicker
                    className='col-span-1 sm:col-span-2 w-full xl:col-span-1 xl:w-[300px]'
                    date={dateRange}
                    onChangeRange={handleChangeRange}
                />
                <Button
                    className='xl:ml-auto'
                    onClick={handleClickSearch}
                >
                    Search
                </Button>
            </section>
            <Drawer open={!!articleSelected} onClose={handleSelectArticle}>
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
