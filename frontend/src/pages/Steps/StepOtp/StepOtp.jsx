import React, { useState } from "react";
import TextInput from "../../../component/shared/TextInput/TextInput";
import Button from "../../../component/shared/Button/Button";
import Card from "../../../component/shared/Card/Card";
import styles from './StepOtp.module.css'
// import { useState } from "react";

 const StepOtp = ({ onNext }) => {

  const [otp, setotp] = useState('');

  function next () {}

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the number we just texted you" 
        icon="lock">
          <TextInput 
          value={otp} onChange={(e) => setotp(e.target.value)} />

          <div>
            <div className={styles.actionButtonWrap}>
              <Button onClick={next} text="Next" />
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
