import React from 'react';
import { Link ,withRouter} from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser , history , location}) =>{
return (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {(currentUser)? (
        location.pathname==='/signin'?(
          // eslint-disable-next-line 
          history.goBack(), 
          <div className='option' onClick={() => auth.signOut()}>
            <img className ='user-profile-picture'rc={`${currentUser.photoUrl}`} alt="" />
             SIGN OUT
          </div>
        ):(
        <div className='option' onClick={() => auth.signOut()}>
            <img className='user-profile-picture' src={`${currentUser.photoUrl}`} alt="" />
          SIGN OUT
        </div>
        )
      ) 
      : 
      (
        location.pathname==="/signin"?
        (<div></div>)
        :(
        <Link className='option' to='/signin'>
          SIGN IN      
        </Link>
        )
      )}
    </div>
  </div>
);
}
export default withRouter(Header);
