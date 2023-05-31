import { Watch } from 'react-loader-spinner';
import Styles from './Index.module.scss';

function Loader({ text,
  showSpinner,
  height,
  width,
  radius,
  styles,
  children }: any) {
  return (
    <>
      {
        showSpinner
        && (
          <div className={Styles.pageLoader}>
            <Watch
              height={height ? height : '80'}
              width={width ? width : '80'}
              radius={radius ? radius : '48'}
              color="#ffffff"
              ariaLabel="Please wait while loading..."
              wrapperStyle={styles ? styles : {}}
              visible={true}
            />
            {
              text && <p style={{ fontSize: '16px' }}>{text}</p>
            }
          </div>
        )
      }
      {
        !showSpinner && children
      }
    </>
  );
}

export default Loader;
