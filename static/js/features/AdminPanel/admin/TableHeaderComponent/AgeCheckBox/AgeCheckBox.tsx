import React from 'react'

import styles from './AgeCheckBox.module.scss'

import { RangeType } from 'app/store'
import { ReactComponent as CheckedIcon } from 'assets/icons/svgIcons/checkedIcon.svg'
import { CheckBoxWrapper } from 'common/components'

type AgeCheckBoxPropsType = {
  resetHandler: () => void
  isReset: boolean
  filteredAges: RangeType | null
  filterAgesHandler: (ages: RangeType) => void
}

export const AgeCheckBox = (props: AgeCheckBoxPropsType) => {
  const { resetHandler, isReset, filteredAges, filterAgesHandler } = props
  const ages = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']

  const onClickHandler = (ageRange: string) => {
    if (
      filteredAges &&
      filteredAges.from &&
      ageRange.replace('+', '').split('-')[0] === filteredAges.from.replace('+', '')
    ) {
      return
    }

    const ageParts = ageRange.replace('+', '').split('-')
    let ageRangeObject: RangeType

    if (ageParts.length === 1) {
      ageRangeObject = { from: ageParts[0] }
    } else {
      ageRangeObject = { from: ageParts[0], to: ageParts[1] }
    }

    filterAgesHandler(ageRangeObject)
  }

  return (
    <CheckBoxWrapper reset={resetHandler} isReset={isReset} className={styles.container}>
      {ages.map((el, i) => {
        const isActive =
          filteredAges &&
          filteredAges.from &&
          el.replace('+', '').split('-')[0] === filteredAges.from.replace('+', '')
        const itemStyle = isActive ? `${styles.item} ${styles.selected}` : styles.item
        const iconStyle = isActive ? { opacity: 1 } : { opacity: 0 }

        return (
          <div key={i} className={itemStyle} onClick={() => onClickHandler(el)}>
            <div className={styles.title}>
              <div className={styles.name}>{el}</div>
            </div>
            <CheckedIcon style={iconStyle} />
          </div>
        )
      })}
    </CheckBoxWrapper>
  )
}
