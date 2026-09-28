import type React from 'react'
import { useRef } from 'react'

import { scrollToElement, scrollToTop } from '@/infrastructure/browser'
import { Lid } from '@/presentation/components/lid'
import { Main } from '@/presentation/components/main'
import { Button } from '@/presentation/components/ui/button'
import { useIndexedPageTitle } from '@/presentation/head/use-document-title'
import { useTranslate } from '@/presentation/i18n/i18n-provider'

import { BoxContents } from './box-contents'

import './home-page.sass'

export const HomePage: React.FC = () => {
  const translate = useTranslate()
  useIndexedPageTitle('home')
  const lidTitleRef = useRef<HTMLHeadingElement>(null)
  const contentsTitleRef = useRef<HTMLHeadingElement>(null)

  const openBox = (): void => {
    const contentsTitle = contentsTitleRef.current

    if (contentsTitle !== null) {
      contentsTitle.focus({ preventScroll: true })
      scrollToElement(contentsTitle)
    }
  }

  const closeLid = (): void => {
    lidTitleRef.current?.focus({ preventScroll: true })
    scrollToTop()
  }

  return (
    <Main className='home-page'>
      <Lid
        band={
          <>
            <p>{translate('home.role')}</p>
            <Button icon='chevronDown' onPress={openBox} variant='accent'>
              {translate('home.openBox')}
            </Button>
          </>
        }
        isTall
        title={translate('home.title')}
        titleRef={lidTitleRef}
      />
      <BoxContents onCloseLid={closeLid} titleRef={contentsTitleRef} />
    </Main>
  )
}
