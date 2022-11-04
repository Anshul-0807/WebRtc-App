import React from 'react'
import styles from './Home.module.css';
import{ Link, useHistory } from 'react-router-dom'
import Card from '../../component/shared/Card/Card';
import Button from '../../component/shared/Button/Button';


export const Home = () => {
 
        const signinlinkstyle = {
          color : '#0077ff',
          fontWeight : 'bold',
          textDecoration : 'none',
          marginLeft : '10px'
        }
        
        const history = useHistory();

        function startRegister(){

          history.push('/Authenticate');
        } 


  return (
  <div className={styles.CardWrapper}>
    <Card
    title="Welcome to coders house!" icon="Emoji" >

     <p className={styles.Text}>we are working hard to get  for coder house 
          ready for everyone . while we are wrap up  the 
          finishing yoches , we are adding people gradually 
          to make sure nothing breaks </p>

          <div>
            <Button onClick={startRegister} text="Let's Go"/>
          </div>
          <div className={styles.signWrapper}>
            <span className={styles.hasinvite}>
            Have an invite text?
             </span>
            {/* <Link style={signinlinkstyle} to="/Login">Sign in </Link> */}
          </div>
    </Card>

</div>
   
  )
}
export default Home ;
