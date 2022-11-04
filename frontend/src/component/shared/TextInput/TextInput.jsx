import React from 'react'
import styles from './TextInput.module.css';


export const TextInput = (props) => {
  return (
    <div>
        <input  className={styles.Input}  type="text" {...props} />
    </div>
  )
}
export default TextInput;