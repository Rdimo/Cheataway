import React from 'react';
import temp from '@/assets/icons/temp.png';
const Projects = () => {
  return (
    <React.Fragment>
      <h1 style={{ textAlign: 'center', color: '#fff', padding: '50px 0 50px' }}>
        Ye I&apos;m too lazy to finish this page rn, ill do it later tho dw
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '240px',
        }}>
        <img
          src={temp}
          width="300px"
          height="300px"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Projects;
