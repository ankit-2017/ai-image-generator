import { JSX, useState } from "react";
import SearchBar from "components/common/SearchBar/Index";
import Card from "components/common/Card/Index";
import Loader from "components/common/Loader/Index";
import Styles from './Home.module.scss'
import Notification from "components/common/Notification";
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
        const response1: any = await fetch('/api/create-images', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value }),
        })
        if (!response1.ok) {
          const errorResponse = await response1.json()
          throw Error(errorResponse.error.message);
        }
        const response = await response1.json()
        if (response && response.data) {
          console.log('response2', response.data)
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
      setErrorMessage(error?.message)
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
          src={result[activeIndex || 0]?.url || '/images/wallpaper-large.jpeg'}
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
                body={errorMessage || ""}
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
          <div>
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