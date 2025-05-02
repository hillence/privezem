import { MouseEvent } from 'react'

import styles from './IndexShops.module.scss'

import { ReactComponent as DiorIcon } from 'assets/icons/boutiques/dior.svg'
import { ReactComponent as FarfetchIcon } from 'assets/icons/shops/farfetch.svg'
import { ReactComponent as MrporterIcon } from 'assets/icons/shops/mrporter.svg'
import { ReactComponent as PorterIcon } from 'assets/icons/shops/porter.svg'
import { ReactComponent as PradaIcon } from 'assets/icons/shops/prada.svg'
import { ReactComponent as YooxIcon } from 'assets/icons/shops/yoox.svg'
import { AvailableBrandEnum } from 'types/available-brand-enum'

interface shopCardInterface {
  hoverHandler?: (e: MouseEvent) => void
  leaveHandler?: (e: MouseEvent) => void
  href?: string
  type?: AvailableBrandEnum
}

interface shopsIntarface {
  className?: string
  hoverHandler?: (e: MouseEvent) => void
  leaveHandler?: (e: MouseEvent) => void
  items?: any[]
}

const IndexShopsCard = (props: shopCardInterface) => {
  const { hoverHandler, leaveHandler, href = '#', type } = props

  const getIcon = (name: AvailableBrandEnum | undefined) => {
    switch (name) {
      case AvailableBrandEnum.Yoox:
        return <YooxIcon />
      case AvailableBrandEnum.Farfetch:
        return <FarfetchIcon />
      // case 'hermes':
      //   return <HermesIcon />
      case AvailableBrandEnum.NetAPorter:
        return <PorterIcon />
      case AvailableBrandEnum.MrPorter:
        return <MrporterIcon />
      case AvailableBrandEnum.Prada:
        return <PradaIcon />
      case AvailableBrandEnum.Dior:
        return <DiorIcon />
      // case AvailableBrandEnum.LouisVuitton:
      //   return <LvIcon />
      // case 'matches':
      //   return <MatchesIcon />
      // case AvailableBrandEnum.PhilippPleinOutlet:
      //   return <PleinIcon />
      default:
        return ''
    }
  }

  return (
    <a
      onMouseEnter={hoverHandler}
      onMouseLeave={leaveHandler}
      data-type={type}
      className={styles.card}
      href={href}
      target="_blank"
      rel="noffollow noopener noreferrer"
    >
      {getIcon(type)}
    </a>
  )
}

const IndexShops = (props: shopsIntarface) => {
  const { className = '', hoverHandler, leaveHandler, items = [] } = props

  return (
    <div className={`${className} ${styles.list}`}>
      {items.map((item, index) => (
        <IndexShopsCard
          key={`shop-card-${index}`}
          type={item.type}
          href={item.url}
          hoverHandler={hoverHandler}
          leaveHandler={leaveHandler}
        />
      ))}
    </div>
  )
}

export default IndexShops