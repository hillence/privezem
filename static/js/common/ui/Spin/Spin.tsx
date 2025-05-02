import styles from './Spin.module.scss'

const Spin = (props: { className?: string; size?: string; speed?: string }) => {
  return (
    <span className={`${styles.spin} ${props.className}`}>
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle
          className={styles.path}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="4.5"
          strokeMiterlimit="10"
        />
      </svg>
    </span>
  )
}

export default Spin