import styles from '../styles/MessageBox.module.css';

const MessageBox = () => {
    return <div className={styles.container}>
        <input type="text" id={styles.message}/>
        <button type="button">Send</button>
    </div>
}

export default MessageBox;