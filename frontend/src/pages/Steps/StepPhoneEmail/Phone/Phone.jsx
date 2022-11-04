import React, { useState } from "react";
import Card from "../../../../component/shared/Card/Card";
import Button from "../../../../component/shared/Button/Button";
import TextInput from "../../../../component/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../http";


const Phone = ({onNext}) => {
  const [phoneNumber, setphoneNumber] = useState("");

  async function submit() {
     //send request 

      const res = await sendOtp({phone : phoneNumber });
      console.log(res);
      
        // onNext();
       }

  return (
    <Card title="Enter your phone number" icon="Phone">
      <TextInput
        value={phoneNumber}
        onChange={(e) => setphoneNumber(e.target.value)}
      />

      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={submit }/>
        </div>
        <p className={styles.BottomParagraph}>
          By entering your number. you're agreeing to our terms of service and
          private policy. Thanks.
        </p>
      </div>
    </Card>
  );
};
export default Phone;
