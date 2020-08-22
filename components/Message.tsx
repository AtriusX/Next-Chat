import styles from '../styles/Message.module.css';

const Message = (props: {author: string, message: string}) => {
    return <div className={styles.container}>
        <p><b>{props.author} says:</b> {props.message}</p>
    </div>
}

export default Message;