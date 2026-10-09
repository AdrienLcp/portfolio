import { useEffect } from 'react'

/**
 * Set on `<html>` once React owns the prerendered page. Before it, a click
 * gets the browser's own behaviour, a full page load or a native form submit;
 * the end-to-end journeys wait for it before they act.
 */
const HYDRATED_ATTRIBUTE = 'data-hydrated'

export const useHydrationMark = (): void => {
  useEffect(() => {
    document.documentElement.setAttribute(HYDRATED_ATTRIBUTE, '')
  }, [])
}
