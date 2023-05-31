import React, { useRef, useState, useEffect, JSX } from "react"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { cutomPlaceholderType } from 'utils/placeholderType'
import Loader from "components/common/Loader/Index";
import Styles from './Index.module.scss'

const SearchBar = ({ handleCreateImage, isLoading }: any): JSX.Element => {
  const [value, setValue] = useState<string>('')
  const [hasFocusState, setFocusState] = useState<any>(true)
  const textAreaRef = useRef<any>(null)

  useEffect(() => {
    if (!value && hasFocusState) {
      textAreaRef.current?.setAttribute('autocomplete', 'off');
      cutomPlaceholderType(textAreaRef.current, false)
    }
  }, [value, hasFocusState])

  return (
    <div className={Styles.container}>
      <textarea
        rows={2}
        ref={textAreaRef}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setValue(event.target.value)
        }
        }
        onBlur={() => setFocusState(true)}
        onFocus={() => {
          cutomPlaceholderType(textAreaRef.current, true);
          setFocusState(false);
        }
        }
        value={value}
      />
      <div className={Styles.buttonWrapper}>
        {
          isLoading ? (
            <Loader
              showSpinner={isLoading}
              height="30"
              width="30"
              radius="38"
            />
          ) : (
            <button type="button" onClick={() => handleCreateImage(value)}>
              <ArrowForwardIcon />
            </button>
          )
        }
      </div>
    </div>
  )
}

export default SearchBar