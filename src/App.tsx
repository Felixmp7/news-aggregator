import { ArticleDrawer } from '@/components/ArticleDrawer'
import { HeroTitle } from '@/components/HeroTitle'
import { NewsGrid } from '@/components/NewsGrid'
import { Drawer } from '@/components/ui/drawer'
import { useNewsAggregator } from '@/hooks/useNewsAggregator'
import { Filters } from './components/Filters'


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
        handleChangeSource,
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
                <Filters
                    sourceSelected={sourceSelected}
                    keywordValues={keywordValues}
                    dateRange={dateRange}
                    category={category}
                    handleChangeSource={handleChangeSource}
                    handleChangeKeywords={handleChangeKeywords}
                    handleChangeCategory={handleChangeCategory}
                    handleChangeRange={handleChangeRange}
                    handleClickSearch={handleClickSearch}
                />
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
