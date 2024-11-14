import React, { Suspense } from 'react'
import styles from './hoc.module.css'
import ClipLoader from 'react-spinners/ClipLoader';


  
  // Используем require.ensure для динамического импорта
  const WithLoader = ({ children }: { children: React.ReactNode }) => {
    
  
    return (
      <Suspense fallback={
        <div className={styles.loaderCenter}>
          <ClipLoader color="#36d7b7" size={100} />
        </div>
      }>
        {children}
      </Suspense>
    );
  };
  
  export default WithLoader;