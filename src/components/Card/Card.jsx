import React from 'react';

function Card({ PostsData, UserData, commentData }) {
  return (
    <div className='nft'>
      <div className='main'>
        <img
          className='tokenImage'
          src='https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          alt='NFT'
        />
        <h2>{UserData[0].name}</h2>
        <p className='description'>{PostsData[0].body}</p>
        <br></br>
        <hr />
        <div className='creator'>
          <div className='wrapper'>
            <img
              src='https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'
              alt='Creator'
            />
          </div>
          <p>
            <ins>Commented by : </ins> {commentData[0].email}
          </p>
        </div>
        <div className='creator'>
          <div className='wrapper'>
            <img
              src='https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'
              alt='Creator'
            />
          </div>
          <p>
            <ins>Commented by: </ins>
            {commentData[1].email}
          </p>
        </div>
        <div className='creator'>
          <div className='wrapper'>
            <img
              src='https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80'
              alt='Creator'
            />
          </div>
          <p>
            <ins>Commented by: </ins>
            {commentData[2].email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
