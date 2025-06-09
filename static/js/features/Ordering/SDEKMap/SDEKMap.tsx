import React, { useEffect, useRef, useState } from 'react'

import { GeolocationControl, Map, Placemark, YMaps, ZoomControl } from '@pbe/react-yandex-maps'

import styles from './SdekMap.module.scss'

import { CityCoordinatesType, SDEKPoint } from 'api/userAPI/cartAPI'
import { ReactComponent as ArrowLeft } from 'assets/icons/svgIcons/arrowLeftActiveIcon.svg'
import { ReactComponent as ClockIcon } from 'assets/icons/svgIcons/clock-icn.svg'
import { ReactComponent as CloseIcon } from 'assets/icons/svgIcons/closeIcon.svg'
import { ReactComponent as AddressIcon } from 'assets/icons/svgIcons/deliveryAddressIcon.svg'
import locationIcn from 'assets/icons/svgIcons/location-icn.svg'
import pvzIcon from 'assets/icons/svgIcons/pvz-icon.svg'
import pvzSelectedIcon from 'assets/icons/svgIcons/pvz-selected-icon.svg'
import { Button } from 'common/ui'

type Props = {
  isOpenMap: boolean
  cityPoints: SDEKPoint[] | undefined
  closeMapHandler: () => void
  cityCoordinates: CityCoordinatesType | undefined
  onSelectPVZ: (point: SDEKPoint | null) => void
  isMobile: boolean
}

export const SdekMap = (props: Props) => {
  const { isOpenMap, cityPoints, closeMapHandler, cityCoordinates, onSelectPVZ, isMobile } = props

  const mapRef = useRef<ymaps.Map | undefined>(undefined)
  const section = document.getElementById('ordering')

  const [center, setCenter] = useState<[number, number]>([
    cityCoordinates?.latitude ?? 55.67766,
    cityCoordinates?.longitude ?? 37.51392,
  ])
  const [zoom, setZoom] = useState<number>(12)
  const [selectedPoint, setSelectedPoint] = useState<SDEKPoint | null>(null)

  const handlePlacemarkClick = (point: SDEKPoint) => {
    setSelectedPoint(point)
  }

  useEffect(() => {
    const chatWidget = document.querySelector('.b24-widget-button-wrapper')

    if (cityCoordinates) {
      setCenter([cityCoordinates.latitude, cityCoordinates.longitude])
      setZoom(13)
    }
    if (isOpenMap) {
      document.body.style.overflow = 'hidden'
      chatWidget && chatWidget.classList.add('hidden')
      isMobile && section && window.scrollTo(0, section?.offsetTop)
    }

    return () => {
      document.body.style.overflow = 'auto'
      chatWidget && chatWidget.classList.remove('hidden')
    }
  }, [isOpenMap, cityCoordinates])

  return (
    <div
      className={`${styles['modal']} ${isOpenMap ? styles['modal--open'] : ''}`}
      id={'map-modal'}
    >
      <YMaps
        query={{
          apikey: '6c298867-fc81-41c2-bf7f-df162a889313',
        }}
      >
        <Map
          state={{ center, zoom }}
          mapAutoFocus={true}
          exitFullscreenByEsc={true}
          instanceRef={mapRef}
          className={styles.map}
          controls={['zoomControl', 'geolocationControl']}
          copyrightLogoVisible={false}
        >
          {cityPoints?.map((point, index) => (
            <Placemark
              key={index}
              geometry={[point.latitude, point.longitude]}
              options={{
                iconLayout: 'default#image',
                iconImageHref: point.code === selectedPoint?.code ? pvzSelectedIcon : pvzIcon,
                iconImageSize: point.code === selectedPoint?.code ? [48, 48] : [44, 44],
                iconImageOffset: point.code === selectedPoint?.code ? [-25, -25] : [-22, -22],
              }}
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current
                    .setCenter([point.latitude - 0.005, point.longitude], 14, {
                      duration: 500,
                      timingFunction: 'ease-in-out',
                    })
                    .then(() => handlePlacemarkClick(point))
                }
              }}
            />
          ))}
          <Button
            size={isMobile ? 'small' : 'base'}
            variant={'white'}
            className={styles['close-btn']}
            onClick={closeMapHandler}
          >
            <ArrowLeft />
          </Button>
          <GeolocationControl
            data={{
              image: locationIcn,
            }}
            options={{
              position: {
                top: isMobile ? 16 : 44,
                right: isMobile ? 16 : 44,
              },
            }}
          />
          <ZoomControl
            options={{
              visible: isMobile,
            }}
          />
          {selectedPoint && (
            <div className={styles['point-info']}>
              <div className={styles['point-info__text']}>
                <Button
                  className={styles['point-info_close']}
                  variant={'transparent'}
                  onClick={() => setSelectedPoint(null)}
                >
                  <CloseIcon />
                </Button>

                <h2 className={styles['point-info__title']}>выбрать пункт выдачи</h2>
              </div>
              <div className={styles['point-info__text']}>
                <p className={styles['point-info__text-item']}>
                  <AddressIcon />
                  {selectedPoint?.address}
                </p>
                <p className={styles['point-info__text-item']}>
                  <ClockIcon />
                  {selectedPoint?.work_time}
                </p>
              </div>
              <Button
                size={isMobile ? 'base' : 'xbase'}
                variant={'default'}
                className={styles['submit-btn']}
                onClick={() => onSelectPVZ(selectedPoint)}
              >
                заберу отсюда
              </Button>
            </div>
          )}
        </Map>
      </YMaps>
    </div>
  )
}
