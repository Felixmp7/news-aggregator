import { ArticleDrawer } from '@/components/ArticleDrawer'
import { HeroTitle } from '@/components/HeroTitle'
import { NewsFeed } from '@/components/NewsFeed'
import { Drawer } from '@/components/ui/drawer'
import { useNewsAggregator } from '@/hooks/useNewsAggregator'
import { Filters } from './components/Filters'


export const App = () => {
    const {
        sourceSelected,
        keywordValues,
        categorySelected,
        articleSelected,
        articles,
        isNothingFetched,
        dateRangeSelected,
        isLoadingNewsApi,
        isLoadingGuardian,
        isLoadingNYTimes,
        clearFilters,
        handleChangeRange,
        handleChangeSource,
        handleChangeKeywords,
        handleChangeCategory,
        handleClickSearch,
        handleSelectArticle,
        handleSaveFiltersInLocalStorage,
    } = useNewsAggregator()

    return (
        <main className='container mx-auto px-5'>
            <HeroTitle className='mb-40' />
            <section
                className='grid grid-cols-1 sm:grid-cols-3 xl:flex xl:flex-wrap xl:items-center gap-5 mb-10'
            >
                <Filters
                    sourceSelected={sourceSelected}
                    keywordValues={keywordValues}
                    dateRange={dateRangeSelected}
                    category={categorySelected}
                    handleChangeSource={handleChangeSource}
                    handleChangeKeywords={handleChangeKeywords}
                    clearFilters={clearFilters}
                    handleChangeCategory={handleChangeCategory}
                    handleChangeRange={handleChangeRange}
                    handleClickSearch={handleClickSearch}
                    handleSaveFiltersInLocalStorage={handleSaveFiltersInLocalStorage}
                />
            </section>
            <Drawer open={!!articleSelected} onClose={handleSelectArticle}>
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pb-10">
                    <NewsFeed
                        articles={articles}
                        isNothingFetched={isNothingFetched}
                        isLoading={isLoadingNewsApi || isLoadingGuardian || isLoadingNYTimes}
                        onSelectArticle={handleSelectArticle}
                    />
                </section>
                <ArticleDrawer articleSelected={articleSelected} />
            </Drawer>
        </main>
    )
}
