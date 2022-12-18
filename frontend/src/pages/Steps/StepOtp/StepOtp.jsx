import React, { useState } from "react";
import TextInput from "../../../component/shared/TextInput/TextInput";
import Button from "../../../component/shared/Button/Button";
import Card from "../../../component/shared/Card/Card";
import styles from './StepOtp.module.css'
// import { useState } from "react";
import { verifyOtp } from "../../../http";
import {useSelector} from 'react-redux';
import { setAuth } from "../../../store/authSlice";
import { useDispatch } from "react-redux";

 const StepOtp = () => {

  const [otp, setotp] = useState('');

  const dispatch = useDispatch();
  
  const {phone , hash} = useSelector((state) => state.auth.otp)

  async function submit () {
    if(!otp || !phone ||!hash) return;
       try{
      const {data} =   await verifyOtp({otp, phone , hash});
     
      dispatch(setAuth(data));
   
       }catch(err){
        console.log(err);
       }
    

  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the number we just texted you" 
        icon="lock">
          <TextInput 
          value={otp} onChange={(e) => setotp(e.target.value)} />

          <div>
            <div className={styles.actionButtonWrap}>
              <Button onClick={submit} text="Next" />
            </div>
            <p className={styles.BottomParagraph}>
              By entering your number. you're agreeing to our terms of service
              and private policy. Thanks.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};
export default StepOtp;
