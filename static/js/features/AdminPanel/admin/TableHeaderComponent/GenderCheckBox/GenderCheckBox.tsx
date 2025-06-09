import React from 'react'

import styles from './GenderCheckBox.module.scss'

import { GenderType, selectedGenders } from 'app/store'
import { ReactComponent as CheckedIcon } from 'assets/icons/svgIcons/checkedIcon.svg'
import { useAppSelector } from 'common'
import { CheckBoxWrapper } from 'common/components'

type GenderCheckBoxPropsType = {
  resetHandler: () => void
  isReset: boolean
  genderFiltered: GenderType | null
  setFilterGenderHandler: (gender: GenderType) => void
}
export const GenderCheckBox = (props: GenderCheckBoxPropsType) => {
  const { resetHandler, isReset, genderFiltered, setFilterGenderHandler } = props
  const genders = useAppSelector(selectedGenders)

  return (
    <CheckBoxWrapper reset={resetHandler} isReset={isReset} className={styles.container}>
      {genders.map((el, i) => {
        const itemStyle = el === genderFiltered ? `${styles.item} ${styles.selected}` : styles.item

        return (
          <div
            key={i}
            className={itemStyle}
            onClick={() => setFilterGenderHandler(el as GenderType)}
          >
            <div className={styles.title}>
              <div className={styles.name}>{el === 'male' ? 'мужской' : 'женский'}</div>
            </div>
            <CheckedIcon style={el === genderFiltered ? { opacity: 1 } : { opacity: 0 }} />
          </div>
        )
      })}
    </CheckBoxWrapper>
  )
}
