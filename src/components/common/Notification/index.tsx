import Styles from './index.module.scss'

const Notification = ({
  heading,
  body,
  buttonText,
  buttonColor,
  handleButtonClick
}: any) => (
  <div className={Styles.container}>
    <div>
      <h2>{heading}</h2>
    </div>
    <div>
      <p>{body}</p>
    </div>
    <div className={Styles.buttonWrapper} >
      <button
        onClick={handleButtonClick}
        style={{ backgroundColor: buttonColor ? buttonColor : '#c9605f' }}
      >{buttonText}</button>
    </div>
  </div>
)

export default Notification