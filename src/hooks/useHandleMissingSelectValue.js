import { useState, useEffect } from 'react'

const useHandleMissingSelectValue = (
  selectMenuData,
  identificationKey = 'id',
  currentValue,
  updateFormData
) => {
  const [userWarning, setUserWarning] = useState()

  useEffect(() => {
    if (!selectMenuData || selectMenuData.length === 0 || !currentValue) {
      return
    }

    const hasFieldValue = (selectMenuData || []).some(
      repo => repo[identificationKey] === currentValue
    )

    hasFieldValue === false && updateFormData?.('')

    setUserWarning(
      hasFieldValue === false
        ? 'The value previously set is no longer available. Please choose a new value and redeploy.'
        : undefined
    )
  }, [selectMenuData, currentValue, updateFormData])

  return userWarning
}

export default useHandleMissingSelectValue
