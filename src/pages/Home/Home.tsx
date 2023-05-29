import { JSX, useState } from "react";
import SearchBar from "components/SearchBar/Index";
import Card from "components/Card/Index";
import Loader from "components/Loader/Index";
import Styles from './Home.module.scss'
import Wallpaper from 'assets/images/wallpaper-large.jpeg'
import { generateImage } from 'services/imageService'
import Notification from "components/Notification";
// import MockImages from 'mocks/imagesResponse'

const Home = (): JSX.Element => {
  const [result, setResult] = useState<any>([])
  const [activeIndex, setActiveIndex] = useState<any>('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<any>('')
  const [hasError, setHasError] = useState(false)

  const handleCreateImage = async (value: string) => {
    setLoading(true)
    try {
      if (value && value.length > 3) {
        const response = await generateImage(value)
        if (response && response.data) {
          console.log('response', response.data.data)
          setResult(response.data.data)
          setLoading(false)
          setHasError(false)
          setErrorMessage('')
        }
      }
    } catch (error: any) {
      setLoading(false)
      setHasError(true)
      setResult([])
      if (error.response) {
        const { error: message } = error.response?.data || { error: '' }
        setErrorMessage(message)
        console.log("error.response", error.response.status);
        console.log("error.response", error.response.data);
      } else {
        console.log("error.message", error.message);
      }
    }
  }

  const getActiveIndex = (index: number | string) => {
    setActiveIndex(index)
  }
  return (
    <div style={{ position: 'relative', overflow: "hidden" }}>
      <div className={Styles.imgWrapper}>
        <img
          className={Styles.blur}
          src={result[activeIndex || 0]?.url || Wallpaper}
          alt="nature"
          width="100%"
          height="100%"
        />
      </div>
      <div style={{ position: 'absolute', top: '3%', left: 0, textAlign: 'center', width: '100%' }}>
        <div className={Styles.mainHeading}>
          <h1>Welcome to AI Image Generator</h1>
        </div>
        <SearchBar
          handleCreateImage={handleCreateImage}
          isLoading={loading}
        />
        {
          hasError ? (
            <div className={Styles.notificationSection}>
              <Notification
                heading="Oops! Error"
                body={errorMessage?.message || ""}
                buttonText="Dismiss"
                buttonColor="#c9605f"
                handleButtonClick={() => {
                  setErrorMessage('')
                  setHasError(false)
                }}
              />
            </div>
          ) : ''
        }

        <Loader
          showSpinner={loading}
          text="Generating images..."
          styles={{ marginTop: '30px' }}
        >
          <div className={Styles.cardWrapper}>
            <Card
              images={result}
              getActiveIndex={getActiveIndex}
            />
          </div>
        </Loader>
      </div>
    </div>

  )
}

export default Home